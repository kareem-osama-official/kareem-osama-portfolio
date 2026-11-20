'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Lock, Terminal, Cpu } from 'lucide-react';

export function Footer() {
  const { language, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-white/10 bg-[#07080a] relative text-xs font-mono text-[#8e95a5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ======================================================== */}
        {/* UPPER CARD: SYSTEM_LOG + TECH_STACK + CAIRO (IMAGE 1)     */}
        {/* ======================================================== */}
        <div className="bg-[#0c0e14] border border-white/10 rounded-md p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* LEFT: SYSTEM LOG */}
            <div className="md:col-span-5 space-y-2">
              <div className="text-[10px] text-[#00ff9d] tracking-wider font-bold">
                &gt; SYSTEM_LOG
              </div>
              <div className="space-y-1 text-[11px] leading-relaxed">
                <div>[10:30:15] Portfolio initialized</div>
                <div>[10:30:16] SQLite WAL verified</div>
                <div className="text-[#00ff9d]">[10:30:17] Ready.</div>
              </div>
            </div>

            {/* CENTER: TECH STACK BADGES (MATCHING IMAGE 1 ICON ROW) */}
            <div className="md:col-span-4 flex flex-col items-start md:items-center space-y-2.5">
              <div className="text-[10px] text-[#8e95a5] uppercase tracking-wider">
                &gt; TECH_STACK
              </div>
              <div className="flex items-center gap-2">
                {/* Next.js N Badge */}
                <div className="w-8 h-8 rounded-full bg-[#12151c] border border-white/10 flex items-center justify-center font-bold text-[#f4f2eb] text-xs shadow-sm hover:border-[#00ff9d] transition-colors" title="Next.js 16">
                  N
                </div>
                {/* TypeScript TS Badge */}
                <div className="w-8 h-8 rounded-full bg-[#12151c] border border-white/10 flex items-center justify-center font-bold text-[#00ff9d] text-xs shadow-sm hover:border-[#00ff9d] transition-colors" title="TypeScript">
                  TS
                </div>
                {/* React Atom Badge */}
                <div className="w-8 h-8 rounded-full bg-[#12151c] border border-white/10 flex items-center justify-center text-cyan-400 text-xs shadow-sm hover:border-[#00ff9d] transition-colors" title="React 19">
                  ⚛
                </div>
                {/* Node.js / C++ Badge */}
                <div className="w-8 h-8 rounded-full bg-[#12151c] border border-white/10 flex items-center justify-center font-bold text-[#f4f2eb] text-[10px] shadow-sm hover:border-[#00ff9d] transition-colors" title="C++ & Node.js">
                  C++
                </div>
                {/* SQLite DB Badge */}
                <div className="w-8 h-8 rounded-full bg-[#12151c] border border-white/10 flex items-center justify-center font-bold text-[#00ff9d] text-[10px] shadow-sm hover:border-[#00ff9d] transition-colors" title="SQLite">
                  SQL
                </div>
                {/* Vercel Triangle */}
                <div className="w-8 h-8 rounded-full bg-[#12151c] border border-white/10 flex items-center justify-center text-white text-[10px] shadow-sm hover:border-[#00ff9d] transition-colors" title="Vercel & Next">
                  ▲
                </div>
              </div>
            </div>

            {/* RIGHT: LOCATION & ADMIN LINK */}
            <div className="md:col-span-3 flex flex-col items-start md:items-end space-y-2">
              <div className="text-[11px] font-bold text-[#f4f2eb] flex items-center gap-1.5">
                <span>BASED IN CAIRO</span>
                <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] bg-[#12151c] hover:bg-[#1a1f29] text-[#8e95a5] hover:text-[#00ff9d] border border-white/10 rounded-sm transition-all"
                  title="Admin OS"
                >
                  <Lock className="w-2.5 h-2.5 text-[#00ff9d]" />
                  <span>[ADMIN_OS]</span>
                </Link>
                <span className="text-[10px] text-[#8e95a5]">UTC+2 EEST</span>
              </div>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* LOWER BAR: MONOGRAM + THANKS + SOCIALS (IMAGE 1)         */}
        {/* ======================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-white/5">
          
          {/* Left: Monogram + Thanks */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center font-mono font-bold text-[10px] text-[#00ff9d] border border-[#00ff9d]/40 bg-[#00ff9d]/10 rounded-[2px]">
              KO
            </div>
            <div className="text-[11px]">
              <span className="text-[#8e95a5]">// THANKS FOR VISITING &bull; </span>
              <span className="text-[#f4f2eb] font-semibold">{t(PERSONAL_INFO.name)}</span>
            </div>
          </div>

          {/* Right: Social icons + Return to top */}
          <div className="flex items-center gap-5">
            <a
              href={PERSONAL_INFO.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8e95a5] hover:text-[#00ff9d] transition-colors"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8e95a5] hover:text-[#00ff9d] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-[#12151c] hover:bg-[#1a1f29] text-[#8e95a5] hover:text-[#00ff9d] border border-white/10 rounded-sm transition-colors cursor-pointer text-[10px]"
              aria-label="Scroll to top"
            >
              <span>{language === 'ar' ? 'للأعلى' : 'TOP'}</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
