import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Activity, Settings, LayoutDashboard, Shield, MonitorPlay, Radio } from "lucide-react";

import MobileNav from "./MobileNav";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const navItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Monitors",
      url: "/dashboard/monitors",
      icon: MonitorPlay,
    },
    {
      title: "Status Pages",
      url: "/dashboard/status-pages",
      icon: Radio,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-brand-background overflow-hidden relative w-full">
        <BackgroundBeams className="absolute inset-0 opacity-20 pointer-events-none" />
        <MobileNav userRole={session.user?.role} userName={session.user?.name} userEmail={session.user?.email} />

        <Sidebar className="hidden md:flex bg-brand-surface/80 backdrop-blur-md border-r border-white/5 z-10 w-64">
          <div className="p-6 border-b border-white/5 flex items-center space-x-3">
              <Activity className="h-6 w-6 text-brand-accent" />
              <h1 className="text-xl font-bold text-white font-display">UptimeMonitor</h1>
          </div>
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-brand-muted text-xs uppercase tracking-wider mb-2 font-mono">Overview</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton className="text-brand-text hover:bg-brand-background/50 hover:text-white rounded-none py-6 my-1 transition-all border border-transparent hover:border-white/5">
                        <Link href={item.url}>
                          <item.icon className="h-5 w-5 mr-3 text-brand-muted group-hover:text-brand-accent" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}

                  {session.user?.role === "ADMIN" && (
                    <>
                      <SidebarGroupLabel className="text-brand-muted text-xs uppercase tracking-wider mb-2 mt-6 font-mono">Administration</SidebarGroupLabel>
                      <SidebarMenuItem>
                        <SidebarMenuButton className="text-brand-accent hover:bg-brand-accent/10 rounded-none py-6 transition-all border border-brand-accent/20">
                          <Link href="/admin">
                            <Shield className="h-5 w-5 mr-3" />
                            <span className="font-medium">Admin Panel</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-y-auto flex flex-col w-full min-w-0 pt-16 md:pt-0 z-10 relative">
          <header className="hidden md:flex bg-brand-surface/40 backdrop-blur-xl p-6 justify-between items-center border-b border-white/5 sticky top-0 z-20">
            <h2 className="text-xl font-display font-semibold text-white">
                <span className="font-light text-brand-muted mr-2">Welcome back,</span>
                {session.user?.name}
            </h2>
             <div className="flex items-center space-x-4 bg-brand-background/50 px-4 py-2 border border-white/5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                <span className="text-sm font-medium text-brand-text truncate max-w-[200px]">{session.user?.email}</span>
             </div>
          </header>
          <div className="p-4 md:p-8 w-full max-w-full overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
