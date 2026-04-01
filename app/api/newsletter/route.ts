import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Invalid email address." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"360 Hive Website" <${process.env.GMAIL_USER}>`,
    to: "360hivebyqueens@gmail.com",
    subject: "New Newsletter Subscriber",
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;background:#010717;color:#f1f5ff;border-radius:12px;">
        <h2 style="color:#ff0066;margin:0 0 16px;">New Newsletter Subscriber</h2>
        <p style="margin:0 0 8px;color:#c0c8df;">A new visitor has subscribed to the 360 Hive newsletter:</p>
        <p style="font-size:18px;font-weight:bold;color:#ffffff;background:rgba(255,0,102,0.1);padding:12px 16px;border-radius:8px;border:1px solid rgba(255,0,102,0.2);">
          ${email}
        </p>
        <p style="margin:16px 0 0;font-size:12px;color:#505a79;">Sent from 360hive.com contact form</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
