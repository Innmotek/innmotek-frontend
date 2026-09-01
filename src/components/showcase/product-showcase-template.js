/**
 * Innmotek Frontend - Unified Product Showcase Template Component
 * 
 * Replaces 11 separate legacy hardcoded pages:
 *   PoolSpaCover, PoolPump, RoboticPoolCleaner, Dehumidifier,
 *   StainlessWaterTank, StainlessPanelTank, SolarCollector,
 *   SolarThermosyphon, Radiator, GlassLinedTank, HeatPumpAirDryer
 * 
 * Design Standards:
 *   - Pattern 1: Cinematic Hero with badge, metric callouts & sizing CTA
 *   - Pattern 2: Dynamic Feature Highlights (Inverter COP, Materials, Anti-corrosion)
 *   - Pattern 3: Alternating 2-Column Deep-Dive Sections (Media + Engineering Notes)
 *   - Pattern 4: Equipment Catalogue Grid from real backend API (/api/products/:slug)
 *   - Pattern 6: Technical Specifications Matrix & Engineering Support Fallback
 *   - Application Sectors & Direct Consultation Lead Box
 */

import Link from 'next/link';
import Image from 'next/image';
import SafeHtml from '@/components/common/safe-html';
import {
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Shield,
  Layers,
  ChevronRight,
  Info,
  Sliders,
  Settings,
  Building2,
  FileCheck2,
  Flame,
  Zap,
  Gauge
} from 'lucide-react';

