import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'Brad Studio <onboarding@resend.dev>',
      to: 'kuowenhsuan@gmail.com',
      replyTo: email,
      subject: `Brad Studio 新詢價表單｜${name}`,
      text: `
姓名 / Name:
${name}

Email:
${email}

內容 / Message:
${message}
      `.trim(),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact API error:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}