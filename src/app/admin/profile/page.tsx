'use client';

import React, { useState, useEffect } from 'react';
import { User, Save, Check, AlertCircle, RefreshCw, Globe, MapPin, Mail } from 'lucide-react';

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState<any>({
    name_en: '',
    name_ar: '',
    headline_en: '',
    headline_ar: '',
    bio_en: '',
    bio_ar: '',
    role_en: '',
    role_ar: '',
    location_en: '',
    location_ar: '',
    timezone: '',
    status_en: '',
    status_ar: '',
    email: '',
    github_url: '',
    linkedin_url: '',
    portrait_url: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch {
      setError('Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        throw new Error('Save failed');
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      setError('Failed to update profile records');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs text-[#8e95a5] flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4 animate-spin text-[#00ff9d]" />
        <span>Loading Profile Configuration...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold font-mono text-[#f4f2eb] tracking-tight">
            PROFILE MANAGEMENT
          </h1>
          <p className="text-xs text-[#8e95a5] mt-1">
            Configure personal identity, bilingual biography, coordinates, and contact dispatch points.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#00ff9d] hover:bg-[#20ffa9] text-[#07080a] font-bold text-xs rounded-sm transition-colors cursor-pointer disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Profile'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-[#00ff9d]/10 border border-[#00ff9d]/30 rounded-sm text-xs text-[#00ff9d] flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>✓ Profile records successfully committed to SQLite database!</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-sm text-xs text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8 text-xs font-mono">
        
        {/* Identity & Headings */}
        <div className="bg-[#0e1015] border border-white/10 p-6 rounded-sm space-y-5">
          <h2 className="text-sm font-bold text-[#00ff9d] pb-2 border-b border-white/5 uppercase">
            01 // Core Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                Name (English)
              </label>
              <input
                type="text"
                value={profile.name_en}
                onChange={(e) => setProfile({ ...profile, name_en: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                الاسم (بالعربية)
              </label>
              <input
                type="text"
                dir="rtl"
                value={profile.name_ar}
                onChange={(e) => setProfile({ ...profile, name_ar: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                Role / Title (English)
              </label>
              <input
                type="text"
                value={profile.role_en}
                onChange={(e) => setProfile({ ...profile, role_en: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                المسمى المهني (بالعربية)
              </label>
              <input
                type="text"
                dir="rtl"
                value={profile.role_ar}
                onChange={(e) => setProfile({ ...profile, role_ar: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                Hero Headline (English)
              </label>
              <input
                type="text"
                value={profile.headline_en}
                onChange={(e) => setProfile({ ...profile, headline_en: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                العنوان الرئيسي (بالعربية)
              </label>
              <input
                type="text"
                dir="rtl"
                value={profile.headline_ar}
                onChange={(e) => setProfile({ ...profile, headline_ar: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                Bio Summary (English)
              </label>
              <textarea
                rows={4}
                value={profile.bio_en}
                onChange={(e) => setProfile({ ...profile, bio_en: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                نبذة السيرة الذاتية (بالعربية)
              </label>
              <textarea
                rows={4}
                dir="rtl"
                value={profile.bio_ar}
                onChange={(e) => setProfile({ ...profile, bio_ar: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none resize-none font-sans"
              />
            </div>
          </div>
        </div>

        {/* Location, Availability & Links */}
        <div className="bg-[#0e1015] border border-white/10 p-6 rounded-sm space-y-5">
          <h2 className="text-sm font-bold text-[#00ff9d] pb-2 border-b border-white/5 uppercase">
            02 // Coordinates & Dispatch Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                Location (English)
              </label>
              <input
                type="text"
                value={profile.location_en}
                onChange={(e) => setProfile({ ...profile, location_en: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                الموقع (بالعربية)
              </label>
              <input
                type="text"
                dir="rtl"
                value={profile.location_ar}
                onChange={(e) => setProfile({ ...profile, location_ar: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                Timezone
              </label>
              <input
                type="text"
                value={profile.timezone}
                onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                Availability Note (English)
              </label>
              <input
                type="text"
                value={profile.status_en}
                onChange={(e) => setProfile({ ...profile, status_en: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                حالة التفرغ (بالعربية)
              </label>
              <input
                type="text"
                dir="rtl"
                value={profile.status_ar}
                onChange={(e) => setProfile({ ...profile, status_ar: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                Primary Contact Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                GitHub Profile URL
              </label>
              <input
                type="url"
                value={profile.github_url}
                onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={profile.linkedin_url}
                onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">
              Portrait Asset Path
            </label>
            <input
              type="text"
              value={profile.portrait_url}
              onChange={(e) => setProfile({ ...profile, portrait_url: e.target.value })}
              className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff9d] hover:bg-[#20ffa9] text-[#07080a] font-bold text-xs rounded-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>Commit Profile Changes</span>
          </button>
        </div>

      </form>
    </div>
  );
}
