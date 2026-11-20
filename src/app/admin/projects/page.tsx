'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Check,
  AlertCircle,
  X,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch {
      showNotice('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleTogglePublish = async (project: any) => {
    const nextState = project.is_published ? 0 : 1;
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: project.id, is_published: nextState }),
      });
      if (res.ok) {
        setProjects(projects.map((p) => (p.id === project.id ? { ...p, is_published: nextState } : p)));
        showNotice(`Project ${nextState ? 'published' : 'unturned to draft'}`);
      }
    } catch {
      showNotice('Failed to toggle publish state');
    }
  };

  const handleToggleFeatured = async (project: any) => {
    const nextState = project.is_featured ? 0 : 1;
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: project.id, is_featured: nextState }),
      });
      if (res.ok) {
        setProjects(projects.map((p) => (p.id === project.id ? { ...p, is_featured: nextState } : p)));
        showNotice(`Project ${nextState ? 'marked featured' : 'unfeatured'}`);
      }
    } catch {
      showNotice('Failed to toggle featured state');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        setDeletingId(null);
        showNotice('Project removed from database');
      }
    } catch {
      showNotice('Failed to delete project');
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = Boolean(editingProject?.id);
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });

      if (res.ok) {
        fetchProjects();
        setEditingProject(null);
        setIsCreating(false);
        showNotice(`Project ${isEdit ? 'updated' : 'created'} successfully!`);
      }
    } catch {
      showNotice('Save failed');
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title_ar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category_en?.toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === 'published') return matchesSearch && p.is_published === 1;
    if (statusFilter === 'draft') return matchesSearch && p.is_published === 0;
    return matchesSearch;
  });

  return (
    <div className="space-y-8 font-mono text-xs">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-[#f4f2eb] tracking-tight">
            PROJECT ARTIFACTS & CASE STUDIES
          </h1>
          <p className="text-[#8e95a5] mt-1 text-xs">
            Manage public portfolio works, feature statuses, and technical case studies.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingProject({
              title_en: '',
              title_ar: '',
              tagline_en: '',
              tagline_ar: '',
              category_en: 'Software Architecture',
              category_ar: 'معمارية البرمجيات',
              role_en: 'Lead Engineer',
              role_ar: 'مهندس النظام',
              overview_en: '',
              overview_ar: '',
              problem_en: '',
              problem_ar: '',
              architecture_en: '',
              architecture_ar: '',
              technologies: '["Next.js", "TypeScript"]',
              status_badge_en: 'Active Development',
              status_badge_ar: 'قيد التطوير',
              status_type: 'in_progress',
              status_note_en: '',
              status_note_ar: '',
              features_json: '[]',
              github_url: '',
              live_demo_url: '',
              results_metric_en: '',
              results_metric_ar: '',
              is_flagship: 0,
              is_featured: 1,
              is_published: 1,
              display_order: projects.length + 1,
            });
            setIsCreating(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#00ff9d] hover:bg-[#20ffa9] text-[#07080a] font-bold rounded-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Project</span>
        </button>
      </div>

      {notification && (
        <div className="p-3 bg-[#00ff9d]/10 border border-[#00ff9d]/30 rounded-sm text-[#00ff9d] flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#0e1015] border border-white/10 rounded-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#8e95a5] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search artifacts..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
              statusFilter === 'all' ? 'bg-[#00ff9d] text-[#07080a] font-bold' : 'text-[#8e95a5] hover:text-[#f4f2eb]'
            }`}
          >
            All ({projects.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('published')}
            className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
              statusFilter === 'published' ? 'bg-[#00ff9d] text-[#07080a] font-bold' : 'text-[#8e95a5] hover:text-[#f4f2eb]'
            }`}
          >
            Published ({projects.filter((p) => p.is_published === 1).length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('draft')}
            className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
              statusFilter === 'draft' ? 'bg-[#00ff9d] text-[#07080a] font-bold' : 'text-[#8e95a5] hover:text-[#f4f2eb]'
            }`}
          >
            Drafts ({projects.filter((p) => p.is_published === 0).length})
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-[#0e1015] border border-white/10 rounded-sm overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#12151c] text-[#8e95a5] text-[10px] uppercase tracking-wider">
                <th className="p-3.5">Title & Category</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Featured</th>
                <th className="p-3.5">Updated</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-[#12151c]/50 transition-colors">
                  <td className="p-3.5">
                    <span className="font-bold text-[#f4f2eb] block">{p.title_en}</span>
                    <span className="text-[10px] text-[#8e95a5]">{p.category_en}</span>
                  </td>

                  <td className="p-3.5">
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(p)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                        p.is_published
                          ? 'bg-[#00ff9d]/10 text-[#00ff9d] hover:bg-[#00ff9d]/20'
                          : 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
                      }`}
                    >
                      {p.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{p.is_published ? 'PUBLISHED' : 'DRAFT'}</span>
                    </button>
                  </td>

                  <td className="p-3.5">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(p)}
                      className={`p-1 rounded cursor-pointer transition-colors ${
                        p.is_featured ? 'text-[#00ff9d]' : 'text-white/20 hover:text-white/50'
                      }`}
                      title={p.is_featured ? 'Featured on home' : 'Click to feature'}
                    >
                      <Star className={`w-4 h-4 ${p.is_featured ? 'fill-current' : ''}`} />
                    </button>
                  </td>

                  <td className="p-3.5 text-[10px] text-[#8e95a5]">
                    {new Date(p.updated_at).toLocaleDateString()}
                  </td>

                  <td className="p-3.5 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(p);
                        setIsCreating(false);
                      }}
                      className="p-1.5 bg-[#12151c] hover:bg-[#1a1e27] text-[#f4f2eb] hover:text-[#00ff9d] rounded-sm transition-colors cursor-pointer"
                      title="Edit project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingId(p.id)}
                      className="p-1.5 bg-[#12151c] hover:bg-red-500/20 text-red-400 rounded-sm transition-colors cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#8e95a5]">
                    No matching project artifacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0e1015] border border-red-500/40 p-6 rounded-sm max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-red-400">Confirm Deletion</h3>
            <p className="text-xs text-[#8e95a5]">
              Are you sure you want to delete this project artifact from the SQLite database? This action is irreversible.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-3 py-1.5 bg-[#12151c] text-[#f4f2eb] hover:bg-[#1a1e27] rounded-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deletingId)}
                className="px-3 py-1.5 bg-red-600 text-white font-bold rounded-sm hover:bg-red-700 cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Create / Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0e1015] border border-white/15 p-6 sm:p-8 rounded-sm max-w-3xl w-full my-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-base font-bold text-[#00ff9d]">
                {isCreating ? 'CREATE NEW PROJECT ARTIFACT' : 'EDIT PROJECT ARTIFACT'}
              </h2>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="text-[#8e95a5] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Title (EN) *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title_en || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title_en: e.target.value })}
                    className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">العنوان (عربي) *</label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={editingProject.title_ar || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title_ar: e.target.value })}
                    className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Tagline (EN)</label>
                  <input
                    type="text"
                    value={editingProject.tagline_en || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, tagline_en: e.target.value })}
                    className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">السطر التعريفي (عربي)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={editingProject.tagline_ar || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, tagline_ar: e.target.value })}
                    className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Category (EN)</label>
                  <input
                    type="text"
                    value={editingProject.category_en || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, category_en: e.target.value })}
                    className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Status Badge (EN)</label>
                  <input
                    type="text"
                    value={editingProject.status_badge_en || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, status_badge_en: e.target.value })}
                    className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Results Metric (EN)</label>
                  <input
                    type="text"
                    value={editingProject.results_metric_en || ''}
                    placeholder="e.g. 100% Verified"
                    onChange={(e) => setEditingProject({ ...editingProject, results_metric_en: e.target.value })}
                    className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Overview (EN)</label>
                <textarea
                  rows={3}
                  value={editingProject.overview_en || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, overview_en: e.target.value })}
                  className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Tech Stack (JSON array string)</label>
                <input
                  type="text"
                  value={editingProject.technologies || '[]'}
                  onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value })}
                  placeholder='["Next.js", "TypeScript", "Tailwind CSS"]'
                  className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">GitHub Repo URL (Optional)</label>
                  <input
                    type="url"
                    value={editingProject.github_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Live Demo URL (Optional)</label>
                  <input
                    type="url"
                    value={editingProject.live_demo_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, live_demo_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.is_published === 1}
                    onChange={(e) => setEditingProject({ ...editingProject, is_published: e.target.checked ? 1 : 0 })}
                    className="rounded bg-[#07080a] border-white/10 text-[#00ff9d]"
                  />
                  <span>Published</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.is_featured === 1}
                    onChange={(e) => setEditingProject({ ...editingProject, is_featured: e.target.checked ? 1 : 0 })}
                    className="rounded bg-[#07080a] border-white/10 text-[#00ff9d]"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-[#12151c] text-[#f4f2eb] hover:bg-[#1a1e27] rounded-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00ff9d] text-[#07080a] font-bold rounded-sm hover:bg-[#20ffa9] cursor-pointer"
                >
                  Save Project
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
