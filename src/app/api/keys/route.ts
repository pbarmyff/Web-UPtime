import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const keys = await prisma.apiKey.findMany({
        where: { userId: session.user.id }
    });

    return NextResponse.json({ keys });
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    if (!body.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const key = crypto.randomBytes(32).toString('hex');

    const apiKey = await prisma.apiKey.create({
        data: {
            name: body.name,
            key,
            userId: session.user.id
        }
    });

    return NextResponse.json({ apiKey });
}
