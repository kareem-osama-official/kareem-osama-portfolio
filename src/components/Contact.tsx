'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUpRight, Send, CheckCircle2, Copy, Check, Radio, X } from 'lucide-react';

export function Contact() {
  const { language, isRtl } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitSuccess(data.messageId || 'DISPATCH_ACK');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitError(data.error || 'Failed to dispatch message to SQLite database.');
      }
    } catch {
      setSubmitError('Network error connecting to portfolio dispatch endpoint.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 border-t border-white/10 relative overflow-hidden bg-[#07080a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* EXACT CONTACT CARD CONTAINER (MATCHING IMAGE 1)          */}
        {/* ======================================================== */}
        <div className="bg-[#0c0e14] border border-white/10 rounded-md p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT COLUMN: HEADLINE & INVITATION (5 COLS) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="font-mono text-xs text-[#00ff9d] tracking-wider">
                &gt; LET&apos;S_BUILD_SOMETHING_GREAT
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#f4f2eb] font-sans leading-tight">
                {language === 'ar' ? (
                  <>
                    جاهز لبناء<br />
                    ما هو <span className="text-[#00ff9d]">مؤثر._</span>
                  </>
                ) : (
                  <>
                    Ready to build<br />
                    what <span className="text-[#00ff9d]">matters._</span>
                  </>
                )}
              </h2>

              <p className="text-xs sm:text-sm font-mono text-[#8e95a5] leading-relaxed max-w-sm pt-1">
                {language === 'ar'
                  ? 'صندوق بريدي مفتوح دائماً لمناقشة المشاريع الهندسية، الأفكار الخوارزمية، والفرص التقنية الطموحة.'
                  : 'Open for engineering collaborations, algorithmic challenges, and ambitious software projects.'}
              </p>
            </div>

            {/* CENTER COLUMN: WIREFRAME RADAR GRAPHIC (3 COLS) */}
            <div className="lg:col-span-3 flex justify-center py-4 lg:py-0">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* Concentric rings */}
                <div className="absolute inset-0 rounded-full border border-white/10 animate-spin" style={{ animationDuration: '24s' }} />
                <div className="absolute inset-3 rounded-full border border-dashed border-[#00ff9d]/30" />
                <div className="absolute inset-8 rounded-full border border-white/10" />
                <div className="absolute inset-12 rounded-full border border-[#00ff9d]/50 bg-[#00ff9d]/5" />
                
                {/* Crosshairs */}
                <div className="absolute w-full h-[1px] bg-white/10" />
                <div className="absolute h-full w-[1px] bg-white/10" />

                {/* Center Pulse Point */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#00ff9d] shadow-lg shadow-[#00ff9d] animate-ping" />
                <div className="w-2 h-2 rounded-full bg-[#00ff9d]" />
                
                {/* Micro Node Coordinate Label */}
                <div className="absolute -bottom-2 text-[9px] font-mono text-[#8e95a5] bg-[#0c0e14] px-1.5 border border-white/10 rounded">
                  CAIRO // 30.04°N
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ACTION & EMAIL (4 COLS) */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-5 lg:pl-6 lg:border-l lg:border-white/10 font-mono">
              <div className="space-y-1">
                <div className="text-[10px] text-[#8e95a5] uppercase tracking-wider">&gt; SEND_MESSAGE</div>
                <p className="text-xs text-[#8e95a5] leading-relaxed">
                  I&apos;m currently available for software development projects, technical collaborations, and ambitious initiatives.
                </p>
              </div>

              {/* Action Button: START A CONVERSATION */}
              <div>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="w-full py-3 px-5 bg-transparent border border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-[#07080a] text-xs font-mono font-bold tracking-wider uppercase rounded-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm group"
                >
                  <span>{language === 'ar' ? 'ابدأ محادثة الآن' : 'START A CONVERSATION'}</span>
                  <ArrowUpRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                </button>
              </div>

              {/* Direct email display with copy */}
              <div className="pt-2 flex items-center justify-between text-xs border-t border-white/5">
                <a
                  href={`mailto:${PERSONAL_INFO.contact.email}`}
                  className="text-[#8e95a5] hover:text-[#00ff9d] transition-colors truncate"
                >
                  {PERSONAL_INFO.contact.email}
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1 text-[#8e95a5] hover:text-[#00ff9d] transition-colors cursor-pointer shrink-0 ml-2"
                  title="Copy email address"
                  aria-label="Copy email"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#00ff9d]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {copied && (
                <div className="text-[10px] text-[#00ff9d] animate-in fade-in">
                  ✓ Copied to clipboard
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* DIRECT INLINE DISPATCH MODAL (CONNECTS TO SQLITE DB)      */}
      {/* ======================================================== */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-[#0c0e14] border border-white/15 rounded-md p-6 sm:p-8 shadow-2xl font-mono text-xs">
            
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => { setModalOpen(false); setSubmitSuccess(null); }}
              className="absolute top-5 right-5 p-1 text-[#8e95a5] hover:text-[#00ff9d] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <div className="text-[10px] text-[#00ff9d] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Radio className="w-3 h-3" />
                <span>DISPATCH PIPELINE // SQLITE PERSISTENCE</span>
              </div>
              <h3 className="text-xl font-bold text-[#f4f2eb] font-sans">
                {language === 'ar' ? 'إرسال رسالة مباشرة إلى كريم' : 'Send a Direct Message to Kareem'}
              </h3>
            </div>

            {submitSuccess ? (
              <div className="p-6 text-center bg-[#07080a] border border-[#00ff9d]/30 rounded space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#00ff9d] mx-auto animate-bounce" />
                <div className="text-sm font-bold text-[#f4f2eb]">TRANSMISSION RECORDED</div>
                <div className="text-[10px] text-[#00ff9d] bg-[#0c0e14] px-2 py-1 rounded inline-block">
                  RECEIPT: {submitSuccess}
                </div>
                <p className="text-xs text-[#8e95a5]">
                  Your message has been committed to the local database. Kareem Osama will inspect it in the Admin OS.
                </p>
                <button
                  type="button"
                  onClick={() => { setModalOpen(false); setSubmitSuccess(null); }}
                  className="mt-2 px-4 py-2 bg-[#00ff9d] text-[#07080a] font-bold rounded-sm text-xs"
                >
                  CLOSE WINDOW
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                  <div className="p-2.5 bg-red-950/40 border border-red-500/40 rounded text-red-300 text-[11px]">
                    {submitError}
                  </div>
                )}

                <div>
                  <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Mercer"
                    className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">YOUR EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">SUBJECT</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Engineering collaboration inquiry"
                    className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#8e95a5] uppercase mb-1">MESSAGE *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Kareem, I reviewed your portfolio and would like to discuss..."
                    className="w-full px-3 py-2 bg-[#07080a] border border-white/10 rounded-sm text-[#f4f2eb] focus:border-[#00ff9d] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-[#00ff9d] hover:bg-[#33ffb0] text-[#07080a] font-bold uppercase rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'COMMITTING TO SQLITE...' : 'DISPATCH MESSAGE'}</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
