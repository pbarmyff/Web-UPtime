import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const body = await req.json();
        const { name, url, type, interval, expectedStatus, expectedKeyword } = body;

        if (!name || !url) {
            return new NextResponse("Name and URL are required", { status: 400 });
        }

        const monitor = await prisma.monitor.create({
            data: {
                name,
                url,
                type: type || "HTTP",
                interval: parseInt(interval) || 60,
                expectedStatus: expectedStatus ? parseInt(expectedStatus) : 200,
                expectedKeyword,
                userId: session.user.id,
                nextRunAt: new Date(), // run immediately
            }
        });

        return NextResponse.json(monitor);
    } catch (error) {
        console.error("Failed to create monitor", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

    const monitors = await prisma.monitor.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(monitors);
}
