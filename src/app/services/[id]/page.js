/**
 * Innmotek Frontend - Service Detail Page (/services/:id)
 * 
 * Replaces old CRA Service Detail:
 *   Innmotek-frontend-OLD/src/frontend/services/serviceDetail.js
 * 
 * Features:
 *   - Pattern 1: Subpage Hero with breadcrumbs
 *   - Pattern 5: Two-column narrative & technical scope
 */

import Link from 'next/link';
import Image from 'next/image';
import SafeHtml from '@/components/common/safe-html';
import { getServiceDetail, getServices } from '@/lib/api';
import { ChevronRight, Wrench, ShieldCheck, ArrowRight, PhoneCall, Sparkles, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';

export const revalidate = 30;

export default async function ServiceDetailPage({ params }) {
  const serviceSlug = params.id;
  const service = await getServiceDetail(serviceSlug);

  if (!service) {
    notFound();
  }

  const allServices = await getServices();

  return (
    <div className="space-y-16 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Subpage Hero */}
      <div className="rounded-3xl border border-[#222222] bg-gradient-to-b from-[#161616] to-[#0E0E0E] p-8 sm:p-14 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

        <nav className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-neutral-600" />
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <ChevronRight className="h-3 w-3 text-neutral-600" />
          <span className="text-[#C5A880] font-bold truncate max-w-xs">{service.title}</span>
        </nav>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
              Lifecycle Capability
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
            {service.title}
          </h1>

          {service.summary && (
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {service.summary}
            </p>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-10">
          {service.image && (
            <div className="relative h-[340px] sm:h-[460px] w-full rounded-3xl border border-[#222222] overflow-hidden bg-[#141414] shadow-2xl">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          )}

          <div className="rounded-3xl border border-[#222222] bg-[#121212] p-8 sm:p-12 space-y-6 shadow-xl">
            <h2 className="text-xl font-bold text-white font-display border-b border-[#222222] pb-4">
              Scope of Engineering & Execution
            </h2>
            <SafeHtml
              className="text-xs sm:text-sm text-neutral-300 leading-relaxed prose prose-invert max-w-none [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul>li]:mb-1 [&>strong]:text-white"
              html={service.description || '<p>Detailed scope and specifications coming soon.</p>'}
            />
          </div>

          <div className="rounded-3xl border border-[#C5A880]/30 bg-gradient-to-r from-[#141414] via-[#1A1815] to-[#141414] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white">
                Request Service Engagement
              </h3>
              <p className="text-xs text-neutral-400">
                Direct coordination with Innmotek certified field technicians and thermal sizing engineers.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 rounded-xl bg-[#C5A880] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:bg-[#D4B890] transition-colors shrink-0 shadow-lg"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="rounded-3xl border border-[#222222] bg-[#121212] p-6 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2 border-b border-[#222222] pb-3">
              <Wrench className="h-4 w-4 text-[#C5A880]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                All Engineering Services
              </h3>
            </div>

            <div className="space-y-2">
              {allServices.map((srv) => (
                <Link
                  key={srv.slug}
                  href={`/services/${srv.slug}`}
                  className={`block rounded-xl p-3 text-xs font-bold transition-all ${
                    srv.slug === service.slug
                      ? 'bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30'
                      : 'text-neutral-300 hover:bg-[#181818] hover:text-white border border-transparent'
                  }`}
                >
                  {srv.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
