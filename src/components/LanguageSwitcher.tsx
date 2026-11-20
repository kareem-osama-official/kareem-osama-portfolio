'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Languages } from 'lucide-react';

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-1 bg-[#121419] border border-white/10 rounded-sm text-xs font-mono tracking-wider ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <Languages className="w-3.5 h-3.5 mx-1.5 text-[#8e95a5]" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded-[2px] transition-all duration-200 cursor-pointer ${
          language === 'en'
            ? 'bg-[#00ff9d] text-[#090a0d] font-bold shadow-sm'
            : 'text-[#8e95a5] hover:text-[#f4f2eb]'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <div className="w-[1px] h-3 bg-white/10 mx-0.5" />
      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`px-2 py-1 rounded-[2px] transition-all duration-200 font-sans cursor-pointer ${
          language === 'ar'
            ? 'bg-[#00ff9d] text-[#090a0d] font-bold shadow-sm'
            : 'text-[#8e95a5] hover:text-[#f4f2eb]'
        }`}
        aria-pressed={language === 'ar'}
      >
        عربي
      </button>
    </div>
  );
}
