'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Camera, ShieldCheck } from 'lucide-react';

interface PortraitFrameProps {
  priority?: boolean;
  className?: string;
}

export function PortraitFrame({ priority = true, className = '' }: PortraitFrameProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full min-h-[420px] lg:min-h-[460px] flex items-end justify-center overflow-hidden ${className}`}>
      
      {/* Background Subtle Mint Radial Glow behind the portrait */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-56 h-56 bg-[#00ff9d]/[0.07] rounded-full blur-[60px] pointer-events-none" />

      {/* Top Identity Tag in center column */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#8e95a5] z-20">
        <span className="flex items-center gap-1.5 text-[#00ff9d]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
          <span>FIG. 01 // IDENTITY</span>
        </span>
        <span className="text-[9px] uppercase tracking-widest text-[#8e95a5] border border-white/10 px-1.5 py-0.5 rounded-[2px] bg-[#07080a]/60">
          KO_PORTRAIT
        </span>
      </div>

      {!imageError ? (
        <div className="relative w-full h-[95%] max-w-[360px] flex items-end justify-center z-10 overflow-hidden">
          <div className="relative w-full h-full scale-[2.2] origin-top translate-y-2">
            <Image
              src={PERSONAL_INFO.portraitPath}
              alt="Kareem Osama — Personal Portrait in Formal Dark Suit"
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 360px, 400px"
              className={`object-cover object-[50%_8%] transition-all duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </div>

          {/* Seamless Vignette and Bottom Dissolve into container */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0c0e14] via-[#0c0e14]/70 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0c0e14]/60 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0c0e14]/60 to-transparent pointer-events-none" />

          {/* Lower authentic badge badge on portrait */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[9px] font-mono text-white/90 z-20 drop-shadow">
            <span className="px-1.5 py-0.5 bg-[#07080a]/80 backdrop-blur-sm border border-white/10 rounded-[2px] text-[#f4f2eb]">
              KAREEM OSAMA
            </span>
            <span className="px-1.5 py-0.5 bg-[#07080a]/80 backdrop-blur-sm border border-[#00ff9d]/40 rounded-[2px] text-[#00ff9d] flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5" />
              AUTHENTIC SUIT ASSET
            </span>
          </div>
        </div>
      ) : (
        /* Honest Fallback Placeholder: Only shown if image asset is unavailable */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0c0e14] text-[#8e95a5]">
          <Camera className="w-10 h-10 mb-3 text-[#00ff9d]" />
          <p className="font-mono text-xs text-[#f4f2eb] mb-1">
            PORTRAIT ASSET LOCATION:
          </p>
          <code className="text-[11px] font-mono text-[#00ff9d] bg-[#07080a] px-2 py-1 border border-white/10 rounded">
            public/images/kareem-osama.jpg
          </code>
        </div>
      )}

      {/* Subtle corner crosshairs on portrait column */}
      <div className="absolute top-2 left-2 text-[10px] font-mono text-white/20 select-none">+</div>
      <div className="absolute top-2 right-2 text-[10px] font-mono text-white/20 select-none">+</div>
      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/20 select-none">+</div>
      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-white/20 select-none">+</div>
    </div>
  );
}
