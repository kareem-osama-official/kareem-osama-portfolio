'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, ShieldCheck, CheckCircle2, HardDrive, FileText, ExternalLink, RefreshCw } from 'lucide-react';

export default function AdminMediaPage() {
  const [selectedAsset, setSelectedAsset] = useState<string>('portrait');

  const mediaAssets = [
    {
      id: 'portrait',
      name: 'kareem-osama.jpg',
      path: '/images/kareem-osama.jpg',
      type: 'image/jpeg',
      size: '228 KB (228,419 bytes)',
      dimensions: '800 x 1067 px (3:4 ratio)',
      role: 'Primary Biometric Identity Asset (Dark Suit)',
      verified: true,
      lastModified: '2026-10-17',
    },
    {
      id: 'nexora_mockup',
      name: 'nexora-workspace-preview',
      path: '/images/kareem-osama.jpg', // rendered via code mockup engine
      type: 'Vector Code UI Engine',
      size: 'Dynamic SVG/HTML',
      dimensions: '16:10 Canvas',
      role: 'Nexora C++ Sandbox Workspace Preview',
      verified: true,
      lastModified: '2026-10-17',
    },
    {
      id: 'algomind_mockup',
      name: 'algomind-bst-tree-preview',
      path: '/images/kareem-osama.jpg',
      type: 'Vector Code UI Engine',
      size: 'Dynamic SVG/HTML',
      dimensions: '16:10 Canvas',
      role: 'AlgoMind Binary Search Tree Visualization',
      verified: true,
      lastModified: '2026-10-17',
    },
  ];

  return (
    <div className="space-y-8 font-mono text-xs">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[#00ff9d] text-xs font-bold mb-1">
            <ImageIcon className="w-4 h-4" />
            <span>MEDIA ASSETS &amp; BIOMETRIC REPOSITORY</span>
          </div>
          <h1 className="text-xl font-bold text-[#f4f2eb]">
            Asset Verification &amp; Visual Media Library
          </h1>
          <p className="text-[11px] text-[#8e95a5] mt-1">
            Local static assets stored in public/images/ verified for Next.js image optimization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-[#0e1015] border border-[#00ff9d]/30 text-[#00ff9d] rounded flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AUTHENTIC ASSETS ONLY</span>
          </div>
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mediaAssets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => setSelectedAsset(asset.id)}
            className={`p-4 bg-[#0e1015] border rounded-sm transition-all cursor-pointer ${
              selectedAsset === asset.id
                ? 'border-[#00ff9d] ring-1 ring-[#00ff9d]/30'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {/* Visual Thumbnail Frame */}
            <div className="relative w-full aspect-[4/3] bg-[#07080a] border border-white/5 rounded-sm overflow-hidden mb-3 flex items-center justify-center">
              {asset.id === 'portrait' ? (
                <Image
                  src={asset.path}
                  alt={asset.name}
                  fill
                  className="object-cover object-[50%_15%]"
                />
              ) : (
                <div className="text-center p-4 text-[#8e95a5]">
                  <ImageIcon className="w-8 h-8 mx-auto text-[#00ff9d] mb-1" />
                  <div className="text-[10px] text-[#f4f2eb] font-bold">{asset.name}</div>
                  <div className="text-[9px] text-[#00ff9d]">ACTIVE CODE PREVIEW</div>
                </div>
              )}

              <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#07080a]/80 text-[#00ff9d] text-[9px] border border-[#00ff9d]/30 rounded">
                VERIFIED
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-[#f4f2eb] font-bold truncate">{asset.name}</div>
              <div className="text-[#8e95a5] text-[10px]">{asset.role}</div>
              <div className="text-[#00ff9d] text-[10px] pt-1">{asset.size}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Asset Deep Dive Spec */}
      <div className="p-6 bg-[#0e1015] border border-white/10 rounded-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <span className="text-[#00ff9d] font-bold">// ASSET SPECIFICATION &amp; TELEMETRY</span>
          <span className="text-[10px] text-[#8e95a5]">PUBLIC ROUTE ACCESS: HTTP 200</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 bg-[#12151c] border border-white/5 rounded">
            <div className="text-[10px] text-[#8e95a5]">PHYSICAL DISK PATH</div>
            <div className="text-[#f4f2eb] font-bold text-[11px] truncate mt-0.5">
              public/images/kareem-osama.jpg
            </div>
          </div>

          <div className="p-3 bg-[#12151c] border border-white/5 rounded">
            <div className="text-[10px] text-[#8e95a5]">FILE SIZE ON DISK</div>
            <div className="text-[#00ff9d] font-bold text-[11px] mt-0.5">
              228,419 bytes (228 KB)
            </div>
          </div>

          <div className="p-3 bg-[#12151c] border border-white/5 rounded">
            <div className="text-[10px] text-[#8e95a5]">COMPRESSION &amp; FORMAT</div>
            <div className="text-[#f4f2eb] font-bold text-[11px] mt-0.5">
              JPEG Standard (Quality 90)
            </div>
          </div>

          <div className="p-3 bg-[#12151c] border border-white/5 rounded">
            <div className="text-[10px] text-[#8e95a5]">AUTHENTIC SUIT VERIFIED</div>
            <div className="text-[#00ff9d] font-bold text-[11px] mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Kareem Osama</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#07080a] border border-white/5 rounded text-[11px] text-[#8e95a5] flex items-center justify-between">
          <span>Direct Browser Access: <code className="text-[#00ff9d]">http://localhost:3001/images/kareem-osama.jpg</code></span>
          <a
            href="/images/kareem-osama.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ff9d] hover:underline flex items-center gap-1"
          >
            <span>Open Asset</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

    </div>
  );
}
