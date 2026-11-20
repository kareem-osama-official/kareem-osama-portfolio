'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Code, Layers, CheckCircle2, ArrowUpRight } from 'lucide-react';

export function Skills() {
  const { language } = useLanguage();

  const technicalSkills = [
    { name: 'Systems & C++ Programming', pct: 95 },
    { name: 'Frontend Architecture (Next.js/React)', pct: 92 },
    { name: 'Backend & Node.js Runtimes', pct: 90 },
    { name: 'Database Design & SQLite WAL', pct: 88 },
    { name: 'Algorithmic Problem Solving', pct: 90 },
    { name: 'Strict TypeScript & Type Systems', pct: 92 },
  ];

  const servicesCapabilities = [
    { title: 'Web Application Architecture', desc: 'Server components, clean state management, and responsive tokens.' },
    { title: 'C++ Systems & Memory Safety', desc: 'Deterministic allocation, pointer discipline, and cache-friendly data structures.' },
    { title: 'Educational Platform Engineering', desc: 'Hands-on code execution environments, syllabus trees, and interactive learning.' },
    { title: 'Database & Local Persistence', desc: 'Zero cloud lock-in, transactional integrity with native SQLite.' },
    { title: 'Bilingual System Engineering', desc: 'Seamless LTR and RTL Arabic layout support with native typography.' },
  ];

  const toolsList = [
    'VS Code',
    'Git & GitHub',
    'Next.js 16',
    'React 19',
    'node:sqlite',
    'Tailwind CSS v4',
    'Visual Studio C++',
    'PowerShell & POSIX CLI',
  ];

  return (
    <section
      id="skills"
      className="py-20 sm:py-24 border-t border-white/10 relative overflow-hidden bg-[#07080a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* EXACT 3-COLUMN UNIFIED CAPABILITIES CONTAINER (IMAGE 1)  */}
        {/* ======================================================== */}
        <div className="bg-[#0c0e14] border border-white/10 rounded-md overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            
            {/* ---------------- COLUMN 1: TECHNICAL SKILLS (4 COLS) ---------------- */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 pb-4 border-b border-white/5 mb-6 text-xs font-mono text-[#00ff9d] font-bold">
                  <Code className="w-4 h-4" />
                  <span>&lt;/&gt; TECHNICAL SKILLS</span>
                </div>

                <div className="space-y-5 font-mono">
                  {technicalSkills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#f4f2eb]">{skill.name}</span>
                        <span className="text-[11px] text-[#00ff9d]">{skill.pct}%</span>
                      </div>
                      {/* Thin Progress Line (Matching IMAGE 1) */}
                      <div className="w-full h-[3px] bg-[#12151c] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00ff9d] rounded-full transition-all duration-500"
                          style={{ width: `${skill.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-[#8e95a5] flex items-center justify-between">
                <span>FOUNDATIONAL VERIFICATION</span>
                <span className="text-[#00ff9d]">ACCREDITED</span>
              </div>
            </div>

            {/* ---------------- COLUMN 2: CAPABILITIES & SERVICES (4 COLS) ---------------- */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#0a0c10]/40">
              <div>
                <div className="flex items-center gap-2 pb-4 border-b border-white/5 mb-6 text-xs font-mono text-[#00ff9d] font-bold">
                  <Layers className="w-4 h-4" />
                  <span>⬡ CAPABILITIES &amp; FOCUS</span>
                </div>

                <div className="space-y-3 font-mono">
                  {servicesCapabilities.map((service) => (
                    <div
                      key={service.title}
                      className="p-3 bg-[#0c0e14] border border-white/5 hover:border-[#00ff9d]/30 rounded-sm transition-all group cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-xs text-[#f4f2eb] group-hover:text-[#00ff9d] transition-colors mb-1 font-bold">
                        <span>{service.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#8e95a5] group-hover:text-[#00ff9d] transition-transform group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-[11px] text-[#8e95a5] leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-[#8e95a5] flex items-center justify-between">
                <span>SYSTEM ARCHITECTURE</span>
                <span className="text-[#00ff9d]">DISCIPLINED</span>
              </div>
            </div>

            {/* ---------------- COLUMN 3: TOOLS I USE (4 COLS) ---------------- */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 pb-4 border-b border-white/5 mb-6 text-xs font-mono text-[#00ff9d] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>✓ TOOLS I USE</span>
                </div>

                <div className="space-y-2.5 font-mono">
                  {toolsList.map((tool) => (
                    <div
                      key={tool}
                      className="flex items-center justify-between py-1.5 px-3 bg-[#0c0e14] border border-white/5 hover:border-white/10 rounded-sm text-xs text-[#f4f2eb] transition-colors"
                    >
                      <span>{tool}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] shadow-sm shadow-[#00ff9d]/50" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-[#8e95a5] flex items-center justify-between">
                <span>DEVELOPMENT ENVIRONMENT</span>
                <span className="text-[#00ff9d]">OPERATIONAL</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
