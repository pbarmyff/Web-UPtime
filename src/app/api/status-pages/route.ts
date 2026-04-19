import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { statusPageSchema } from "@/lib/validations";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const body = await req.json();

        const parseResult = statusPageSchema.safeParse(body);
        if (!parseResult.success) {
            return new NextResponse("Invalid input data", { status: 400 });
        }

        const data = parseResult.data;

        // Check if slug is unique
        const existing = await prisma.statusPage.findUnique({ where: { slug: data.slug } });
        if (existing) {
            return new NextResponse("Slug is already taken", { status: 400 });
        }

        const statusPage = await prisma.statusPage.create({
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                monitors: JSON.stringify(data.monitors),
                userId: session.user.id
            }
        });

        return NextResponse.json(statusPage);
    } catch (error) {
        console.error("Failed to create status page", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
