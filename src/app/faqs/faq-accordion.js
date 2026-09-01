/**
 * Innmotek Frontend - FAQ Interactive Accordion Component
 */

'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import SafeHtml from '@/components/common/safe-html';

export default function FaqAccordion({ initialFaqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [search, setSearch] = useState('');

  const filtered = initialFaqs.filter(f =>
    f.question?.toLowerCase().includes(search.toLowerCase()) ||
    f.answer?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-lg mx-auto">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search technical questions (e.g. COP, sub-zero, installation)..."
          className="w-full rounded-2xl border border-[#2B2B2B] bg-[#121212] py-3.5 pl-12 pr-4 text-xs text-white placeholder-neutral-500 focus:border-[#C5A880] focus:outline-none shadow-lg"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-[#222222] bg-[#121212] p-8">
            <p className="text-xs text-neutral-400">No questions found matching your search term.</p>
          </div>
        ) : (
          filtered.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id || idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#C5A880]/60 bg-[#141414] shadow-xl'
                    : 'border-[#222222] bg-[#121212] hover:border-[#333333]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-sm font-bold text-white pr-4 leading-relaxed">
                    {faq.question}
                  </span>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all ${
                    isOpen
                      ? 'border-[#C5A880] bg-[#C5A880] text-[#0A0A0A]'
                      : 'border-[#2B2B2B] bg-[#181818] text-neutral-400'
                  }`}>
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-[#1F1F1F] animate-fadeIn">
                    <SafeHtml html={faq.answer} />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
