'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X, ArrowUpRight, Lock, ScanLine } from 'lucide-react';

export function Header() {
  const { language, t, isRtl } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cairoTime, setCairoTime] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Live Cairo time updater
    const updateTime = () => {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setCairoTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { id: 'hero', label: '01__HOME', href: '#hero' },
    { id: 'about', label: '02__ABOUT', href: '#about' },
    { id: 'projects', label: '03__PROJECTS', href: '#projects' },
    { id: 'skills', label: '04__STACK', href: '#skills' },
    { id: 'contact', label: '05__CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#07080a]/95 backdrop-blur-md border-b border-white/10 py-2.5 shadow-xl'
          : 'bg-[#07080a]/60 backdrop-blur-sm py-3.5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* LEFT: Monogram & Identity (Matching Reference AF Logo) */}
          <a
            href="#hero"
            className="flex items-center gap-3 group cursor-pointer shrink-0"
            aria-label="Kareem Osama Home"
          >
            {/* Custom Mint Geometric Monogram inspired by reference AF mark */}
            <div className="relative w-8 h-8 flex items-center justify-center font-mono font-extrabold text-xs tracking-tighter text-[#00ff9d] border border-[#00ff9d]/40 bg-[#00ff9d]/10 rounded-[2px] group-hover:border-[#00ff9d] transition-colors shadow-sm shadow-[#00ff9d]/20">
              <span className="font-mono tracking-normal">KO</span>
              <span className="absolute -top-[1px] -right-[1px] w-1 h-1 bg-[#00ff9d]" />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#f4f2eb] uppercase group-hover:text-[#00ff9d] transition-colors">
                {t(PERSONAL_INFO.name)}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#8e95a5] uppercase">
                <span className="text-[#00ff9d]">•</span>
                <span>{language === 'ar' ? 'مطور نظم وبرمجيات' : 'SOFTWARE DEVELOPER'}</span>
              </span>
            </div>
          </a>

          {/* CENTER: Contained Horizontal Capsule Nav (Exact Reference Pill Bar) */}
          <nav
            className="hidden md:flex items-center gap-1 px-3 py-1 bg-[#0c0e14]/90 border border-white/10 rounded-sm shadow-inner"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`px-2.5 py-1 text-[11px] font-mono tracking-wider transition-all relative ${
                    isActive
                      ? 'text-[#00ff9d] font-bold'
                      : 'text-[#8e95a5] hover:text-[#f4f2eb]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-[#00ff9d] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* RIGHT: Compact Utilities (Cairo Clock, Admin OS, Lang Switcher, CTA) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Cairo Live Time */}
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#0c0e14] border border-white/10 rounded-sm text-[10px] font-mono text-[#8e95a5]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
              <span>CAIRO {cairoTime || 'EEST'}</span>
            </div>

            {/* Admin OS shortcut */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono text-[#8e95a5] hover:text-[#00ff9d] bg-[#0c0e14] hover:bg-[#12151c] border border-white/10 hover:border-[#00ff9d]/40 rounded-sm transition-all"
              title="Access Admin CMS"
            >
              <Lock className="w-3 h-3 text-[#00ff9d]" />
              <span>[ADMIN]</span>
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Initiate Contact CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#0c0e14] hover:bg-[#00ff9d] text-[#00ff9d] hover:text-[#07080a] border border-[#00ff9d]/50 hover:border-[#00ff9d] text-[11px] font-mono font-bold tracking-wider rounded-sm transition-all duration-200"
            >
              <span>{language === 'ar' ? 'تواصل' : 'INITIATE'}</span>
              <ArrowUpRight className={`w-3 h-3 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
            </a>

            {/* Frame Corner Status Bracket (Visual Reference Detail) */}
            <div className="text-white/20 select-none font-mono text-xs">
              <ScanLine className="w-3.5 h-3.5 text-[#8e95a5]/40" />
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/admin"
              className="p-1 text-[#00ff9d] bg-[#0c0e14] border border-white/10 rounded-sm"
              title="Admin OS"
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#f4f2eb] hover:text-[#00ff9d] bg-[#0c0e14] border border-white/10 rounded-sm"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[52px] bg-[#07080a]/98 backdrop-blur-xl border-b border-white/10 p-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2 font-mono text-xs" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-white/5 text-[#f4f2eb] hover:text-[#00ff9d]"
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-[#00ff9d]">GO ↗</span>
              </a>
            ))}

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-white/5 text-[#00ff9d]"
            >
              <span className="flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                <span>[ADMIN_OS CONTROL]</span>
              </span>
              <span className="text-[10px] bg-[#00ff9d]/10 px-1.5 py-0.5 rounded border border-[#00ff9d]/30">AUTH</span>
            </Link>

            <div className="pt-3 flex items-center justify-between text-[11px] text-[#8e95a5]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
                <span>CAIRO {cairoTime || 'EEST'}</span>
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 bg-[#00ff9d] text-[#07080a] font-bold rounded-sm text-[11px]"
              >
                {language === 'ar' ? 'ابدأ التواصل' : 'INITIATE DIALOGUE'}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
