import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { userSettingsSchema } from "@/lib/validations";

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const body = await req.json();

        const parseResult = userSettingsSchema.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }

        const { name, currentPassword, newPassword } = parseResult.data;

        const user = await prisma.user.findUnique({ where: { id: session.user.id } });
        if (!user) return new NextResponse("Not Found", { status: 404 });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData: any = {};

        if (name && name !== user.name) {
            updateData.name = name;
        }

        if (currentPassword && newPassword) {
            const isCorrect = await bcrypt.compare(currentPassword, user.password!);
            if (!isCorrect) {
                return new NextResponse("Incorrect current password", { status: 400 });
            }
            updateData.password = await bcrypt.hash(newPassword, 12);
        }

        if (Object.keys(updateData).length > 0) {
            await prisma.user.update({
                where: { id: user.id },
                data: updateData
            });
        }

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Failed to update settings", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
