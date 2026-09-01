/**
 * Innmotek Frontend - Fixed Vertical Side Rail (Pattern 2: Brand Signature)
 * 
 * Features:
 *   - Pinned to right viewport edge on desktop (hidden on mobile)
 *   - Rotated 90° letter-spaced architectural brand signature
 *   - Quick-contact launch actions (WhatsApp, Phone, Email) with hover tooltips
 */

'use client';

import { Phone, Mail, MessageCircle, ArrowUp } from 'lucide-react';

export default function SideRail() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <aside
      className="hidden xl:flex fixed top-0 right-0 h-screen w-14 z-30 flex-col items-center justify-between border-l border-[#222222] bg-[#0A0A0A]/85 backdrop-blur-lg py-6"
      aria-label="Innmotek Quick Action Rail"
    >
      {/* Top Accent Notch */}
      <div className="flex flex-col items-center space-y-2">
        <div className="h-2 w-2 rounded-full bg-[#C5A880] animate-pulse" />
        <div className="h-6 w-[1px] bg-gradient-to-b from-[#C5A880] to-transparent" />
      </div>

      {/* Middle Rotated Brand Signature */}
      <div className="rotate-90 origin-center whitespace-nowrap select-none my-auto">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-neutral-500 hover:text-[#C5A880] transition-colors">
          INNMOTEK THERMAL SYSTEMS
        </span>
      </div>

      {/* Bottom Contact Actions */}
      <div className="flex flex-col items-center space-y-4">
        {/* WhatsApp */}
        <a
          href="https://wa.me/918081741031"
          target="_blank"
          rel="noreferrer"
          className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#262626] bg-[#141414] text-neutral-400 hover:border-[#C5A880] hover:text-[#C5A880] hover:bg-[#1C1C1C] transition-all"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="pointer-events-none absolute right-12 rounded-lg bg-[#181818] border border-[#2B2B2B] px-2.5 py-1 text-[10px] font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            WhatsApp Direct
          </span>
        </a>

        {/* Email */}
        <a
          href="mailto:info@innmotek.com"
          className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#262626] bg-[#141414] text-neutral-400 hover:border-[#C5A880] hover:text-[#C5A880] hover:bg-[#1C1C1C] transition-all"
          aria-label="Send Email"
        >
          <Mail className="h-4 w-4" />
          <span className="pointer-events-none absolute right-12 rounded-lg bg-[#181818] border border-[#2B2B2B] px-2.5 py-1 text-[10px] font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            info@innmotek.com
          </span>
        </a>

        {/* Phone */}
        <a
          href="tel:+918081741031"
          className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#262626] bg-[#141414] text-neutral-400 hover:border-[#C5A880] hover:text-[#C5A880] hover:bg-[#1C1C1C] transition-all"
          aria-label="Call Innmotek"
        >
          <Phone className="h-4 w-4" />
          <span className="pointer-events-none absolute right-12 rounded-lg bg-[#181818] border border-[#2B2B2B] px-2.5 py-1 text-[10px] font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            +91 808 1741031
          </span>
        </a>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:text-white transition-colors"
          title="Back to Top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
