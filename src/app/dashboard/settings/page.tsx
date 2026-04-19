import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, email: true }
  });

  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <SettingsForm user={user} />
      </div>
    </div>
  );
}
