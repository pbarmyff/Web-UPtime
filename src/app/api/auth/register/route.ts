import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";
import { authRateLimiter } from "@/lib/rateLimit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(',')[0] || req.headers.get("x-real-ip") || "unknown";
  const rateLimitResult = authRateLimiter.check(ip);

  if (!rateLimitResult.success) {
      return new NextResponse("Too many requests", { status: 429 });
  }

  try {
    const body = await req.json();

    // Validate input
    const parseResult = registerSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    const { name, email, password } = parseResult.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Make the first user an ADMIN automatically
    const count = await prisma.user.count();
    const role = count === 0 ? "ADMIN" : "USER";

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
