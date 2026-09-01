/**
 * Innmotek Frontend - Homepage (/)
 * 
 * Replaces old CRA Home:
 *   Innmotek-frontend-OLD/src/frontend/home/index.js
 * 
 * Design Reference:
 *   Thermatec-inspired dark luxury aesthetics (DESIGN_SPEC.md)
 *   - Pattern 1: Cinematic Full-Bleed Hero with real banner/product visual & vignette
 *   - Pattern 4: Photo-First Category Grid with bottom gold label bars
 *   - Pattern 5: 2-Column Engineering Teaser
 *   - Testimonials strip with real names and ratings
 */

import Link from 'next/link';
import Image from 'next/image';
import {
  getBanners,
  getCategories,
  getFeaturedProducts,
  getTestimonials,
  getBrands
} from '@/lib/api';
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Award,
  Layers,
  Star,
  CheckCircle2,
  ChevronRight,
  Flame,
  Gauge,
  Sparkles
} from 'lucide-react';

export const revalidate = 30;

export default async function HomePage() {
  const [banners, categories, featured, testimonials, brands] = await Promise.all([
    getBanners(),
    getCategories(),
    getFeaturedProducts(),
    getTestimonials(),
    getBrands()
  ]);

  // Pick the real active heat pump banner from API
  const heroBanner = banners.find(b => b.title?.toLowerCase().includes('heat pump') && b.image) || banners[0];
  const heroImageUrl = heroBanner?.image || 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/8ef14c3d-2c71-4928-9edd-fc2ea700199a.webp';

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* =========================================================================
          SECTION 1: HERO (Pattern 1: Cinematic Full-Bleed Hero)
          ========================================================================= */}
      <section className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Full-Bleed Background Visual with Cinematic Dark Vignette */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={heroImageUrl}
            alt="Innmotek Thermal Engineering"
            fill
            className="object-cover object-center scale-100"
            priority
            unoptimized
          />
          {/* Gradient Vignette matching DESIGN_SPEC.md Pattern 1 */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, #0A0A0A 8%, rgba(10, 10, 10, 0.45) 55%, rgba(10, 10, 10, 0.85) 100%)'
            }}
          />
          {/* Radial center vignette to enhance text contrast */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0A0A]/40 to-[#0A0A0A]/95" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 animate-fadeIn">
          {/* Engineering Badge */}
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/50 bg-[#0A0A0A]/80 px-4 py-1.5 backdrop-blur-md shadow-lg">
            <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#C5A880]">
              Advanced Thermal Engineering & Heat Pumps
            </span>
          </div>

          {/* Display Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-display drop-shadow-md">
            SUSTAINABLE THERMAL <br />
            <span className="gold-gradient-text">PERFORMANCE</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-200 font-normal leading-relaxed drop-shadow">
            Pioneering ultra-low energy heat pumps, aerothermal heating, and clean thermal storage engineered for Himalayan climates and commercial applications.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="#categories"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-[#C5A880] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] transition-all hover:bg-[#D4B890] shadow-xl shadow-[#C5A880]/25 group"
            >
              <span>Explore Solutions</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-[#333333] bg-[#141414]/90 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-[#C5A880] hover:bg-[#1C1C1C] backdrop-blur-md"
            >
              <span>Request System Sizing</span>
            </Link>
          </div>

          {/* Metric Highlights */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="rounded-xl border border-[#262626] bg-[#121212]/90 p-4 backdrop-blur-md shadow-xl">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">Efficiency</p>
              <p className="text-xl sm:text-2xl font-black text-white mt-1">COP &gt; 4.2</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">75% Energy Reduction</p>
            </div>

            <div className="rounded-xl border border-[#262626] bg-[#121212]/90 p-4 backdrop-blur-md shadow-xl">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">Operation</p>
              <p className="text-xl sm:text-2xl font-black text-white mt-1">-25°C to 45°C</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">All-Weather Reliability</p>
            </div>

            <div className="rounded-xl border border-[#262626] bg-[#121212]/90 p-4 backdrop-blur-md shadow-xl">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">Refrigerant</p>
              <p className="text-xl sm:text-2xl font-black text-white mt-1">R290 / R32</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Eco-Friendly Low GWP</p>
            </div>

            <div className="rounded-xl border border-[#262626] bg-[#121212]/90 p-4 backdrop-blur-md shadow-xl">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">Warranty</p>
              <p className="text-xl sm:text-2xl font-black text-white mt-1">5+ Years</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Direct Factory Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CATEGORY EXPLORER (Pattern 4: Photo-First Grid)
          ========================================================================= */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#222222] pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
                Engineering Product Catalogue
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1 font-display">
              Thermal Equipment Categories
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-md">
            Engineered for luxury residential, boutique hotels, commercial complexes, and industrial process heating.
          </p>
        </div>

        {/* 3-Column Architectural Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((cat) => (
            <div
              key={cat.id || cat.title}
              className="group relative flex flex-col justify-end h-[380px] sm:h-[420px] rounded-2xl border border-[#222222] overflow-hidden bg-[#121212] transition-all duration-300 hover:border-[#C5A880] shadow-xl"
            >
              {/* Product Category Photo Background */}
              <div className="absolute inset-0 z-0">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-75 group-hover:opacity-90"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#161616] text-neutral-700">
                    <Layers className="h-12 w-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
              </div>

              {/* Floating Top Badge */}
              <div className="relative z-10 p-5 self-start">
                <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-300 border border-white/10">
                  {cat.parent_title ? `${cat.parent_title}` : 'Thermal System'}
                </span>
              </div>

              {/* Thermatec Signature Pinned Gold Bar */}
              <div className="relative z-10 bg-[#C5A880] p-4.5 transition-all duration-300 group-hover:bg-[#D4B890]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wide">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-[#242424] font-medium mt-0.5">
                      {cat.summary || 'High-efficiency thermal units'}
                    </p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A0A0A] text-[#C5A880] transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: ABOUT TEASER (Pattern 5: Alternating 2-Column Split)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#222222] bg-[#121212] p-8 sm:p-14 overflow-hidden relative shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Narrative */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[#C5A880]" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
                  Why Choose Innmotek
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display">
                Engineering Clean Energy for Tomorrow
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Innmotek is committed to replacing carbon-heavy fossil fuel boilers and outdated resistive heating with state-of-the-art heat pump technology and solar thermal integration.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Advanced inverter compressors with micro-channel heat exchangers',
                  'Vitreous enamel glass-lined and SUS316 duplex stainless tanks',
                  'Optimized for extreme Himalayan sub-zero operations down to -25°C',
                  'Complete design, CFD analysis, installation, and after-sales warranty',
                ].map((point, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-300 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#C5A880] hover:text-[#D4B890] group"
                >
                  <span>Read our engineering story</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Visual Box */}
            <div className="relative h-[340px] sm:h-[420px] rounded-2xl border border-[#2B2B2B] overflow-hidden bg-[#181818]">
              <Image
                src="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/products/3e12ee32-093e-43f5-87ab-d90b53a3f6bc.webp"
                alt="Innmotek Heating Systems"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md">
                <p className="text-xs font-bold text-white uppercase tracking-wider">High COP Heat Pump Architecture</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">Delivers 4kW thermal heat for every 1kW electrical input.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: TESTIMONIALS STRIP (With Real Names from Database)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
            Client Endorsements
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Trusted by Commercial Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => {
            const displayName = t.name || t.full_name || 'Client';
            const displayCompany = t.company || t.company_name || '';
            const displayPosition = t.position || '';

            return (
              <div
                key={t.id || idx}
                className="rounded-2xl border border-[#222222] bg-[#121212] p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed italic">
                    &ldquo;{t.message}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1C1C1C] flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-full bg-[#1C1C1C] border border-[#2B2B2B] flex items-center justify-center text-[#C5A880] font-bold text-xs">
                    {displayName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{displayName}</p>
                    <p className="text-[10px] text-neutral-500">
                      {displayPosition ? `${displayPosition} • ` : ''}{displayCompany}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: BOTTOM CALL-TO-ACTION (Pattern 1 variant)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#C5A880]/30 bg-gradient-to-r from-[#141414] via-[#1A1815] to-[#141414] p-10 sm:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Ready to Upgrade to High-COP Thermal Technology?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300">
              Speak with an Innmotek thermal engineer today for a free sizing assessment, COP calculation, and payback period breakdown.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 relative z-10">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 rounded-xl bg-[#C5A880] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:bg-[#D4B890] transition-all shadow-lg"
            >
              <span>Schedule Engineering Consultation</span>
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
      </section>
    </div>
  );
}
