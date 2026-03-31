import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { services, name, email, phone, company, description, budget, timeline } = body;

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    if (!services?.length) {
      return NextResponse.json(
        { error: "Please select at least one service." },
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
      services,
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "",
      company: company?.trim() || "",
      description: description?.trim() || "",
      budget: budget || "",
      timeline: timeline || "",
      createdAt: new Date().toISOString(),
    };

    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, "quotes.json");
    const existing: typeof entry[] = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : [];

    existing.push(entry);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    return NextResponse.json(
      { success: true, message: "Quote request received. We'll prepare a proposal within 48 hours." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
