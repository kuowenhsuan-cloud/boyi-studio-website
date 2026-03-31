import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Brad Studio 線上估價需求｜${name || '未填姓名'}`,
      replyTo: email,
      text: [
        `姓名 / 機構：${name || ''}`,
        `Email：${email || ''}`,
        '',
        '需求說明：',
        message || '',
      ].join('\n'),
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