/**
 * Innmotek Frontend - FAQs Page (/faqs)
 * 
 * Replaces old CRA FAQs:
 *   Innmotek-frontend-OLD/src/frontend/faqs/index.js
 * 
 * Features:
 *   - Server-side pre-fetching from live Node.js backend (/api/faqs)
 *   - Interactive dark accordion cards with search filter
 */

import { getFaqs } from '@/lib/api';
import FaqAccordion from './faq-accordion';
import { HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Frequently Asked Questions | Innmotek Thermal Systems',
  description: 'Technical guidance, COP ratings, sub-zero heating operations, and installation advice for Innmotek heat pump systems.',
};

export const revalidate = 30;

export default async function FaqsPage() {
  const faqs = await getFaqs();

  return (
    <div className="space-y-16 pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/40 bg-[#C5A880]/10 px-3.5 py-1">
          <HelpCircle className="h-3.5 w-3.5 text-[#C5A880]" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
            Knowledge Base & Guidance
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Everything you need to know about Innmotek heat pump efficiency, installation sizing, and solar thermal integrations.
        </p>
      </div>

      {/* Accordion Component */}
      <FaqAccordion initialFaqs={faqs} />

      {/* Need More Help CTA */}
      <div className="rounded-3xl border border-[#222222] bg-[#121212] p-8 text-center space-y-3">
        <h3 className="text-base font-bold text-white">Have a Specific Project or Application Question?</h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          Our senior heating engineers can provide thermodynamic calculations and tailored system recommendations.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 rounded-xl bg-[#C5A880] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:bg-[#D4B890] transition-all"
          >
            <span>Ask an Engineer</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
