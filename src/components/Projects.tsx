'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PROJECTS } from '../data/portfolioData';
import { NexoraCaseStudyModal } from './NexoraCaseStudyModal';
import { ProjectItem } from '../types/portfolio';
import {
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Activity,
  Cpu,
  Layers,
  Sparkles,
  TrendingUp,
  FileCode,
} from 'lucide-react';

export function Projects() {
  const { language, t, isRtl } = useLanguage();
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);

  return (
    <section
      id="projects"
      className="py-20 sm:py-24 border-t border-white/10 relative overflow-hidden bg-[#07080a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* ======================================================== */}
        {/* SUBSECTION 1: SELECTED PROJECTS (3-COLUMN TECHNICAL GRID)*/}
        {/* ======================================================== */}
        <div>
          {/* Section Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-8 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#00ff9d] font-bold">
              <span>// SELECTED PROJECTS</span>
            </div>
            <div className="text-[11px] text-[#8e95a5] flex items-center gap-1.5 hover:text-[#00ff9d] transition-colors cursor-pointer">
              <span>VIEW_ALL_PROJECTS</span>
              <span className="text-white/40">[ ]</span>
            </div>
          </div>

          {/* 3-Column Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* ---------------- CARD 01: NEXORA (EDTECH PLATFORM) ---------------- */}
            <div className="bg-[#0c0e14] border border-white/10 hover:border-[#00ff9d]/50 rounded-md p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group shadow-xl">
              <div>
                {/* Card Top Strip */}
                <div className="flex items-center justify-between pb-2.5 text-xs font-mono text-[#8e95a5] border-b border-white/5 mb-3">
                  <span className="text-[#00ff9d] font-bold">01</span>
                  <span className="text-white/30 text-sm font-light select-none">+</span>
                </div>

                <div className="text-[10px] font-mono text-[#00ff9d] uppercase tracking-wider mb-1">
                  // EDTECH PLATFORM
                </div>

                <h3 className="text-xl font-bold font-mono text-[#f4f2eb] group-hover:text-[#00ff9d] transition-colors mb-2">
                  Nexora
                </h3>

                <p className="text-xs text-[#8e95a5] leading-relaxed mb-4">
                  {language === 'ar'
                    ? 'منصة تعليمية تفاعلية لعلوم الحاسب وبرمجة C++ مع بيئة تنفيذ واختبار أمان الذاكرة.'
                    : 'Personalized computer science learning platform with interactive C++ code execution and progress tracking.'}
                </p>

                {/* VISUAL PROJECT PREVIEW (Realistic Dark UI Mockup) */}
                <div className="w-full aspect-[16/10] bg-[#07080a] border border-white/10 rounded-sm p-3 mb-5 overflow-hidden flex flex-col justify-between relative group-hover:border-[#00ff9d]/30 transition-colors">
                  {/* Mockup Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[9px] font-mono text-[#8e95a5]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/80" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                      <span className="w-2 h-2 rounded-full bg-green-500/80" />
                      <span className="ml-2 text-[#f4f2eb] font-semibold">nexora.app // workspace</span>
                    </div>
                    <span className="text-[#00ff9d]">ONLINE</span>
                  </div>

                  {/* Mockup Body: Code + Output */}
                  <div className="grid grid-cols-12 gap-2 my-auto text-[9px] font-mono">
                    <div className="col-span-8 bg-[#0c0e14] p-2 rounded border border-white/5 space-y-1 text-[#8e95a5]">
                      <div className="text-[#00ff9d] font-bold">#include &lt;memory&gt;</div>
                      <div>auto ptr = std::make_unique&lt;Node&gt;();</div>
                      <div className="text-white/40">// Memory guaranteed safe</div>
                      <div className="text-[#33ffb0]">verifyAllocation(ptr);</div>
                    </div>
                    <div className="col-span-4 bg-[#0e121a] p-2 rounded border border-white/5 flex flex-col justify-between">
                      <div className="text-[8px] text-[#8e95a5]">EXEC STATUS</div>
                      <div className="text-[#00ff9d] font-bold text-[10px]">0.04 ms</div>
                      <div className="w-full h-1 bg-white/10 rounded overflow-hidden">
                        <div className="w-full h-full bg-[#00ff9d]" />
                      </div>
                    </div>
                  </div>

                  {/* Mockup Footer */}
                  <div className="flex items-center justify-between text-[8px] font-mono text-[#8e95a5] pt-1 border-t border-white/5">
                    <span>C++17 / STRICT MEMORY</span>
                    <span className="text-[#00ff9d]">TESTS PASSED &bull; 100%</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Tech tags + Link */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] rounded">Next.js</span>
                  <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] rounded">TypeScript</span>
                  <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] rounded">C++</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(PROJECTS[0])}
                  className="p-1.5 text-[#00ff9d] hover:text-[#33ffb0] transition-colors cursor-pointer group-hover:translate-x-0.5"
                  title="View Nexora Details"
                >
                  <ArrowUpRight className={`w-4 h-4 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                </button>
              </div>
            </div>

            {/* ---------------- CARD 02: ALGOMIND (C++ ALGORITHMS) ---------------- */}
            <div className="bg-[#0c0e14] border border-white/10 hover:border-[#00ff9d]/50 rounded-md p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group shadow-xl">
              <div>
                {/* Card Top Strip */}
                <div className="flex items-center justify-between pb-2.5 text-xs font-mono text-[#8e95a5] border-b border-white/5 mb-3">
                  <span className="text-[#00ff9d] font-bold">02</span>
                  <span className="text-white/30 text-sm font-light select-none">+</span>
                </div>

                <div className="text-[10px] font-mono text-[#00ff9d] uppercase tracking-wider mb-1">
                  // ALGORITHM SUITE
                </div>

                <h3 className="text-xl font-bold font-mono text-[#f4f2eb] group-hover:text-[#00ff9d] transition-colors mb-2">
                  AlgoMind
                </h3>

                <p className="text-xs text-[#8e95a5] leading-relaxed mb-4">
                  {language === 'ar'
                    ? 'منظومة تفاعلية لتصور هياكل البيانات والخوارزميات وتحليل التعقيد الحسابي Asymptotic Complexity.'
                    : 'Interactive algorithm visualizer and complexity analysis engine profiling BST trees and logarithmic searches.'}
                </p>

                {/* VISUAL PROJECT PREVIEW (Node Graph & Asymptotic Profiler) */}
                <div className="w-full aspect-[16/10] bg-[#07080a] border border-white/10 rounded-sm p-3 mb-5 overflow-hidden flex flex-col justify-between relative group-hover:border-[#00ff9d]/30 transition-colors">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[9px] font-mono text-[#8e95a5]">
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-[#00ff9d]" />
                      <span className="text-[#f4f2eb]">algomind.engine // BST_Tree</span>
                    </div>
                    <span className="text-[#00ff9d]">O(log n)</span>
                  </div>

                  {/* Graphical Tree Visualizer Representation */}
                  <div className="relative h-20 my-auto flex items-center justify-center">
                    {/* SVG Tree Nodes */}
                    <svg className="w-full h-full stroke-[#00ff9d]/40 stroke-1" viewBox="0 0 200 80">
                      <line x1="100" y1="20" x2="60" y2="50" />
                      <line x1="100" y1="20" x2="140" y2="50" />
                      <line x1="60" y1="50" x2="40" y2="70" />
                      <line x1="60" y1="50" x2="80" y2="70" />
                      <line x1="140" y1="50" x2="120" y2="70" />
                      <line x1="140" y1="50" x2="160" y2="70" />
                      
                      {/* Nodes */}
                      <circle cx="100" cy="20" r="8" fill="#00ff9d" />
                      <circle cx="60" cy="50" r="7" fill="#0c0e14" stroke="#00ff9d" strokeWidth="2" />
                      <circle cx="140" cy="50" r="7" fill="#0c0e14" stroke="#00ff9d" strokeWidth="2" />
                      <circle cx="40" cy="70" r="5" fill="#12151c" stroke="#8e95a5" />
                      <circle cx="80" cy="70" r="5" fill="#12151c" stroke="#8e95a5" />
                      <circle cx="120" cy="70" r="5" fill="#12151c" stroke="#8e95a5" />
                      <circle cx="160" cy="70" r="5" fill="#12151c" stroke="#8e95a5" />
                    </svg>
                    <span className="absolute top-1 text-[8px] font-mono font-bold text-[#07080a]">ROOT</span>
                  </div>

                  <div className="flex items-center justify-between text-[8px] font-mono text-[#8e95a5] pt-1 border-t border-white/5">
                    <span>BINARY SEARCH TRAVERSAL</span>
                    <span className="text-[#00ff9d]">SORTED ORDER GUARANTEED</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Tech tags + Link */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] rounded">C++</span>
                  <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] rounded">Data Structures</span>
                  <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] rounded">Algorithms</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(PROJECTS[1] || PROJECTS[0])}
                  className="p-1.5 text-[#00ff9d] hover:text-[#33ffb0] transition-colors cursor-pointer group-hover:translate-x-0.5"
                  title="View AlgoMind Details"
                >
                  <ArrowUpRight className={`w-4 h-4 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                </button>
              </div>
            </div>

            {/* ---------------- CARD 03: THE DIGITAL ATELIER (CMS & OS) ---------------- */}
            <div className="bg-[#0c0e14] border border-white/10 hover:border-[#00ff9d]/50 rounded-md p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group shadow-xl">
              <div>
                {/* Card Top Strip */}
                <div className="flex items-center justify-between pb-2.5 text-xs font-mono text-[#8e95a5] border-b border-white/5 mb-3">
                  <span className="text-[#00ff9d] font-bold">03</span>
                  <span className="text-white/30 text-sm font-light select-none">+</span>
                </div>

                <div className="text-[10px] font-mono text-[#00ff9d] uppercase tracking-wider mb-1">
                  // CMS &amp; SYSTEMS OS
                </div>

                <h3 className="text-xl font-bold font-mono text-[#f4f2eb] group-hover:text-[#00ff9d] transition-colors mb-2">
                  The Digital Atelier
                </h3>

                <p className="text-xs text-[#8e95a5] leading-relaxed mb-4">
                  {language === 'ar'
                    ? 'الهوية البرمجية الرقمية ونظام إدارة المحتوى الإداري المدمج بقاعدة بيانات SQLite محلية مشفرة.'
                    : 'Personal developer signature system & administrative OS backed by zero-dependency native SQLite WAL.'}
                </p>

                {/* VISUAL PROJECT PREVIEW (Admin Dashboard Telemetry Preview) */}
                <div className="w-full aspect-[16/10] bg-[#07080a] border border-white/10 rounded-sm p-3 mb-5 overflow-hidden flex flex-col justify-between relative group-hover:border-[#00ff9d]/30 transition-colors">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[9px] font-mono text-[#8e95a5]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-sm bg-[#00ff9d]" />
                      <span className="text-[#f4f2eb] font-semibold">atelier.os // admin_telemetry</span>
                    </div>
                    <span className="text-[#00ff9d] font-bold">LIVE SQLITE</span>
                  </div>

                  {/* Mockup Dashboard Tiles */}
                  <div className="grid grid-cols-3 gap-2 my-auto font-mono">
                    <div className="bg-[#0c0e14] p-2 rounded border border-white/5 text-center">
                      <div className="text-[8px] text-[#8e95a5]">PROJECTS</div>
                      <div className="text-xs font-bold text-[#f4f2eb]">03</div>
                      <div className="text-[7px] text-[#00ff9d]">PUBLISHED</div>
                    </div>
                    <div className="bg-[#0c0e14] p-2 rounded border border-white/5 text-center">
                      <div className="text-[8px] text-[#8e95a5]">SKILLS</div>
                      <div className="text-xs font-bold text-[#f4f2eb]">11</div>
                      <div className="text-[7px] text-[#00ff9d]">VERIFIED</div>
                    </div>
                    <div className="bg-[#0c0e14] p-2 rounded border border-white/5 text-center">
                      <div className="text-[8px] text-[#8e95a5]">INTEGRITY</div>
                      <div className="text-xs font-bold text-[#00ff9d]">100%</div>
                      <div className="text-[7px] text-[#8e95a5]">SECURE</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[8px] font-mono text-[#8e95a5] pt-1 border-t border-white/5">
                    <span>HMAC-SHA256 &bull; PBKDF2</span>
                    <span className="text-[#00ff9d]">SUB-MS RESPONSE</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Tech tags + Link */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] rounded">Next.js 16</span>
                  <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] rounded">React 19</span>
                  <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] rounded">SQLite</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(PROJECTS[2] || PROJECTS[0])}
                  className="p-1.5 text-[#00ff9d] hover:text-[#33ffb0] transition-colors cursor-pointer group-hover:translate-x-0.5"
                  title="View Atelier Details"
                >
                  <ArrowUpRight className={`w-4 h-4 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* SUBSECTION 2: CASE STUDIES (STACKED HORIZONTAL ROWS)     */}
        {/* ======================================================== */}
        <div>
          {/* Section Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-8 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#00ff9d] font-bold">
              <span>// CASE STUDIES</span>
            </div>
            <div className="text-[11px] text-[#8e95a5] flex items-center gap-1.5 hover:text-[#00ff9d] transition-colors cursor-pointer">
              <span>VIEW_ALL_CASE_STUDIES</span>
              <span className="text-white/40">[ ]</span>
            </div>
          </div>

          {/* Stacked Rows (Exact Match to IMAGE 1 Right Screen) */}
          <div className="space-y-4">
            
            {/* ROW 1: NEXORA */}
            <div className="bg-[#0c0e14] border border-white/10 hover:border-[#00ff9d]/40 rounded-md p-5 sm:p-6 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <span className="font-mono text-xs font-bold text-[#00ff9d] shrink-0">
                  01
                </span>

                {/* Left Visual Preview Thumbnail */}
                <div className="w-36 h-22 bg-[#07080a] border border-white/10 rounded-sm p-2 shrink-0 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/70" />
                    <span className="text-[7px] font-mono text-[#8e95a5] ml-1">nexora_run.cpp</span>
                  </div>
                  <div className="space-y-0.5 text-[7px] font-mono text-[#00ff9d]">
                    <div>make_unique&lt;Lesson&gt;()</div>
                    <div className="text-[#8e95a5]">verify(memory);</div>
                  </div>
                  <div className="text-[7px] font-mono text-[#33ffb0]">STATUS: VERIFIED</div>
                </div>

                {/* Center Content */}
                <div className="space-y-1.5 max-w-xl">
                  <h4 className="font-mono text-base sm:text-lg font-bold text-[#f4f2eb] group-hover:text-[#00ff9d] transition-colors">
                    Nexora — Interactive C++ Learning Platform
                  </h4>
                  <p className="text-xs text-[#8e95a5] leading-relaxed">
                    End-to-end development of an architectural learning platform with real-time memory leak prevention, C++ syllabus progression, and local progress telemetry.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] font-mono rounded">Next.js</span>
                    <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] font-mono rounded">TypeScript</span>
                    <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] font-mono rounded">C++</span>
                  </div>
                </div>
              </div>

              {/* Right: Results + Action (Exact Reference Right Column) */}
              <div className="flex items-center justify-between lg:justify-end gap-8 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/5 shrink-0 font-mono">
                <div className="text-left lg:text-right">
                  <div className="text-[9px] text-[#8e95a5] uppercase tracking-wider mb-0.5">RESULTS</div>
                  <div className="text-sm font-bold text-[#00ff9d] flex items-center lg:justify-end gap-1">
                    <span>0.04ms</span>
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[10px] text-[#8e95a5]">Deterministic Allocation</div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(PROJECTS[0])}
                  className="p-2.5 bg-[#12151c] hover:bg-[#00ff9d] text-[#00ff9d] hover:text-[#07080a] border border-white/10 hover:border-[#00ff9d] rounded-sm transition-all cursor-pointer"
                  title="Inspect Case Study"
                >
                  <ArrowUpRight className={`w-4 h-4 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                </button>
              </div>
            </div>

            {/* ROW 2: ALGOMIND */}
            <div className="bg-[#0c0e14] border border-white/10 hover:border-[#00ff9d]/40 rounded-md p-5 sm:p-6 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <span className="font-mono text-xs font-bold text-[#00ff9d] shrink-0">
                  02
                </span>

                {/* Left Visual Preview Thumbnail */}
                <div className="w-36 h-22 bg-[#07080a] border border-white/10 rounded-sm p-2 shrink-0 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center gap-1">
                    <Activity className="w-2.5 h-2.5 text-[#00ff9d]" />
                    <span className="text-[7px] font-mono text-[#8e95a5]">algomind_tree</span>
                  </div>
                  <div className="flex justify-center items-center py-1">
                    <div className="w-4 h-4 rounded-full bg-[#00ff9d] flex items-center justify-center text-[7px] text-[#07080a] font-bold">100</div>
                  </div>
                  <div className="text-[7px] font-mono text-[#00ff9d] text-center">COMPLEXITY: O(log n)</div>
                </div>

                {/* Center Content */}
                <div className="space-y-1.5 max-w-xl">
                  <h4 className="font-mono text-base sm:text-lg font-bold text-[#f4f2eb] group-hover:text-[#00ff9d] transition-colors">
                    AlgoMind — Algorithm Profiling &amp; Problem Solving Suite
                  </h4>
                  <p className="text-xs text-[#8e95a5] leading-relaxed">
                    Designed an algorithmic profiling suite allowing deep visualization of binary search trees, asymptotic complexity proofs, and recursion trees.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] font-mono rounded">C++</span>
                    <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] font-mono rounded">Data Structures</span>
                    <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] font-mono rounded">Complexity Profiler</span>
                  </div>
                </div>
              </div>

              {/* Right: Results + Action */}
              <div className="flex items-center justify-between lg:justify-end gap-8 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/5 shrink-0 font-mono">
                <div className="text-left lg:text-right">
                  <div className="text-[9px] text-[#8e95a5] uppercase tracking-wider mb-0.5">RESULTS</div>
                  <div className="text-sm font-bold text-[#00ff9d] flex items-center lg:justify-end gap-1">
                    <span>O(log n)</span>
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[10px] text-[#8e95a5]">Logarithmic Traversal</div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(PROJECTS[1] || PROJECTS[0])}
                  className="p-2.5 bg-[#12151c] hover:bg-[#00ff9d] text-[#00ff9d] hover:text-[#07080a] border border-white/10 hover:border-[#00ff9d] rounded-sm transition-all cursor-pointer"
                  title="Inspect Case Study"
                >
                  <ArrowUpRight className={`w-4 h-4 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                </button>
              </div>
            </div>

            {/* ROW 3: THE DIGITAL ATELIER */}
            <div className="bg-[#0c0e14] border border-white/10 hover:border-[#00ff9d]/40 rounded-md p-5 sm:p-6 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <span className="font-mono text-xs font-bold text-[#00ff9d] shrink-0">
                  03
                </span>

                {/* Left Visual Preview Thumbnail */}
                <div className="w-36 h-22 bg-[#07080a] border border-white/10 rounded-sm p-2 shrink-0 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between text-[7px] font-mono text-[#8e95a5]">
                    <span className="text-[#00ff9d]">ATELIER_OS</span>
                    <span>WAL MODE</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[7px] font-mono">
                    <div className="bg-[#12151c] p-1 rounded text-center text-[#f4f2eb]">3 PROJS</div>
                    <div className="bg-[#12151c] p-1 rounded text-center text-[#00ff9d]">11 SKILLS</div>
                  </div>
                  <div className="text-[7px] font-mono text-[#8e95a5]">HMAC SECURITY ACTIVE</div>
                </div>

                {/* Center Content */}
                <div className="space-y-1.5 max-w-xl">
                  <h4 className="font-mono text-base sm:text-lg font-bold text-[#f4f2eb] group-hover:text-[#00ff9d] transition-colors">
                    The Digital Atelier — Portfolio Engine &amp; Administrative OS
                  </h4>
                  <p className="text-xs text-[#8e95a5] leading-relaxed">
                    Engineered a bespoke personal digital identity and high-security administrative operating system powered by zero-dependency synchronous SQLite.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] font-mono rounded">Next.js 16</span>
                    <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] font-mono rounded">React 19</span>
                    <span className="px-1.5 py-0.5 bg-[#12151c] text-[#8e95a5] text-[10px] font-mono rounded">node:sqlite</span>
                  </div>
                </div>
              </div>

              {/* Right: Results + Action */}
              <div className="flex items-center justify-between lg:justify-end gap-8 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/5 shrink-0 font-mono">
                <div className="text-left lg:text-right">
                  <div className="text-[9px] text-[#8e95a5] uppercase tracking-wider mb-0.5">RESULTS</div>
                  <div className="text-sm font-bold text-[#00ff9d] flex items-center lg:justify-end gap-1">
                    <span>100%</span>
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[10px] text-[#8e95a5]">Zero Cloud Dependency</div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(PROJECTS[2] || PROJECTS[0])}
                  className="p-2.5 bg-[#12151c] hover:bg-[#00ff9d] text-[#00ff9d] hover:text-[#07080a] border border-white/10 hover:border-[#00ff9d] rounded-sm transition-all cursor-pointer"
                  title="Inspect Case Study"
                >
                  <ArrowUpRight className={`w-4 h-4 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <NexoraCaseStudyModal
          project={selectedCaseStudy}
          isOpen={true}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}
    </section>
  );
}
