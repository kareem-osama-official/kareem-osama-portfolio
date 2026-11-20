import React from 'react';
import { dbRepo } from '@/lib/db';
import { getSessionAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  FolderGit2,
  FileCheck2,
  Cpu,
  Mail,
  ArrowUpRight,
  Plus,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';

export const instant = false;

export default async function AdminOverviewPage() {
  const session = await getSessionAdmin();
  if (!session) {
    redirect('/admin/login');
  }

  const stats = dbRepo.getAdminStats();

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold font-mono text-[#f4f2eb] tracking-tight">
            SYSTEM OVERVIEW & TELEMETRY
          </h1>
          <p className="text-xs text-[#8e95a5] mt-1">
            Real database metrics, active content records, and incoming inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#00ff9d] hover:bg-[#20ffa9] text-[#07080a] font-bold text-xs rounded-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage Projects</span>
          </Link>

          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#12151c] hover:bg-[#1a1e27] text-[#f4f2eb] text-xs border border-white/10 rounded-sm transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#00ff9d]" />
            <span>Inbox ({stats.unreadMessages})</span>
          </Link>
        </div>
      </div>

      {/* Real Database Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#0e1015] border border-white/10 p-5 rounded-sm">
          <div className="flex items-center justify-between text-xs text-[#8e95a5] mb-2">
            <span>PUBLISHED WORKS</span>
            <FolderGit2 className="w-4 h-4 text-[#00ff9d]" />
          </div>
          <div className="text-3xl font-bold font-mono text-[#f4f2eb]">
            {stats.publishedProjects}
          </div>
          <div className="text-[10px] text-[#8e95a5] mt-2">
            {stats.draftProjects} drafts in staging
          </div>
        </div>

        <div className="bg-[#0e1015] border border-white/10 p-5 rounded-sm">
          <div className="flex items-center justify-between text-xs text-[#8e95a5] mb-2">
            <span>FEATURED WORKS</span>
            <FileCheck2 className="w-4 h-4 text-[#00ff9d]" />
          </div>
          <div className="text-3xl font-bold font-mono text-[#f4f2eb]">
            {stats.featuredProjects}
          </div>
          <div className="text-[10px] text-[#00ff9d] mt-2">
            Showcased on main portfolio
          </div>
        </div>

        <div className="bg-[#0e1015] border border-white/10 p-5 rounded-sm">
          <div className="flex items-center justify-between text-xs text-[#8e95a5] mb-2">
            <span>TECHNICAL SKILLS</span>
            <Cpu className="w-4 h-4 text-[#00ff9d]" />
          </div>
          <div className="text-3xl font-bold font-mono text-[#f4f2eb]">
            {stats.totalSkills}
          </div>
          <div className="text-[10px] text-[#8e95a5] mt-2">
            Verified categories configured
          </div>
        </div>

        <div className="bg-[#0e1015] border border-white/10 p-5 rounded-sm">
          <div className="flex items-center justify-between text-xs text-[#8e95a5] mb-2">
            <span>INQUIRIES INBOX</span>
            <Mail className="w-4 h-4 text-[#00ff9d]" />
          </div>
          <div className="text-3xl font-bold font-mono text-[#f4f2eb]">
            {stats.totalMessages}
          </div>
          <div className="text-[10px] text-amber-400 mt-2">
            {stats.unreadMessages} unread messages
          </div>
        </div>

      </div>

      {/* Two-Column Detail View: Recent Projects & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Projects Table */}
        <div className="lg:col-span-7 bg-[#0e1015] border border-white/10 rounded-sm p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-xs">
            <span className="font-bold text-[#f4f2eb] uppercase tracking-wider">
              Recent Project Artifacts
            </span>
            <Link href="/admin/projects" className="text-[#00ff9d] hover:underline flex items-center gap-1 text-[11px]">
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {stats.recentProjects.map((p: any) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 bg-[#12151c] border border-white/5 rounded-sm text-xs"
              >
                <div>
                  <span className="font-bold text-[#f4f2eb] block">{p.title_en}</span>
                  <span className="text-[10px] text-[#8e95a5] flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3" />
                    Updated: {new Date(p.updated_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.is_published
                        ? 'bg-[#00ff9d]/10 text-[#00ff9d]'
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}
                  >
                    {p.is_published ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries List */}
        <div className="lg:col-span-5 bg-[#0e1015] border border-white/10 rounded-sm p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-xs">
            <span className="font-bold text-[#f4f2eb] uppercase tracking-wider">
              Recent Contact Transmissions
            </span>
            <Link href="/admin/messages" className="text-[#00ff9d] hover:underline flex items-center gap-1 text-[11px]">
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {stats.recentMessages.length > 0 ? (
              stats.recentMessages.map((m: any) => (
                <div
                  key={m.id}
                  className="p-3 bg-[#12151c] border border-white/5 rounded-sm text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#f4f2eb]">{m.name}</span>
                    <span className="text-[10px] text-[#8e95a5]">
                      {new Date(m.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#00ff9d]">{m.email}</div>
                  {m.subject && (
                    <div className="text-[11px] text-[#8e95a5] truncate">
                      {m.subject}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[#8e95a5]">
                No contact messages in database yet.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
