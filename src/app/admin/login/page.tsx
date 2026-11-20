'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Terminal, ArrowRight, AlertCircle, Lock, Mail } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Authentication rejected');
        setLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Connection failure to authentication daemon');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#07080a] text-[#f4f2eb] font-mono atelier-grid-bg">
      <div className="w-full max-w-md bg-[#0e1015] border border-white/10 rounded-sm p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Top Terminal Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 text-xs text-[#8e95a5]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff9d]" />
            <span className="text-[#00ff9d] ml-2 font-bold tracking-wider">ATELIER_OS // AUTH</span>
          </div>
          <span className="text-[10px] text-[#8e95a5]">SECURE_V2.6</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-[#00ff9d] mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>ADMINISTRATIVE ACCESS GATE</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#f4f2eb]">
            Kareem Osama Atelier CMS
          </h1>
          <p className="text-xs text-[#8e95a5] mt-1">
            Enter authorized administrator credentials to manage portfolio artifacts and database records.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-sm text-xs text-red-400 flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#8e95a5] mb-1.5">
              Admin Identity / Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8e95a5] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kareemosama.dev"
                className="w-full pl-9 pr-3 py-2.5 bg-[#07080a] border border-white/10 focus:border-[#00ff9d] rounded-sm text-sm text-[#f4f2eb] placeholder-white/20 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#8e95a5] mb-1.5">
              Secret Passkey
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8e95a5] absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-[#07080a] border border-white/10 focus:border-[#00ff9d] rounded-sm text-sm text-[#f4f2eb] placeholder-white/20 outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#00ff9d] hover:bg-[#20ffa9] text-[#07080a] font-bold tracking-wider uppercase rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2 shadow-lg"
          >
            <span>{loading ? 'Authenticating...' : 'Establish Session'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-[#8e95a5]">
          <a href="/" className="hover:text-[#00ff9d] transition-colors">
            ← Return to Public Portfolio
          </a>
          <span className="text-white/40">SQLITE ENCRYPTED</span>
        </div>

      </div>
    </div>
  );
}
