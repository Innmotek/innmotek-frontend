/**
 * Innmotek Frontend - Unified Legal / Policy Page Template
 * 
 * Replaces legacy CRA policy pages:
 *   privacy-policy, company-policie, etc.
 * 
 * Features:
 *   - Consumes live HTML content from Node.js backend (/api/pages/:slug)
 *   - Safe HTML rendering with typography styling
 *   - Sidebar navigation for all corporate & warranty policies
 *   - Last updated metadata and direct compliance contact info
 */

import Link from 'next/link';
import SafeHtml from '@/components/common/safe-html';
import {
  ShieldCheck,
  FileText,
  CreditCard,
  Award,
  ChevronRight,
  PhoneCall,
  Mail,
  Building2,
  Lock
} from 'lucide-react';

const POLICY_LINKS = [
  { slug: 'privacy-policy', title: 'Privacy Policy', icon: Lock },
  { slug: 'terms-and-conditions', title: 'Terms & Conditions', icon: FileText },
  { slug: 'payment-policy', title: 'Payment Policy', icon: CreditCard },
  { slug: 'dealer-policy', title: 'Dealer Policy', icon: Award }
];

export default function LegalPageTemplate({ page, activeSlug }) {
  const title = page?.title || 'Corporate Policy';
  const rawBody = page?.body || page?.description || '<p>Policy terms are currently being updated.</p>';
  const updatedAt = page?.updated_at ? new Date(page.updated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'August 2026';

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="border-b border-[#222222] pb-8 space-y-3">
        <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-3.5 py-1">
          <ShieldCheck className="h-3.5 w-3.5 text-[#C5A880]" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
            Legal & Compliance Documentation
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
          {title}
        </h1>
        <p className="text-xs text-neutral-400">
          Last updated: <span className="text-neutral-200">{updatedAt}</span> | Innmotek LLP Regulatory Governance
        </p>
      </div>

      {/* Main Grid: Sidebar + Document Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6 sticky top-28">
          {/* Policy Navigation Card */}
          <div className="rounded-3xl border border-[#222222] bg-[#121212] p-6 space-y-4 shadow-xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">
              Corporate Policies
            </h2>
            <nav className="space-y-1.5">
              {POLICY_LINKS.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSlug === item.slug;
                return (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#C5A880] text-[#0A0A0A] font-bold shadow-md shadow-[#C5A880]/20'
                        : 'text-neutral-300 hover:text-white hover:bg-[#181818]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Legal Inquiries Box */}
          <div className="rounded-3xl border border-[#222222] bg-[#121212] p-6 space-y-3 shadow-xl text-xs text-neutral-300">
            <div className="flex items-center space-x-2 text-[#C5A880]">
              <Building2 className="h-4 w-4" />
              <span className="font-bold uppercase tracking-wider text-[11px]">Compliance Desk</span>
            </div>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              For regulatory questions, terms interpretation, or dealer agreements, reach our corporate administration:
            </p>
            <div className="pt-2 space-y-2 border-t border-[#1F1F1F]">
              <a
                href="mailto:info@innmotek.com"
                className="flex items-center space-x-2 text-white hover:text-[#C5A880] transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-[#C5A880]" />
                <span>info@innmotek.com</span>
              </a>
              <a
                href="tel:+918081741031"
                className="flex items-center space-x-2 text-white hover:text-[#C5A880] transition-colors"
              >
                <PhoneCall className="h-3.5 w-3.5 text-[#C5A880]" />
                <span>+91 808 1741031 (India HQ)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Document Content Reader (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl border border-[#222222] bg-[#121212] p-8 sm:p-12 shadow-2xl space-y-6">
          <SafeHtml
            className="text-xs sm:text-sm text-neutral-300 leading-relaxed prose prose-invert max-w-none [&>h1]:text-2xl [&>h1]:text-white [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:text-white [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-base [&>h3]:text-[#C5A880] [&>h3]:font-semibold [&>h3]:mt-4 [&>h3]:mb-2 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul>li]:mb-1.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>strong]:text-white [&>a]:text-[#C5A880] [&>a]:underline"
            html={rawBody}
          />
        </div>
      </div>
    </div>
  );
}
