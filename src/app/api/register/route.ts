import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, gender, city, password } = body;

    // Validate required fields
    if (!firstName || !lastName || !phone || !password || !gender) {
      return NextResponse.json(
        { error: "שדות חובה חסרים" },
        { status: 400 }
      );
    }

    // Check if phone already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { phone },
          ...(email ? [{ email }] : []),
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "מספר טלפון או אימייל כבר רשומים במערכת" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Find city
    let cityId: string | undefined;
    if (city) {
      const cityRecord = await prisma.city.findFirst({
        where: { name: city },
      });
      if (cityRecord) cityId = cityRecord.id;
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        email: email || null,
        gender: gender,
        passwordHash,
        role: "USER",
        ...(cityId ? { cityId } : {}),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "ההרשמה בוצעה בהצלחה!",
        userId: user.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "שגיאה בהרשמה. אנא נסה שוב." },
      { status: 500 }
    );
  }
}
