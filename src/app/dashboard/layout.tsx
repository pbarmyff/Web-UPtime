import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Activity, Settings, LayoutDashboard, Shield } from "lucide-react";

import MobileNav from "./MobileNav";
import { BackgroundBeams } from "@/components/aceternity/background-beams";

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
    <div className="flex h-screen bg-brand-background overflow-hidden relative">
      <BackgroundBeams className="absolute inset-0 opacity-20 pointer-events-none" />
      <MobileNav userRole={session.user?.role} userName={session.user?.name} userEmail={session.user?.email} />
      <aside className="hidden md:flex w-64 bg-brand-surface/80 backdrop-blur-md shadow-md flex-col flex-shrink-0 border-r border-brand-muted/10 z-10">
        <div className="p-4 border-b border-brand-muted/10">
          <h1 className="text-xl font-bold text-white">UptimeMonitor</h1>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <Link href="/dashboard" className="flex items-center space-x-2 text-brand-text hover:bg-brand-background hover:text-white p-2 rounded-none transition-colors">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/dashboard/monitors" className="flex items-center space-x-2 text-brand-text hover:bg-brand-background hover:text-white p-2 rounded-none transition-colors">
            <Activity size={20} />
            <span>Monitors</span>
          </Link>
          <Link href="/dashboard/status-pages" className="flex items-center space-x-2 text-brand-text hover:bg-brand-background hover:text-white p-2 rounded-none transition-colors">
            <Activity size={20} />
            <span>Status Pages</span>
          </Link>
          <Link href="/dashboard/settings" className="flex items-center space-x-2 text-brand-text hover:bg-brand-background hover:text-white p-2 rounded-none transition-colors">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          {session.user?.role === "ADMIN" && (
             <Link href="/admin" className="flex items-center space-x-2 text-brand-accent hover:bg-brand-accent/10 p-2 rounded-none mt-4 border border-brand-accent/30 transition-colors">
                <Shield size={20} />
                <span>Admin Panel</span>
             </Link>
          )}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto flex flex-col w-full min-w-0 pt-16 md:pt-0 z-10 relative">
        <header className="hidden md:flex bg-brand-surface/80 backdrop-blur-md p-4 justify-between items-center border-b border-brand-muted/10">
          <h2 className="text-xl font-semibold text-white">Welcome, {session.user?.name}</h2>
           <div className="flex items-center space-x-4">
              <span className="text-sm text-brand-muted truncate max-w-[200px]">{session.user?.email}</span>
           </div>
        </header>
        <div className="p-4 md:p-8 w-full max-w-full overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
