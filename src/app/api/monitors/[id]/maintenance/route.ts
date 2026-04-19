import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { maintenanceWindowSchema } from "@/lib/validations";

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

        const parseResult = maintenanceWindowSchema.safeParse(body);
        if (!parseResult.success) {
            return new NextResponse("Invalid input data", { status: 400 });
        }

        const data = parseResult.data;

        if (new Date(data.startTime) >= new Date(data.endTime)) {
             return new NextResponse("End time must be after start time", { status: 400 });
        }

        const maintenance = await prisma.maintenanceWindow.create({
            data: {
                title: data.title,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
                monitorId: id
            }
        });

        return NextResponse.json(maintenance);
    } catch (error) {
        console.error("Failed to create maintenance window", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
