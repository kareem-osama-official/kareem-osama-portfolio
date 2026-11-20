'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ProjectItem } from '../types/portfolio';
import { X, CheckCircle2, Clock, Calendar, ShieldCheck } from 'lucide-react';

interface NexoraCaseStudyModalProps {
  project: ProjectItem;
  isOpen: boolean;
  onClose: () => void;
}

export function NexoraCaseStudyModal({ project, isOpen, onClose }: NexoraCaseStudyModalProps) {
  const { language, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nexora-case-study-title"
    >
      <div className="relative w-full max-w-4xl bg-[#101217] border border-white/15 rounded-sm shadow-2xl p-6 sm:p-10 my-8">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#8e95a5] hover:text-[#00ff9d] bg-[#151820] border border-white/10 rounded-sm cursor-pointer transition-colors"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#151820] border border-white/10 rounded-sm text-[10px] font-mono text-[#00ff9d] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d]" />
            <span>CASE STUDY // DEEP DIVE DOSSIER</span>
          </div>

          <h2 id="nexora-case-study-title" className="text-2xl sm:text-4xl font-extrabold font-mono text-[#f4f2eb] mb-2">
            {t(project.title)}
          </h2>
          <p className="text-sm font-mono text-[#8e95a5]">
            {t(project.tagline)}
          </p>
        </div>

        {/* Status Transparency Banner */}
        <div className="p-4 bg-[#151820] border-l-2 border-[#00ff9d] rounded-sm mb-8">
          <div className="flex items-center justify-between text-xs font-mono text-[#00ff9d] font-semibold mb-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              {t(project.status.badge)}
            </span>
            <span className="text-[#8e95a5]">{project.year}</span>
          </div>
          <p className="text-xs text-[#8e95a5] leading-relaxed">
            {t(project.status.note)}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-sm">
          
          {/* Purpose & Problem */}
          <div>
            <h3 className="text-xs font-mono tracking-widest text-[#00ff9d] uppercase mb-2">
              01 // {language === 'ar' ? 'الهدف والمشكلة المعالجة' : 'PROBLEM & PURPOSE'}
            </h3>
            <p className="text-[#8e95a5] leading-relaxed">
              {t(project.problemPurpose)}
            </p>
          </div>

          {/* Architecture Details */}
          <div>
            <h3 className="text-xs font-mono tracking-widest text-[#00ff9d] uppercase mb-2">
              02 // {language === 'ar' ? 'المعمارية البرمجية والقرارات الهندسية' : 'TECHNICAL ARCHITECTURE'}
            </h3>
            <p className="text-[#8e95a5] leading-relaxed mb-4">
              {t(project.architectureDetails)}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-[#090a0d] border border-white/10 rounded-sm text-xs font-mono text-[#f4f2eb]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Feature Verification Status */}
          <div>
            <h3 className="text-xs font-mono tracking-widest text-[#00ff9d] uppercase mb-4">
              03 // {language === 'ar' ? 'حالة الميزات (التحقق الدقيق)' : 'FEATURE VERIFICATION STATUS'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#151820] border border-white/5 rounded-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-[#f4f2eb]">
                        {t(feature.title)}
                      </span>
                      {feature.status === 'implemented' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#00ff9d] bg-[#00ff9d]/10 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" />
                          {language === 'ar' ? 'مكتمل' : 'IMPLEMENTED'}
                        </span>
                      )}
                      {feature.status === 'in_progress' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded">
                          <Clock className="w-3 h-3" />
                          {language === 'ar' ? 'قيد التطوير' : 'IN PROGRESS'}
                        </span>
                      )}
                      {feature.status === 'planned' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-blue-300 bg-blue-400/10 px-2 py-0.5 rounded">
                          <Calendar className="w-3 h-3" />
                          {language === 'ar' ? 'مخطط له' : 'PLANNED'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#8e95a5] leading-relaxed">
                      {t(feature.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Repository & Deployment Truthfulness Notice */}
          <div className="p-4 bg-[#090a0d] border border-white/10 rounded-sm text-xs font-mono text-[#8e95a5]">
            <span className="text-[#f4f2eb] font-bold block mb-1">
              {language === 'ar' ? 'إشعار الشفافية الهندسية:' : 'ENGINEERING TRANSPARENCY NOTICE:'}
            </span>
            {language === 'ar'
              ? `${t(project.title)} قيد التطوير المنهجي الفعلي. حرصاً على الصدق المهني والشفافية الهندسية، تُعرض هنا المعمارية المعتمدة ومقاييس الأداء الواقعية.`
              : `${t(project.title)} is governed by rigorous engineering principles. To preserve professional integrity, authentic architectural decisions, real telemetry, and performance benchmarks are presented.`}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#00ff9d] text-[#090a0d] font-mono text-xs font-bold tracking-wider uppercase rounded-sm hover:bg-[#e2ff63] transition-colors cursor-pointer"
          >
            {language === 'ar' ? 'إغلاق دراسة الحالة' : 'Close Dossier'}
          </button>
        </div>

      </div>
    </div>
  );
}
