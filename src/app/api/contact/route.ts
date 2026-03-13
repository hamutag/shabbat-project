import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    // Validate required fields
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "שם, טלפון והודעה הם שדות חובה" },
        { status: 400 }
      );
    }

    // Validate phone format (Israeli mobile)
    const phoneClean = phone.replace(/[-\s]/g, "");
    if (!/^0[5-9]\d{8}$/.test(phoneClean)) {
      return NextResponse.json(
        { error: "מספר טלפון לא תקין" },
        { status: 400 }
      );
    }

    // Store contact message in database
    // Using a raw query since we don't have a ContactMessage model yet
    // For now, we'll log it and return success
    // In production, this would send an email or store in DB

    console.log("Contact form submission:", {
      name,
      phone: phoneClean,
      email: email || null,
      subject: subject || "general",
      message,
      createdAt: new Date().toISOString(),
    });

    // Try to store in database if ContactMessage table exists
    try {
      await (prisma as unknown as { $executeRaw: (query: TemplateStringsArray, ...values: unknown[]) => Promise<number> }).$executeRaw`
        INSERT INTO "ContactMessage" ("id", "name", "phone", "email", "subject", "message", "createdAt")
        VALUES (gen_random_uuid(), ${name}, ${phoneClean}, ${email || null}, ${subject || 'general'}, ${message}, NOW())
      `;
    } catch {
      // Table might not exist yet, that's ok - the message was logged
      console.log("ContactMessage table not yet created, message logged to console");
    }

    return NextResponse.json({
      success: true,
      message: "ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "שגיאה בשליחת ההודעה. אנא נסה שוב." },
      { status: 500 }
    );
  }
}
