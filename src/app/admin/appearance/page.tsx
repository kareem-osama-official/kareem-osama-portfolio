'use client';

import React, { useState, useEffect } from 'react';
import { Palette, Check, Save, Sparkles, RefreshCw } from 'lucide-react';

export default function AdminAppearancePage() {
  const [accent, setAccent] = useState('#00ff9d');
  const [fontPreference, setFontPreference] = useState('space_grotesk');
  const [gridEnabled, setGridEnabled] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const presets = [
    { name: 'Signature Atelier Mint (IMAGE 1 Default)', value: '#00ff9d', desc: 'Exact reference mint green accent' },
    { name: 'Cyber Matrix Green', value: '#00e676', desc: 'High-contrast emerald code hue' },
    { name: 'Electric Cyan', value: '#00f0ff', desc: 'Precision futuristic engineering tint' },
    { name: 'Architectural Gold', value: '#ffd700', desc: 'Warm editorial brass accent' },
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accent_color: accent,
          font_preference: fontPreference,
          grid_enabled: gridEnabled ? 'true' : 'false',
        }),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 font-mono text-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[#00ff9d] text-xs font-bold mb-1">
            <Palette className="w-4 h-4" />
            <span>APPEARANCE &amp; DESIGN SYSTEM</span>
          </div>
          <h1 className="text-xl font-bold text-[#f4f2eb]">
            Visual Theme &amp; Color Configuration
          </h1>
          <p className="text-[11px] text-[#8e95a5] mt-1">
            Customize the technical design system, typography balance, and accent hues.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff9d] hover:bg-[#33ffb0] text-[#07080a] font-bold text-xs rounded-sm transition-colors cursor-pointer disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saving ? 'SAVING...' : 'APPLY THEME CHANGES'}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-[#00ff9d]/10 border border-[#00ff9d]/30 text-[#00ff9d] rounded flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Appearance preferences saved to SQLite site_settings table successfully!</span>
        </div>
      )}

      {/* Preset Accent Color Picker */}
      <div className="p-6 bg-[#0e1015] border border-white/10 rounded-sm space-y-4">
        <div className="text-xs font-bold text-[#f4f2eb] flex items-center justify-between">
          <span>01 // ACCENT COLOR SCHEME</span>
          <span className="text-[#00ff9d]">{accent}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {presets.map((preset) => (
            <div
              key={preset.value}
              onClick={() => setAccent(preset.value)}
              className={`p-4 bg-[#12151c] border rounded-sm transition-all cursor-pointer flex items-center justify-between ${
                accent === preset.value
                  ? 'border-[#00ff9d] ring-1 ring-[#00ff9d]/40'
                  : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full shadow-sm"
                  style={{ backgroundColor: preset.value }}
                />
                <div>
                  <div className="text-[#f4f2eb] font-bold text-xs">{preset.name}</div>
                  <div className="text-[#8e95a5] text-[10px]">{preset.desc}</div>
                </div>
              </div>
              {accent === preset.value && <Check className="w-4 h-4 text-[#00ff9d]" />}
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview Component Card */}
      <div className="p-6 bg-[#0e1015] border border-white/10 rounded-sm space-y-4">
        <div className="text-xs font-bold text-[#f4f2eb]">
          02 // LIVE ACCENT PREVIEW COMPONENT
        </div>

        <div className="p-5 bg-[#07080a] border border-white/10 rounded-sm space-y-3">
          <div className="flex items-center justify-between text-[10px] text-[#8e95a5]">
            <span style={{ color: accent }}>&gt; PREVIEW_TELEMETRY.EXE</span>
            <span style={{ color: accent }}>STATUS: ACTIVE</span>
          </div>

          <h3 className="text-xl font-extrabold text-[#f4f2eb] font-sans">
            Building Systems Behind the <span style={{ color: accent }}>Interface.</span>
          </h3>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              className="px-4 py-2 text-xs font-bold uppercase rounded-sm cursor-pointer"
              style={{ backgroundColor: accent, color: '#07080a' }}
            >
              Primary Action Button
            </button>
            <button
              type="button"
              className="px-4 py-2 text-xs uppercase rounded-sm border border-white/10 text-[#f4f2eb]"
            >
              Secondary Action
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
