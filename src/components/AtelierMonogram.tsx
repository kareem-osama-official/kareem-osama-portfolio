'use client';

import React from 'react';

interface AtelierMonogramProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AtelierMonogram({ size = 'md', className = '' }: AtelierMonogramProps) {
  const sizeClasses = {
    sm: 'w-7 h-7 text-[11px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center font-bold tracking-wider font-mono transition-all duration-300 group ${sizeClasses[size]} ${className}`}
      aria-label="Kareem Osama Monogram"
    >
      <div className="absolute inset-0 border border-white/15 bg-[#0e1015] rounded-sm group-hover:border-[#00ff9d]/70 transition-colors" />
      <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t-2 border-l-2 border-[#00ff9d]" />
      <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b-2 border-r-2 border-[#00ff9d]" />
      <span className="relative z-10 text-[#f4f2eb] group-hover:text-[#00ff9d] transition-colors">
        KO
      </span>
    </div>
  );
}
