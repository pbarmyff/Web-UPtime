import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Users, Activity, ShieldAlert, ArrowLeft } from "lucide-react";

import AdminMobileNav from "./AdminMobileNav";

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
    <div className="flex h-screen bg-brand-background text-gray-100 overflow-hidden">
      <AdminMobileNav userEmail={session.user?.email} />
      <aside className="hidden md:flex w-64 bg-brand-surface shadow-md flex-col flex-shrink-0">
        <div className="p-4 border-b border-brand-muted/30">
          <h1 className="text-xl font-bold text-white flex items-center"><ShieldAlert className="mr-2" /> Admin Panel</h1>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <Link href="/admin" className="flex items-center space-x-2 text-brand-text hover:bg-brand-background hover:text-white p-2 rounded-none">
            <Activity size={20} />
            <span>Overview</span>
          </Link>
          <Link href="/admin/users" className="flex items-center space-x-2 text-brand-text hover:bg-brand-background hover:text-white p-2 rounded-none">
            <Users size={20} />
            <span>Users</span>
          </Link>
          <Link href="/admin/monitors" className="flex items-center space-x-2 text-brand-text hover:bg-brand-background hover:text-white p-2 rounded-none">
            <Activity size={20} />
            <span>All Monitors</span>
          </Link>
          <Link href="/dashboard" className="flex items-center space-x-2 text-brand-muted hover:text-white p-2 rounded-none mt-8">
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto flex flex-col w-full min-w-0 pt-16 md:pt-0">
        <header className="hidden md:flex bg-brand-surface p-4 justify-between items-center border-b border-brand-muted/30">
          <h2 className="text-xl font-semibold text-white">System Administration</h2>
           <div className="flex items-center space-x-4">
              <span className="text-sm text-brand-muted truncate max-w-[200px]">{session.user?.email} (Admin)</span>
           </div>
        </header>
        <div className="p-4 md:p-8 w-full max-w-full overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
