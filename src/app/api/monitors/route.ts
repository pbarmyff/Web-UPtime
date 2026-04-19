import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { monitorSchema } from "@/lib/validations";

export async function POST(req: Request) {
    let userId = "";

    // Check API Key
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
        const key = authHeader.split(" ")[1];
        const apiKey = await prisma.apiKey.findUnique({ where: { key } });
        if (apiKey) {
            userId = apiKey.userId;
            await prisma.apiKey.update({ where: { id: apiKey.id }, data: { lastUsed: new Date() } });
        }
    }

    if (!userId) {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });
        userId = session.user.id;
    }

    try {
        const body = await req.json();

        const parseResult = monitorSchema.safeParse({
            ...body,
            interval: typeof body.interval === 'string' ? parseInt(body.interval) : body.interval,
            expectedStatus: typeof body.expectedStatus === 'string' ? parseInt(body.expectedStatus) : body.expectedStatus,
        });

        if (!parseResult.success) {
            return new NextResponse("Invalid input data", { status: 400 });
        }

        const data = parseResult.data;

        const monitor = await prisma.monitor.create({
            data: {
                ...data,
                userId,
                nextRunAt: new Date(), // run immediately
            }
        });

        return NextResponse.json(monitor);
    } catch (error) {
        console.error("Failed to create monitor", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    let userId = "";

    // Check API Key
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
        const key = authHeader.split(" ")[1];
        const apiKey = await prisma.apiKey.findUnique({ where: { key } });
        if (apiKey) {
            userId = apiKey.userId;
            await prisma.apiKey.update({ where: { id: apiKey.id }, data: { lastUsed: new Date() } });
        }
    }

    if (!userId) {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });
        userId = session.user.id;
    }

    const monitors = await prisma.monitor.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(monitors);
}
