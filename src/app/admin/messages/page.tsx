'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle2, Clock, Eye, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (msg: any) => {
    const nextRead = msg.is_read ? 0 : 1;
    await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: msg.id, is_read: nextRead }),
    });
    setMessages(messages.map((m) => (m.id === msg.id ? { ...m, is_read: nextRead } : m)));
    if (selectedMessage?.id === msg.id) {
      setSelectedMessage({ ...selectedMessage, is_read: nextRead });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this inquiry from the database?')) return;
    await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
    setMessages(messages.filter((m) => m.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  return (
    <div className="space-y-8 font-mono text-xs">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-[#f4f2eb] tracking-tight">
            CONTACT INQUIRIES & DISPATCH INBOX
          </h1>
          <p className="text-[#8e95a5] mt-1 text-xs">
            Review incoming transmissions submitted through the public portfolio contact interface.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchMessages}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#12151c] hover:bg-[#1a1e27] text-[#f4f2eb] border border-white/10 rounded-sm cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#00ff9d]" />
          <span>Refresh Inbox</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Messages List Column */}
        <div className="lg:col-span-5 bg-[#0e1015] border border-white/10 rounded-sm overflow-hidden">
          <div className="p-3.5 bg-[#12151c] border-b border-white/10 text-[#8e95a5] flex items-center justify-between">
            <span>INCOMING TRANSMISSIONS ({messages.length})</span>
            <span className="text-[10px] text-[#00ff9d]">
              {messages.filter((m) => !m.is_read).length} UNREAD
            </span>
          </div>

          <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
            {messages.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  setSelectedMessage(m);
                  if (!m.is_read) handleToggleRead(m);
                }}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedMessage?.id === m.id
                    ? 'bg-[#151922] border-l-2 border-[#00ff9d]'
                    : 'hover:bg-[#12151c]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs ${!m.is_read ? 'font-bold text-[#00ff9d]' : 'text-[#f4f2eb]'}`}>
                    {m.name}
                  </span>
                  <span className="text-[10px] text-[#8e95a5]">
                    {new Date(m.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-[11px] text-[#8e95a5] truncate mb-1">
                  {m.subject || '(No Subject)'}
                </div>
                <div className="text-[10px] text-white/40 truncate">
                  {m.message}
                </div>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="p-12 text-center text-[#8e95a5]">
                Inbox is clean. No transmissions received.
              </div>
            )}
          </div>
        </div>

        {/* Message Inspection Pane */}
        <div className="lg:col-span-7 bg-[#0e1015] border border-white/10 rounded-sm p-6 flex flex-col justify-between min-h-[400px]">
          {selectedMessage ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-base font-bold text-[#f4f2eb] block">
                    {selectedMessage.subject || 'Portfolio Inquiry'}
                  </span>
                  <span className="text-[11px] text-[#8e95a5]">
                    From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleRead(selectedMessage)}
                    className="p-1.5 bg-[#12151c] text-[#8e95a5] hover:text-[#00ff9d] rounded-sm"
                    title={selectedMessage.is_read ? 'Mark as Unread' : 'Mark as Read'}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-1.5 bg-[#12151c] text-[#8e95a5] hover:text-red-400 rounded-sm"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#07080a] border border-white/5 rounded-sm text-sm text-[#f4f2eb] leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              <div className="text-[10px] text-[#8e95a5] flex items-center justify-between pt-4 border-t border-white/5">
                <span>Received: {new Date(selectedMessage.created_at).toLocaleString()}</span>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Inquiry')}`}
                  className="px-3 py-1.5 bg-[#00ff9d] text-[#07080a] font-bold rounded-sm hover:bg-[#20ffa9]"
                >
                  Reply via Email ↗
                </a>
              </div>
            </div>
          ) : (
            <div className="my-auto text-center text-[#8e95a5] space-y-2">
              <Mail className="w-8 h-8 text-[#00ff9d]/60 mx-auto" />
              <p>Select a transmission from the left pane to read details.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
