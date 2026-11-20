'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, Check, RefreshCw } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    site_title: '',
    allow_contact_form: 'true',
    default_language: 'en',
    accent_theme: 'mint',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs text-[#8e95a5] flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4 animate-spin text-[#00ff9d]" />
        <span>Loading Configuration...</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8 font-mono text-xs">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-[#f4f2eb] tracking-tight">
            SITE SETTINGS & SYSTEM CONFIGURATION
          </h1>
          <p className="text-[#8e95a5] mt-1 text-xs">
            Manage global portfolio metadata, language defaults, and public modules.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#00ff9d] hover:bg-[#20ffa9] text-[#07080a] font-bold rounded-sm transition-colors cursor-pointer disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-3 bg-[#00ff9d]/10 border border-[#00ff9d]/30 rounded-sm text-[#00ff9d] flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>✓ Settings updated successfully in SQLite database!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 bg-[#0e1015] border border-white/10 p-6 rounded-sm">
        <div>
          <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Public Site Title</label>
          <input
            type="text"
            value={settings.site_title || ''}
            onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
            className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
          />
        </div>

        <div>
          <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Default Interface Language</label>
          <select
            value={settings.default_language || 'en'}
            onChange={(e) => setSettings({ ...settings, default_language: e.target.value })}
            className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
          >
            <option value="en">English (LTR)</option>
            <option value="ar">Arabic (RTL)</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">Color Palette & Accent</label>
          <select
            value={settings.accent_theme || 'mint'}
            onChange={(e) => setSettings({ ...settings, accent_theme: e.target.value })}
            className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
          >
            <option value="mint">Technical Mint / Emerald (#00ff9d)</option>
            <option value="lime">Acid Lime / Chartreuse (#d4ff32)</option>
          </select>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allow_contact_form === 'true'}
              onChange={(e) => setSettings({ ...settings, allow_contact_form: e.target.checked ? 'true' : 'false' })}
              className="rounded bg-[#07080a] border-white/10 text-[#00ff9d]"
            />
            <span>Enable Public Contact Transmission Form</span>
          </label>
        </div>
      </form>

    </div>
  );
}