export default function ProductShowcaseTemplate({
  badge = 'Thermal System Solution',
  title,
  subtitle,
  description,
  heroImage,
  stats = [],
  highlights = [],
  deepDives = [],
  specifications = [],
  applications = [],
  categoryProducts = [],
  categorySlug,
  ctaText = 'Request Sizing & Pricing'
}) {
  return (
    <div className="space-y-20 pb-24">
      {/* =========================================================================
          1. CINEMATIC FULL-BLEED HERO (PATTERN 1)
          ========================================================================= */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center pt-28 pb-16 overflow-hidden border-b border-[#222222]">
        {/* Full-Bleed Background Media with Vignette */}
        {heroImage ? (
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover object-center"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/75 to-[#0A0A0A]/40" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A0A0A]/40 to-[#0A0A0A]/90" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-[#0E0E0E]" />
        )}

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/40 bg-[#0A0A0A]/80 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#C5A880]">
              {badge}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display max-w-4xl mx-auto leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm sm:text-base text-[#C5A880] font-semibold max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}

          {/* Metric / Stat Callouts */}
          {stats.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#2B2B2B] bg-[#121212]/80 backdrop-blur-md px-5 py-3 text-center min-w-[120px]"
                >
                  <div className="text-xl sm:text-2xl font-bold text-[#C5A880] font-display">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-[#C5A880] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:bg-[#D4B890] transition-all shadow-lg shadow-[#C5A880]/20"
            >
              <span>{ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="tel:+918081741031"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-[#333333] bg-[#141414]/90 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white hover:border-[#C5A880] transition-colors backdrop-blur-md"
            >
              <PhoneCall className="h-4 w-4 text-[#C5A880]" />
              <span>Talk to an Engineer</span>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* =========================================================================
            2. HIGHLIGHTS & KEY VALUE PROPOSITIONS
            ========================================================================= */}
        {highlights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-[#222222] bg-[#121212] p-8 space-y-3 hover:border-[#C5A880]/50 transition-all shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C5A880]/15 text-[#C5A880]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white font-display">{item.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* =========================================================================
            3. ALTERNATING 2-COLUMN DEEP-DIVE SECTIONS
            ========================================================================= */}
        {deepDives.length > 0 && (
          <div className="space-y-16">
            {deepDives.map((sec, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-[#222222] bg-[#121212] p-8 sm:p-12 overflow-hidden shadow-xl"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    {/* Visual Media (6 cols) */}
                    <div className={`lg:col-span-6 relative h-[280px] sm:h-[360px] rounded-2xl overflow-hidden border border-[#2B2B2B] bg-[#181818] ${isEven ? '' : 'lg:order-2'}`}>
                      {sec.image ? (
                        <Image
                          src={sec.image}
                          alt={sec.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-neutral-700">
                          <Layers className="h-12 w-12" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                    </div>

                    {/* Text & Bullets (6 cols) */}
                    <div className={`lg:col-span-6 space-y-4 ${isEven ? '' : 'lg:order-1'}`}>
                      {sec.tag && (
                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
                          {sec.tag}
                        </span>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                        {sec.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {sec.content}
                      </p>

                      {sec.bullets && sec.bullets.length > 0 && (
                        <div className="space-y-2.5 pt-2">
                          {sec.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-start space-x-2.5 text-xs text-neutral-300">
                              <CheckCircle2 className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            4. TECHNICAL SPECIFICATIONS MATRIX (PATTERN 6)
            ========================================================================= */}
        {specifications.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                  Engineering Matrix
                </span>
                <h2 className="text-xl font-bold text-white font-display">
                  Technical Specifications & Parameters
                </h2>
              </div>
            </div>

            <div className="rounded-3xl border border-[#222222] bg-[#121212] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#222222] bg-[#161616] text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Engineering Parameter</th>
                      <th className="px-6 py-4">Specification / Value</th>
                      <th className="px-6 py-4">Notes / Standard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1F1F] text-neutral-300">
                    {specifications.map((spec, sIdx) => (
                      <tr key={sIdx} className="hover:bg-[#161616]/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-white">{spec.param}</td>
                        <td className="px-6 py-4 font-mono text-[#C5A880]">{spec.value}</td>
                        <td className="px-6 py-4 text-neutral-400">{spec.note || 'Factory Standard'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Graceful Fallback Card when no static spec matrix provided */
          <div className="rounded-3xl border border-[#222222] bg-[#121212] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-2xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880] shrink-0 mt-1">
                <Info className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Technical Engineering Sizing & Submittals
                </h3>
                <p className="text-xs text-neutral-400 max-w-xl">
                  Custom dimensional CAD drawings, flow rate schematics, COP curves, and electrical diagrams are generated tailored to your site parameters.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 rounded-xl bg-[#1F1F1F] hover:bg-[#C5A880] border border-[#333333] hover:border-[#C5A880] px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-[#0A0A0A] transition-all shrink-0"
            >
              <span>Request Technical Specs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* =========================================================================
            5. APPLICATION SECTORS & DEPLOYMENT ENVIRONMENTS
            ========================================================================= */}
        {applications.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-[#222222] pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                Target Environments
              </span>
              <h2 className="text-xl font-bold text-white font-display">
                Recommended Applications & Sectors
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {applications.map((app, aIdx) => (
                <div
                  key={aIdx}
                  className="rounded-2xl border border-[#222222] bg-[#121212] p-6 space-y-2 hover:border-[#C5A880]/40 transition-all shadow-md"
                >
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-[#C5A880]" />
                    <h3 className="text-sm font-bold text-white">{app.title}</h3>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">{app.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            6. DYNAMIC EQUIPMENT CATALOGUE FROM REAL BACKEND (PATTERN 4)
            ========================================================================= */}
        {categoryProducts && categoryProducts.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                  Available Models
                </span>
                <h2 className="text-xl font-bold text-white font-display">
                  System Models in this Series
                </h2>
              </div>
              {categorySlug && (
                <Link
                  href={`/category/${categorySlug}`}
                  className="text-xs font-bold uppercase tracking-wider text-[#C5A880] hover:text-[#D4B890] flex items-center space-x-1"
                >
                  <span>View All in Category</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((prod) => (
                <div
                  key={prod.slug || prod.id}
                  className="group rounded-2xl border border-[#222222] bg-[#121212] overflow-hidden flex flex-col justify-between hover:border-[#C5A880] transition-all shadow-xl"
                >
                  <div className="relative h-56 w-full bg-[#161616] overflow-hidden">
                    {prod.image ? (
                      <Image
                        src={prod.image}
                        alt={prod.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-neutral-700">
                        <Layers className="h-10 w-10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                  </div>

                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-[#C5A880] transition-colors">
                        {prod.title}
                      </h3>
                      {prod.summary && (
                        <SafeHtml
                          className="text-xs text-neutral-400 line-clamp-2 mt-1.5"
                          html={prod.summary}
                        />
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#1C1C1C]">
                      <Link
                        href={`/products/${prod.slug}`}
                        className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#C5A880] group-hover:text-[#D4B890]"
                      >
                        <span>Full Specifications</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            7. INQUIRY & ENGINEERING CONSULTATION BANNER
            ========================================================================= */}
        <div className="rounded-3xl border border-[#C5A880]/30 bg-gradient-to-r from-[#141414] via-[#1A1815] to-[#141414] p-10 sm:p-14 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
              Ready to Integrate {title}?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300">
              Submit your architectural requirements or schedule a consultation with our mechanical engineers for customized sizing and layout schematics.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 rounded-xl bg-[#C5A880] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:bg-[#D4B890] transition-all shadow-lg"
            >
              <span>{ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+918081741031"
              className="inline-flex items-center space-x-2 rounded-xl border border-[#333333] bg-[#141414] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:border-[#C5A880]"
            >
              <span>Direct Line: +91 808 1741031</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
