'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Plus, Trash2, Check, Eye, EyeOff, Star, X } from 'lucide-react';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [newSkillModal, setNewSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'languages',
    level_en: 'Foundational',
    level_ar: 'تأسيسي',
    evidence_en: '',
    evidence_ar: '',
    is_highlight: 0,
    is_visible: 1,
    display_order: 1,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/skills');
      if (res.ok) {
        const data = await res.json();
        setSkills(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisible = async (skill: any) => {
    const nextVal = skill.is_visible ? 0 : 1;
    await fetch('/api/admin/skills', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: skill.id, is_visible: nextVal }),
    });
    setSkills(skills.map((s) => (s.id === skill.id ? { ...s, is_visible: nextVal } : s)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill capability?')) return;
    await fetch(`/api/admin/skills?id=${id}`, { method: 'DELETE' });
    setSkills(skills.filter((s) => s.id !== id));
  };

  const handleCreateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSkill),
    });
    if (res.ok) {
      setNewSkillModal(false);
      fetchSkills();
    }
  };

  const categories = ['all', 'languages', 'frontend', 'foundations', 'tools'];
  const filtered = activeCategory === 'all' ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-8 font-mono text-xs">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-[#f4f2eb] tracking-tight">
            TECHNICAL CAPABILITIES & SKILLS
          </h1>
          <p className="text-[#8e95a5] mt-1 text-xs">
            Manage verifiable technical skills, competency levels, and practical evidence.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setNewSkillModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#00ff9d] hover:bg-[#20ffa9] text-[#07080a] font-bold rounded-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill Entry</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActiveCategory(c)}
            className={`px-3 py-1.5 rounded-sm uppercase tracking-wider transition-colors cursor-pointer ${
              activeCategory === c ? 'bg-[#00ff9d] text-[#07080a] font-bold' : 'bg-[#0e1015] border border-white/10 text-[#8e95a5]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="p-4 bg-[#0e1015] border border-white/10 rounded-sm flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#f4f2eb] text-sm">{s.name}</span>
                <span className="text-[10px] uppercase text-[#00ff9d] px-1.5 py-0.5 bg-[#00ff9d]/10 rounded">
                  {s.category}
                </span>
              </div>
              <div className="text-[11px] text-[#8e95a5]">{s.level_en}</div>
              {s.evidence_en && (
                <div className="text-[10px] text-white/50 pt-2 border-t border-white/5 mt-2">
                  Evidence: {s.evidence_en}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={() => handleToggleVisible(s)}
                className={`inline-flex items-center gap-1 text-[10px] font-bold ${
                  s.is_visible ? 'text-[#00ff9d]' : 'text-yellow-400'
                }`}
              >
                {s.is_visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                <span>{s.is_visible ? 'VISIBLE' : 'HIDDEN'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDelete(s.id)}
                className="p-1 hover:text-red-400 text-[#8e95a5] transition-colors"
                title="Delete skill"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Skill Modal */}
      {newSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0e1015] border border-white/15 p-6 rounded-sm max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-[#00ff9d]">ADD TECHNICAL SKILL</h3>
              <button type="button" onClick={() => setNewSkillModal(false)}>
                <X className="w-4 h-4 text-[#8e95a5]" />
              </button>
            </div>

            <form onSubmit={handleCreateSkill} className="space-y-3">
              <div>
                <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="e.g. Docker"
                  className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Category</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
                >
                  <option value="languages">Languages</option>
                  <option value="frontend">Frontend</option>
                  <option value="foundations">Foundations & CS</option>
                  <option value="tools">Tools & Workflow</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Level Description (EN)</label>
                <input
                  type="text"
                  value={newSkill.level_en}
                  onChange={(e) => setNewSkill({ ...newSkill, level_en: e.target.value })}
                  placeholder="e.g. Container Architecture"
                  className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Evidence / Usage (EN)</label>
                <input
                  type="text"
                  value={newSkill.evidence_en}
                  onChange={(e) => setNewSkill({ ...newSkill, evidence_en: e.target.value })}
                  placeholder="e.g. Multi-stage Dockerfiles"
                  className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setNewSkillModal(false)}
                  className="px-3 py-1.5 bg-[#12151c] text-[#f4f2eb] rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#00ff9d] text-[#07080a] font-bold rounded-sm"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
