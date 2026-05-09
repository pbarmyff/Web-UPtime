"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Activity, ShieldAlert, ArrowLeft, Menu, X } from "lucide-react";

export default function AdminMobileNav({ userEmail }: { userEmail?: string | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-brand-surface border-b border-white/5 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2 text-white">
          <ShieldAlert className="h-6 w-6 text-brand-accent" />
          <span className="font-bold tracking-tight">Admin Panel</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
          aria-label={isOpen ? "Close admin menu" : "Open admin menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-brand-background z-40 overflow-y-auto border-t border-white/5 flex flex-col">
          <div className="p-4 border-b border-white/5 bg-brand-surface/50">
             <span className="text-sm font-medium text-white truncate block">{userEmail} (Admin)</span>
          </div>
          <nav className="p-4 flex flex-col space-y-4 flex-1">
             <Link onClick={() => setIsOpen(false)} href="/admin" className="flex items-center space-x-3 text-white text-lg p-2 rounded-lg hover:bg-brand-surface">
              <Activity size={24} />
              <span>Overview</span>
             </Link>
             <Link onClick={() => setIsOpen(false)} href="/admin/users" className="flex items-center space-x-3 text-white text-lg p-2 rounded-lg hover:bg-brand-surface">
              <Users size={24} />
              <span>Users</span>
             </Link>
             <Link onClick={() => setIsOpen(false)} href="/admin/monitors" className="flex items-center space-x-3 text-white text-lg p-2 rounded-lg hover:bg-brand-surface">
              <Activity size={24} />
              <span>All Monitors</span>
             </Link>
             <Link onClick={() => setIsOpen(false)} href="/dashboard" className="flex items-center space-x-3 text-brand-muted text-lg p-2 rounded-lg hover:bg-brand-surface mt-8">
              <ArrowLeft size={24} />
              <span>Back to Dashboard</span>
             </Link>
          </nav>
        </div>
      )}
    </>
  );
}
