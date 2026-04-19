import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { alertRuleSchema } from "@/lib/validations";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const monitor = await prisma.monitor.findUnique({ where: { id } });
        if (!monitor || monitor.userId !== session.user.id) {
            return new NextResponse("Not Found", { status: 404 });
        }

        const body = await req.json();

        const parseResult = alertRuleSchema.safeParse(body);
        if (!parseResult.success) {
            return new NextResponse("Invalid input data", { status: 400 });
        }

        const data = parseResult.data;

        // Basic validation
        if (data.type === "EMAIL" && !/^\S+@\S+\.\S+$/.test(data.target)) {
            return new NextResponse("Invalid email address", { status: 400 });
        }
        if (data.type === "WEBHOOK" && !/^https?:\/\//.test(data.target)) {
            return new NextResponse("Invalid webhook URL", { status: 400 });
        }

        const rule = await prisma.alertRule.create({
            data: {
                type: data.type,
                target: data.target,
                monitorId: id
            }
        });

        return NextResponse.json(rule);
    } catch (error) {
        console.error("Failed to create alert rule", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
