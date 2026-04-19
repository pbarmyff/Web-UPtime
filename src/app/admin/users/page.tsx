import prisma from "@/lib/prisma";
import AdminUsersClient from "./AdminUsersClient";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
          _count: {
              select: { monitors: true, statusPages: true }
          }
      }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white">Manage Users</h1>
      <AdminUsersClient initialUsers={users} />
    </div>
  );
}
