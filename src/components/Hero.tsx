'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PortraitFrame } from './PortraitFrame';
import { ArrowDown, ArrowUpRight, Terminal, Download, Sparkles } from 'lucide-react';

export function Hero() {
  const { language, t, isRtl } = useLanguage();

  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-[#07080a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* UNIFIED ARCHITECTURAL 3-COLUMN CANVAS CONTAINER          */}
        {/* ======================================================== */}
        <div className="relative bg-[#0c0e14] border border-white/10 rounded-md overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[540px]">
            
            {/* ====================================================== */}
            {/* COLUMN 1: STATEMENT & ACTIONS (~50% WIDTH, 6 COLS)     */}
            {/* ====================================================== */}
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 z-10 space-y-8">
              
              {/* Terminal Initialization Status */}
              <div className="space-y-1 font-mono text-xs">
                <div className="inline-flex items-center gap-2 text-[#00ff9d]">
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="tracking-wider">&gt; INITIALIZING_PORTFOLIO.EXE</span>
                </div>
                <div className="text-[11px] text-[#8e95a5] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
                  <span>&gt; STATUS: ONLINE</span>
                </div>
              </div>

              {/* Dominant Headline & Subtitle */}
              <div className="space-y-4 my-auto">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#f4f2eb] font-sans leading-[1.08]">
                  {language === 'ar' ? (
                    <>
                      بناء النظم<br />
                      ما وراء <span className="text-[#00ff9d]">الواجهات.</span>
                    </>
                  ) : (
                    <>
                      Building Systems<br />
                      Behind the <span className="text-[#00ff9d]">Interface.</span>
                    </>
                  )}
                </h1>

                <p className="text-xs sm:text-sm text-[#8e95a5] font-mono leading-relaxed max-w-lg">
                  {language === 'ar'
                    ? 'طالب علوم حاسب يبني برمجيات رقمية رصينة بنية معمارية نظيفة، مع التركيز على الخوارزميات، إدارة الذاكرة، وهندسة الويب الحديثة.'
                    : 'I design and build robust digital systems with clean architecture, focused on core algorithms, memory safety, and high-performance web engineering.'}
                </p>

                {/* Side-by-Side Action Buttons (Exact Reference Styling) */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-[#07080a] text-xs font-mono font-bold tracking-wider uppercase rounded-sm transition-all duration-200 cursor-pointer shadow-sm group"
                  >
                    <span>{language === 'ar' ? 'استعراض المشاريع' : 'VIEW MY WORK'}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                  </a>

                  <a
                    href="#journey"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#12151c] hover:bg-[#181d26] text-[#f4f2eb] hover:text-[#00ff9d] border border-white/10 hover:border-white/20 text-xs font-mono tracking-wider uppercase rounded-sm transition-all duration-200 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#8e95a5]" />
                    <span>{language === 'ar' ? 'المسار والسيرة' : 'DOWNLOAD CV'}</span>
                  </a>
                </div>
              </div>

              {/* Bottom Scroll Indicator */}
              <div className="text-[11px] font-mono text-[#8e95a5] flex items-center gap-2 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 hover:text-[#00ff9d] transition-colors"
                >
                  <ArrowDown className="w-3 h-3 text-[#00ff9d] animate-bounce" />
                  <span>&gt; SCROLL_TO_EXPLORE ↓</span>
                </a>
              </div>

            </div>

            {/* ====================================================== */}
            {/* COLUMN 2: CENTER SEAMLESS PORTRAIT (~30% WIDTH, 3.5 COLS)*/}
            {/* ====================================================== */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/10 relative bg-[#090b0f]/50 flex items-end justify-center min-h-[380px] lg:min-h-0">
              <PortraitFrame priority={true} />
            </div>

            {/* ====================================================== */}
            {/* COLUMN 3: RIGHT TECHNICAL DOSSIER (~20% WIDTH, 2.5 COLS)*/}
            {/* ====================================================== */}
            <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-center space-y-6 text-xs font-mono bg-[#0c0e14] z-10">
              
              {/* Micro-Field 1: Who Am I */}
              <div className="space-y-1">
                <div className="text-[10px] text-[#8e95a5] uppercase tracking-wider">&gt; WHO_AM_I</div>
                <div className="text-[#f4f2eb] font-semibold text-sm tracking-wide">
                  {t(PERSONAL_INFO.name)}
                </div>
              </div>

              {/* Micro-Field 2: Role */}
              <div className="space-y-1">
                <div className="text-[10px] text-[#8e95a5] uppercase tracking-wider">&gt; ROLE</div>
                <div className="text-[#f4f2eb] text-xs">
                  Software Developer
                </div>
                <div className="text-[#8e95a5] text-[10px]">
                  CS Student &amp; EdTech Creator
                </div>
              </div>

              {/* Micro-Field 3: Location */}
              <div className="space-y-1">
                <div className="text-[10px] text-[#8e95a5] uppercase tracking-wider">&gt; LOCATION</div>
                <div className="text-[#f4f2eb] text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d]" />
                  <span>Cairo, Egypt</span>
                </div>
              </div>

              {/* Micro-Field 4: Experience */}
              <div className="space-y-1">
                <div className="text-[10px] text-[#8e95a5] uppercase tracking-wider">&gt; EXPERIENCE</div>
                <div className="text-[#f4f2eb] text-xs">
                  2+ Years Foundations &amp; Web
                </div>
              </div>

              {/* Micro-Field 5: Availability */}
              <div className="space-y-1 pt-2 border-t border-white/5">
                <div className="text-[10px] text-[#8e95a5] uppercase tracking-wider">&gt; AVAILABILITY</div>
                <div className="text-[#00ff9d] text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
                  <span>Open for new projects</span>
                </div>
              </div>

              {/* Micro Feature Tag */}
              <div className="pt-2 text-[10px] text-[#8e95a5] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#00ff9d]" />
                <span>NATIVE SQLITE &bull; APP ROUTER</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
