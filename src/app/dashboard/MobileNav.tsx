"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, Settings, LayoutDashboard, Shield, Menu, X } from "lucide-react";

export default function MobileNav({ userRole, userName, userEmail }: { userRole?: string, userName?: string | null, userEmail?: string | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-brand-surface border-b border-white/5 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-brand-accent" />
          <span className="font-bold text-white tracking-tight">UptimeMonitor</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-md p-1"
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden fixed inset-0 top-16 bg-brand-background z-40 overflow-y-auto border-t border-white/5 flex flex-col">
          <div className="p-4 border-b border-white/5 bg-brand-surface/50">
            <h2 className="text-sm font-semibold text-white truncate">Welcome, {userName}</h2>
            <span className="text-xs text-brand-muted truncate block">{userEmail}</span>
          </div>
          <nav className="p-4 flex flex-col space-y-4 flex-1">
            <Link onClick={() => setIsOpen(false)} href="/dashboard" className="flex items-center space-x-3 text-white text-lg p-2 rounded-lg hover:bg-brand-surface">
              <LayoutDashboard size={24} />
              <span>Dashboard</span>
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/dashboard/monitors" className="flex items-center space-x-3 text-white text-lg p-2 rounded-lg hover:bg-brand-surface">
              <Activity size={24} />
              <span>Monitors</span>
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/dashboard/status-pages" className="flex items-center space-x-3 text-white text-lg p-2 rounded-lg hover:bg-brand-surface">
              <Activity size={24} />
              <span>Status Pages</span>
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/dashboard/settings" className="flex items-center space-x-3 text-white text-lg p-2 rounded-lg hover:bg-brand-surface">
              <Settings size={24} />
              <span>Settings</span>
            </Link>
            {userRole === "ADMIN" && (
              <Link onClick={() => setIsOpen(false)} href="/admin" className="flex items-center space-x-3 text-brand-accent text-lg p-2 rounded-lg mt-4 border border-brand-accent/30 bg-brand-accent/5">
                <Shield size={24} />
                <span>Admin Panel</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
