import React from 'react';
import { getSessionAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { dbRepo } from '@/lib/db';
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  GraduationCap,
  Mail,
  UserCheck,
  Settings,
  ExternalLink,
  LogOut,
  ShieldAlert,
  Images,
  Palette,
} from 'lucide-react';
import { headers } from 'next/headers';

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  // Check authentication
  const session = await getSessionAdmin();

  // If not authenticated, let login page render, otherwise redirect
  // Note: /admin/login handles its own layout if needed, or if no session, we render children
  // But inside layout, if pathname is login, return children directly!
  if (!session) {
    return <>{children}</>;
  }

  // Fetch unread count for badge
  let unreadCount = 0;
  try {
    const stats = dbRepo.getAdminStats();
    unreadCount = stats.unreadMessages;
  } catch {}

  const navLinks = [
    { label: '00 // Overview', href: '/admin', icon: LayoutDashboard },
    { label: '01 // Profile', href: '/admin/profile', icon: UserCheck },
    { label: '02 // Projects', href: '/admin/projects', icon: FolderGit2 },
    { label: '03 // Skills', href: '/admin/skills', icon: Cpu },
    { label: '04 // Journey', href: '/admin/journey', icon: GraduationCap },
    { label: '05 // Messages', href: '/admin/messages', icon: Mail, badge: unreadCount },
    { label: '06 // Media Library', href: '/admin/media', icon: Images },
    { label: '07 // Appearance', href: '/admin/appearance', icon: Palette },
    { label: '08 // Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#07080a] text-[#f4f2eb] font-mono flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0a0c10] border-r border-white/10 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand & Admin Monogram */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-[#00ff9d] text-[#07080a] font-bold flex items-center justify-center text-xs">
                KO
              </div>
              <div>
                <span className="text-xs font-bold text-[#f4f2eb] block">ATELIER CMS</span>
                <span className="text-[10px] text-[#00ff9d] tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
                  ONLINE
                </span>
              </div>
            </div>
            <span className="text-[9px] text-[#8e95a5] border border-white/10 px-1 rounded">V2.6</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between px-3 py-2.5 rounded-sm hover:bg-[#12151c] text-[#8e95a5] hover:text-[#00ff9d] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#8e95a5] group-hover:text-[#00ff9d] transition-colors" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="px-1.5 py-0.2 bg-[#00ff9d] text-[#07080a] text-[10px] font-bold rounded-sm">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-sm bg-[#12151c] hover:bg-[#1a1e27] text-[#f4f2eb] transition-colors"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#00ff9d]" />
          </Link>

          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center justify-between px-3 py-2 rounded-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer text-left"
            >
              <span>Sign Out</span>
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-14 bg-[#0a0c10]/80 backdrop-blur border-b border-white/10 px-6 flex items-center justify-between text-xs text-[#8e95a5]">
          <div className="flex items-center gap-2">
            <span className="text-[#00ff9d]">&gt;</span>
            <span className="text-[#f4f2eb] font-semibold">ADMINISTRATIVE COCKPIT</span>
            <span className="text-white/20">/</span>
            <span>SQLITE DATABASE ACTIVE</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#12151c] border border-white/10 rounded-sm text-[11px] text-[#f4f2eb]">
              <span>Kareem Osama (Admin)</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}
