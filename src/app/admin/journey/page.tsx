'use client';

import React, { useState, useEffect } from 'react';
import { GraduationCap, Plus, Trash2, Check, Eye, EyeOff, X } from 'lucide-react';

export default function AdminJourneyPage() {
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newModal, setNewModal] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    period: '2026',
    title_en: '',
    title_ar: '',
    institution_en: '',
    institution_ar: '',
    description_en: '',
    description_ar: '',
    badge_en: 'Milestone',
    badge_ar: 'محطة',
    skills_applied: '["Computer Science"]',
    display_order: 1,
    is_visible: 1,
  });

  useEffect(() => {
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/journey');
      if (res.ok) {
        const data = await res.json();
        setMilestones(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisible = async (m: any) => {
    const nextVal = m.is_visible ? 0 : 1;
    await fetch('/api/admin/journey', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: m.id, is_visible: nextVal }),
    });
    setMilestones(milestones.map((item) => (item.id === m.id ? { ...item, is_visible: nextVal } : item)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this milestone record?')) return;
    await fetch(`/api/admin/journey?id=${id}`, { method: 'DELETE' });
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/journey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMilestone),
    });
    if (res.ok) {
      setNewModal(false);
      fetchMilestones();
    }
  };

  return (
    <div className="space-y-8 font-mono text-xs">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-[#f4f2eb] tracking-tight">
            ACADEMIC & LEARNING TRAJECTORY
          </h1>
          <p className="text-[#8e95a5] mt-1 text-xs">
            Manage academic milestones, certifications, and foundational achievements.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setNewModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#00ff9d] hover:bg-[#20ffa9] text-[#07080a] font-bold rounded-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Trajectory Milestone</span>
        </button>
      </div>

      <div className="space-y-4">
        {milestones.map((m) => (
          <div
            key={m.id}
            className="p-5 bg-[#0e1015] border border-white/10 rounded-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[#00ff9d] font-bold">{m.period}</span>
                <span className="text-white/20">•</span>
                <span className="text-[#8e95a5]">{m.institution_en}</span>
                <span className="px-1.5 py-0.5 bg-[#12151c] border border-white/5 rounded text-[10px]">
                  {m.badge_en}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#f4f2eb]">{m.title_en}</h3>
              <p className="text-xs text-[#8e95a5] max-w-2xl">{m.description_en}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleToggleVisible(m)}
                className={`inline-flex items-center gap-1 text-[10px] font-bold ${
                  m.is_visible ? 'text-[#00ff9d]' : 'text-yellow-400'
                }`}
              >
                {m.is_visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                <span>{m.is_visible ? 'VISIBLE' : 'HIDDEN'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDelete(m.id)}
                className="p-1 hover:text-red-400 text-[#8e95a5] transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {newModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0e1015] border border-white/15 p-6 rounded-sm max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-[#00ff9d]">ADD TRAJECTORY MILESTONE</h3>
              <button type="button" onClick={() => setNewModal(false)}>
                <X className="w-4 h-4 text-[#8e95a5]" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Period *</label>
                  <input
                    type="text"
                    required
                    value={newMilestone.period}
                    onChange={(e) => setNewMilestone({ ...newMilestone, period: e.target.value })}
                    placeholder="2025 — 2026"
                    className="w-full px-3 py-1.5 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Badge (EN)</label>
                  <input
                    type="text"
                    value={newMilestone.badge_en}
                    onChange={(e) => setNewMilestone({ ...newMilestone, badge_en: e.target.value })}
                    className="w-full px-3 py-1.5 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Title (EN) *</label>
                <input
                  type="text"
                  required
                  value={newMilestone.title_en}
                  onChange={(e) => setNewMilestone({ ...newMilestone, title_en: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Institution (EN) *</label>
                <input
                  type="text"
                  required
                  value={newMilestone.institution_en}
                  onChange={(e) => setNewMilestone({ ...newMilestone, institution_en: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Description (EN)</label>
                <textarea
                  rows={3}
                  value={newMilestone.description_en}
                  onChange={(e) => setNewMilestone({ ...newMilestone, description_en: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setNewModal(false)}
                  className="px-3 py-1.5 bg-[#12151c] text-[#f4f2eb] rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#00ff9d] text-[#07080a] font-bold rounded-sm"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
