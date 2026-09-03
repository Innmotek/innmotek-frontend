/**
 * Innmotek Frontend - Newsletter Subscriber Box (Client Component)
 */

'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export default function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 500);
  }

  return (
    <div className="rounded-3xl border border-[#262626] bg-gradient-to-br from-[#141414] via-[#161616] to-[#121212] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[#C5A880]">
            <Mail className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Engineering Digest</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Subscribe to Technical Thermal Bulletins
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl">
            Receive quarterly case studies, COP efficiency benchmark reports, and sub-zero HVAC engineering best practices straight to your inbox.
          </p>
        </div>

        <div className="lg:col-span-5">
          {subscribed ? (
            <div className="flex items-center space-x-3 rounded-2xl border border-emerald-800/40 bg-emerald-950/30 p-4 text-emerald-300 text-xs">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>Thank you for subscribing. You will receive the next engineering bulletin.</span>
            </div>
          ) : (
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your corporate email..."
                  className="flex-1 rounded-xl border border-[#2B2B2B] bg-[#181818] px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-[#C5A880] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center space-x-2 rounded-xl bg-[#C5A880] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:bg-[#D4B890] transition-all shadow-md shadow-[#C5A880]/10 shrink-0"
                >
                  <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-neutral-500">
                Zero spam. Technical engineering Whitepapers only. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
