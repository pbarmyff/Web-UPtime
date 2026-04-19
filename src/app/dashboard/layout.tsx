import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Activity, Settings, LayoutDashboard, Shield } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">UptimeMonitor</h1>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <Link href="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/dashboard/monitors" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md">
            <Activity size={20} />
            <span>Monitors</span>
          </Link>
          <Link href="/dashboard/settings" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          {session.user?.role === "ADMIN" && (
             <Link href="/admin" className="flex items-center space-x-2 text-indigo-700 hover:bg-indigo-50 p-2 rounded-md mt-4 border border-indigo-100">
                <Shield size={20} />
                <span>Admin Panel</span>
             </Link>
          )}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Welcome, {session.user?.name}</h2>
           <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{session.user?.email}</span>
           </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
