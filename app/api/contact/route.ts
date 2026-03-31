import { NextResponse } from 'next/server';
import { Resend } from 'resend';

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is missing' },
        { status: 500 }
      );
    }

    if (!toEmail) {
      return NextResponse.json(
        { error: 'CONTACT_TO_EMAIL is missing' },
        { status: 500 }
      );
    }

    if (!fromEmail) {
      return NextResponse.json(
        { error: 'CONTACT_FROM_EMAIL is missing' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { name, email, message } = await req.json();

    const safeName = escapeHtml(name || '未填姓名');
    const safeEmail = escapeHtml(email || '');
    const safeMessage = escapeHtml(message || '').replace(/\n/g, '<br />');

    const html = `
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

    const text = [
      `姓名 / 機構：${name || ''}`,
      `Email：${email || ''}`,
      '',
      '需求說明：',
      message || '',
    ].join('\n');

    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Brad Studio 線上估價需求｜${name || '未填姓名'}`,
      replyTo: email,
      html,
      text,
    });

    if (result.error) {
      console.error('RESEND_SEND_ERROR:', result.error);
      return NextResponse.json(
        { error: 'Resend send failed', detail: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error('CONTACT_API_ERROR:', error);
    return NextResponse.json(
      { error: '寄信失敗，請檢查 API 設定' },
      { status: 500 }
    );
  }
}