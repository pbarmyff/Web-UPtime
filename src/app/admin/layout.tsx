import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Users, Activity, ShieldAlert, ArrowLeft } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <aside className="w-64 bg-gray-800 shadow-md flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white flex items-center"><ShieldAlert className="mr-2" /> Admin Panel</h1>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <Link href="/admin" className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md">
            <Activity size={20} />
            <span>Overview</span>
          </Link>
          <Link href="/admin/users" className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md">
            <Users size={20} />
            <span>Users</span>
          </Link>
          <Link href="/admin/monitors" className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md">
            <Activity size={20} />
            <span>All Monitors</span>
          </Link>
          <Link href="/dashboard" className="flex items-center space-x-2 text-gray-400 hover:text-white p-2 rounded-md mt-8">
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-gray-800 shadow-sm p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">System Administration</h2>
           <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">{session.user?.email} (Admin)</span>
           </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
