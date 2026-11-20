'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { JOURNEY_MILESTONES } from '../data/portfolioData';
export function Journey() {
  const { language, t } = useLanguage();

  return (
    <section
      id="journey"
      className="py-16 sm:py-20 border-t border-white/10 relative overflow-hidden bg-[#07080a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Marker */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-[#00ff9d] font-semibold tracking-widest uppercase">
            04 //
          </span>
          <h2 className="font-mono text-xs text-[#8e95a5] uppercase tracking-widest">
            {language === 'ar' ? 'المسار التعليمي والتأسيسي' : 'ACADEMIC & LEARNING TRAJECTORY'}
          </h2>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        {/* Section Intro */}
        <div className="mb-16 max-w-3xl">
          <h3 className="text-3xl sm:text-5xl font-extrabold font-mono text-[#f4f2eb] tracking-tight mb-4 uppercase">
            {language === 'ar' ? 'محطات التأسيس والنمو' : 'FOUNDATIONAL MILESTONES'}
          </h3>
          <p className="text-sm sm:text-base text-[#8e95a5] leading-relaxed">
            {language === 'ar'
              ? 'سجل موثق للمحطات التعليمية الحقيقية؛ من التأسيس الأكاديمي في علوم الحاسب إلى شهادات الخوارزميات المعتمدة ومشاريع الويب المتكاملة.'
              : 'A transparent record of authentic educational milestones — from university computer science theory to verified algorithmic credentials and project architecture.'}
          </p>
        </div>

        {/* Editorial Timeline */}
        <div className="relative border-l border-white/10 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12">
          {JOURNEY_MILESTONES.map((milestone, idx) => (
            <div key={idx} className="relative group">
              
              {/* Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#101217] border-2 border-[#00ff9d] group-hover:bg-[#00ff9d] transition-colors" />

              {/* Content Box */}
              <div className="bg-[#101217] border border-white/10 hover:border-[#00ff9d]/40 rounded-sm p-6 sm:p-8 transition-all duration-300 shadow-xl">
                
                {/* Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#00ff9d]">
                      {milestone.period}
                    </span>
                    <span className="text-[#8e95a5] text-xs font-mono">•</span>
                    <span className="font-mono text-xs text-[#8e95a5]">
                      {t(milestone.institution)}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 bg-[#151820] text-[#f4f2eb] border border-white/10 rounded-sm font-mono text-[10px] uppercase">
                    {t(milestone.badge)}
                  </span>
                </div>

                {/* Milestone Title */}
                <h4 className="text-lg sm:text-xl font-bold font-mono text-[#f4f2eb] mb-3 group-hover:text-[#00ff9d] transition-colors">
                  {t(milestone.title)}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#8e95a5] leading-relaxed mb-6">
                  {t(milestone.description)}
                </p>

                {/* Skills Applied Tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono text-[#8e95a5] mr-2">
                    {language === 'ar' ? 'المهارات المكتسبة:' : 'APPLIED:'}
                  </span>
                  {milestone.skillsApplied.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-[#090a0d] border border-white/5 text-[10px] font-mono text-[#f4f2eb] rounded-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
