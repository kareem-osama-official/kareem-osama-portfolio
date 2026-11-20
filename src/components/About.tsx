'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PHILOSOPHY_PRINCIPLES } from '../data/portfolioData';
import { Terminal, Quote } from 'lucide-react';

export function About() {
  const { language, t } = useLanguage();

  return (
    <section
      id="about"
      className="py-16 sm:py-20 border-t border-white/10 relative overflow-hidden bg-[#07080a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Marker */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-[#00ff9d] font-semibold tracking-widest uppercase">
            01 //
          </span>
          <h2 className="font-mono text-xs text-[#8e95a5] uppercase tracking-widest">
            {language === 'ar' ? 'الرؤية والأسس البرمجية' : 'PHILOSOPHY & MINDSET'}
          </h2>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        {/* Editorial Pull-Quote */}
        <div className="mb-16 max-w-4xl">
          <p className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#f4f2eb] leading-tight mb-6">
            {language === 'ar' ? (
              <>
                البرمجيات <span className="text-[#00ff9d] font-normal">حرفة معمارية</span>. أؤمن بأن التحكم الحقيقي في المنتج الرقمي يبدأ من إتقان ما تحت الغطاء: الخوارزميات، والذاكرة، والبنية الهيكلية.
              </>
            ) : (
              <>
                Software is an <span className="text-[#00ff9d] font-normal">architectural craft</span>. I believe true engineering authority starts under the hood: memory discipline, algorithms, and modular structure.
              </>
            )}
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8e95a5]">
            <Quote className="w-3.5 h-3.5 text-[#00ff9d]" />
            <span>KAREEM OSAMA // ENGINEERING DISCIPLINE</span>
          </div>
        </div>

        {/* Two-Column Story Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          <div className="lg:col-span-5 space-y-6 text-sm sm:text-base text-[#8e95a5] leading-relaxed">
            <h3 className="text-xl font-bold font-mono text-[#f4f2eb] uppercase tracking-wide">
              {language === 'ar' ? 'البناء على أسس صلبة' : 'Constructing From First Principles'}
            </h3>
            <p>
              {language === 'ar'
                ? 'كطالب علوم حاسب، بدأت رحلتي بالتعمق في لغات البرمجة منخفضة المستوى مثل C++، ودراسة الخوارزميات وهياكل البيانات وحل المشكلات بعناية. هذا التأسيس لم يكن مجرد تمارين أكاديمية، بل صقل تفكيري لأرى ما وراء الواجهات السطحية.'
                : 'As a Computer Science student, my journey began deeply embedded in foundational systems programming with C++, data structures, and rigorous algorithmic problem solving. This grounding was never just academic; it shaped how I view digital architecture at every tier.'}
            </p>
            <p>
              {language === 'ar'
                ? 'عندما انتقلت لبناء تطبيقات الويب الحديثة باستخدام TypeScript وReact وNext.js، حملت معي هذا الانضباط: كود نظيف، وهيكلية معمارية قابلة للتوسع، وتفادي الاعتماد العشوائي على الحزم الخارجية دون فهم حقيقي لكيفية عملها.'
                : 'When transitioning into modern web engineering with TypeScript, React, and Next.js, that discipline translated directly: clean state boundaries, predictable data flows, modular component systems, and zero reliance on superficial hacks.'}
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#101217] border border-white/10 p-6 sm:p-8 rounded-sm">
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6 text-xs font-mono text-[#8e95a5]">
              <span className="flex items-center gap-2 text-[#f4f2eb]">
                <Terminal className="w-4 h-4 text-[#00ff9d]" />
                {language === 'ar' ? 'سجل الاهتمامات الهندسية' : 'ENGINEERING DOSSIER'}
              </span>
              <span>VERIFIED // 2026</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
              <div className="p-4 bg-[#151820] border border-white/5 rounded-sm">
                <div className="text-[#00ff9d] font-bold mb-1">01 / SYSTEMS & CS</div>
                <p className="text-[#8e95a5] leading-relaxed">
                  {language === 'ar'
                    ? 'الخوارزميات، هياكل البيانات، البرمجة كائنية التوجه، وإدارة الذاكرة في C++.'
                    : 'Algorithms, data structures, object-oriented design, and deterministic memory logic in C++.'}
                </p>
              </div>

              <div className="p-4 bg-[#151820] border border-white/5 rounded-sm">
                <div className="text-[#00ff9d] font-bold mb-1">02 / WEB ARCHITECTURE</div>
                <p className="text-[#8e95a5] leading-relaxed">
                  {language === 'ar'
                    ? 'بناء واجهات متجاوبة، أنظمة تصميم مخصصة، وإدارة حالة نظيفة في Next.js.'
                    : 'Composing responsive interfaces, bespoke design tokens, and modular state in Next.js.'}
                </p>
              </div>

              <div className="p-4 bg-[#151820] border border-white/5 rounded-sm">
                <div className="text-[#00ff9d] font-bold mb-1">03 / EDTECH PASSION</div>
                <p className="text-[#8e95a5] leading-relaxed">
                  {language === 'ar'
                    ? 'تطوير منصة نيكسورا لتقديم تجارب تعليمية تفاعلية تعتمد على الممارسة المباشرة.'
                    : 'Architecting Nexora to transform passive video learning into active, code-first comprehension.'}
                </p>
              </div>

              <div className="p-4 bg-[#151820] border border-white/5 rounded-sm">
                <div className="text-[#00ff9d] font-bold mb-1">04 / PROBLEM SOLVING</div>
                <p className="text-[#8e95a5] leading-relaxed">
                  {language === 'ar'
                    ? 'تحليل التعقيد الحسابي والتفكير المنهجي المستمر عبر منصات التحديات البرمجية.'
                    : 'Systematic complexity decomposition and continuous algorithmic challenges.'}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Core Principles */}
        <div className="pt-8 border-t border-white/5">
          <div className="text-xs font-mono text-[#8e95a5] uppercase tracking-widest mb-8">
            {language === 'ar' ? 'المبادئ البرمجية الأساسية' : 'CORE ATELIER PRINCIPLES'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PHILOSOPHY_PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="relative bg-[#101217] border border-white/10 hover:border-[#00ff9d]/50 p-6 sm:p-8 rounded-sm transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl font-bold text-[#00ff9d]">
                      {principle.number}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#00ff9d] transition-colors" />
                  </div>

                  <h4 className="text-lg font-bold font-mono text-[#f4f2eb] mb-3 group-hover:text-[#00ff9d] transition-colors">
                    {t(principle.title)}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#8e95a5] leading-relaxed mb-6">
                    {t(principle.description)}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-[#f4f2eb]/80 italic">
                  &ldquo;{t(principle.quote)}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
