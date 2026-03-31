import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const entry = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || "",
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, "contacts.json");
    const existing: typeof entry[] = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : [];

    existing.push(entry);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    return NextResponse.json(
      { success: true, message: "Message received. We'll be in touch within 24 hours." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
