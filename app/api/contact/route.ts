import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is missing' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: 'Brad Studio <onboarding@resend.dev>',
      to: ['kuowenhsuan@gmail.com'],
      subject: `Brad Studio 線上估價需求｜${name || '未填姓名'}`,
      replyTo: email,
      text: message || '',
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('CONTACT_API_ERROR:', error);
    return NextResponse.json(
      { error: '寄信失敗，請檢查 API 設定' },
      { status: 500 }
    );
  }
}