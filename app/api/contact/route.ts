import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const ipStore = new Map<string, { count: number; start: number }>();

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function checkRateLimit(ip: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const record = ipStore.get(ip);

  if (!record || now - record.start > windowMs) {
    ipStore.set(ip, { count: 1, start: now });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  ipStore.set(ip, record);
  return true;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      return NextResponse.json(
        { error: 'Email 環境變數缺失' },
        { status: 500 }
      );
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: '請勿短時間重複送出' },
        { status: 429 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await req.json();

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();
    const website = String(body.website || '').trim();
    const formStartedAt = Number(body.formStartedAt || 0);

    if (website) {
      return NextResponse.json({ success: true });
    }

    const now = Date.now();
    if (formStartedAt && now - formStartedAt < 1000) {
      return NextResponse.json(
        { error: '送出過快，請稍後再試' },
        { status: 400 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '請完整填寫姓名、Email 與需求內容' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email 格式不正確' },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name || '未填姓名');
    const safeEmail = escapeHtml(email || '');
    const safeMessage = escapeHtml(message || '').replace(/\n/g, '<br />');

    // 寄給你自己的通知信
    const ownerHtml = `
<div style="margin:0;padding:0;background:#f5f1ea;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:40px 20px;">
    <div style="background:#ffffff;border:1px solid #e8e1d6;">
      <div style="padding:32px 32px 20px 32px;border-bottom:1px solid #eee7dc;">
        <div style="font-size:12px;letter-spacing:1.5px;color:#8a7f70;text-transform:uppercase;margin-bottom:10px;">
          Boyi Studio
        </div>
        <h1 style="margin:0;font-size:24px;line-height:1.4;font-weight:500;color:#1f1a17;">
          新的詢問 / New Inquiry
        </h1>
      </div>

      <div style="padding:28px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr>
            <td style="padding:0 0 16px 0;color:#8a7f70;font-size:13px;width:90px;">姓名</td>
            <td style="padding:0 0 16px 0;color:#1f1a17;font-size:15px;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding:0 0 16px 0;color:#8a7f70;font-size:13px;">Email</td>
            <td style="padding:0 0 16px 0;color:#1f1a17;font-size:15px;">
              <a href="mailto:${safeEmail}" style="color:#1f1a17;text-decoration:none;">
                ${safeEmail}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 8px 0;color:#8a7f70;font-size:13px;vertical-align:top;">內容</td>
            <td style="padding:0 0 8px 0;color:#1f1a17;font-size:15px;line-height:1.8;">
              ${safeMessage}
            </td>
          </tr>
        </table>
      </div>

      <div style="padding:0 32px 32px 32px;">
        <a
          href="mailto:${safeEmail}?subject=Re:%20Boyi%20Studio"
          style="display:inline-block;padding:12px 18px;border:1px solid #1f1a17;color:#1f1a17;text-decoration:none;font-size:14px;"
        >
          回覆 / Reply
        </a>
      </div>

      <div style="padding:20px 32px;background:#faf7f2;border-top:1px solid #eee7dc;color:#8a7f70;font-size:12px;line-height:1.6;">
        This message was generated from brad-studio.com<br />
        Time is not represented. It is anchored.
      </div>
    </div>
  </div>
</div>
`;

    const ownerText = [
      `姓名：${name}`,
      `Email：${email}`,
      '',
      '需求說明：',
      message,
    ].join('\n');

    const ownerResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Brad Studio 線上估價需求｜${name}`,
      replyTo: email,
      html: ownerHtml,
      text: ownerText,
    });

    if (ownerResult.error) {
      console.error('OWNER_EMAIL_ERROR:', ownerResult.error);
      return NextResponse.json(
        { error: '寄信失敗', detail: ownerResult.error },
        { status: 500 }
      );
    }

    // 自動回覆給客戶
    const customerHtml = `
<div style="margin:0;padding:0;background:#f5f1ea;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:40px 20px;">
    <div style="background:#ffffff;border:1px solid #e8e1d6;">
      <div style="padding:32px 32px 20px 32px;border-bottom:1px solid #eee7dc;">
        <div style="font-size:12px;letter-spacing:1.5px;color:#8a7f70;text-transform:uppercase;margin-bottom:10px;">
          Boyi Studio / 柏宜山房
        </div>
        <h1 style="margin:0;font-size:24px;line-height:1.4;font-weight:500;color:#1f1a17;">
          已收到您的詢問
        </h1>
      </div>

      <div style="padding:28px 32px;color:#1f1a17;font-size:15px;line-height:1.9;">
        <p style="margin:0 0 16px 0;">${safeName} 您好，</p>
        <p style="margin:0 0 16px 0;">
          我們已收到您透過 brad-studio.com 提交的詢問。
        </p>
        <p style="margin:0 0 16px 0;">
          通常會於 1–3 個工作天內回覆。若您之後想補充作品照片、尺寸或其他說明，也可直接回覆此信。
        </p>
        <div style="margin:24px 0;padding:18px 20px;background:#faf7f2;border:1px solid #eee7dc;">
          <div style="font-size:13px;color:#8a7f70;margin-bottom:8px;">您本次提交的內容</div>
          <div style="font-size:14px;color:#1f1a17;line-height:1.8;">${safeMessage}</div>
        </div>
        <p style="margin:0 0 16px 0;">
          柏宜山房 / Brad Studio<br />
          台北｜中國書畫裝裱與修復
        </p>
      </div>

      <div style="padding:20px 32px;background:#faf7f2;border-top:1px solid #eee7dc;color:#8a7f70;font-size:12px;line-height:1.6;">
        This is an automatic confirmation email from brad-studio.com.
      </div>
    </div>
  </div>
</div>
`;

    const customerText = [
      `${name} 您好：`,
      '',
      '我們已收到您透過 brad-studio.com 提交的詢問。',
      '通常會於 1–3 個工作天內回覆。',
      '若您之後想補充作品照片、尺寸或其他說明，也可直接回覆此信。',
      '',
      '您本次提交的內容：',
      message,
      '',
      '柏宜山房 / Brad Studio',
      '台北｜中國書畫裝裱與修復',
    ].join('\n');

    const customerResult = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: '柏宜山房 Brad Studio｜已收到您的詢問',
      html: customerHtml,
      text: customerText,
    });

    if (customerResult.error) {
      console.error('CUSTOMER_EMAIL_ERROR:', customerResult.error);
      // 不讓整體失敗，只記錄
    }

    return NextResponse.json({
      success: true,
      data: ownerResult.data,
      autoReplySent: !customerResult.error,
    });
  } catch (error) {
    console.error('CONTACT_API_ERROR:', error);
    return NextResponse.json(
      { error: '系統錯誤，請稍後再試' },
      { status: 500 }
    );
  }
}