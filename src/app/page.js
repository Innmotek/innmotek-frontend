/**
 * Innmotek Frontend - Homepage (/)
 * 
 * Design Reference:
 *   Thermatec-inspired dark luxury aesthetics (DESIGN_SPEC.md)
 *   - Pattern 1: Cinematic Full-Bleed Hero with real banner/product visual & vignette
 *   - Pattern 4: Photo-First Category Grid with bottom gold label bars
 *   - Pattern 4: Featured Equipment Grid with Real Quick-Spec Badges
 *   - Dedicated Educational Block: What is Aerothermal Technology? (1kW In -> 4kW Out)
 *   - Pattern 5: 2-Column Engineering Teaser
 *   - Section: Latest Technical Insights & Blog Grid (Top 3 Articles from /api/blogs)
 *   - Section: Newsletter Subscriber Box
 *   - Section: Testimonials strip with real names and ratings
 */

import Link from 'next/link';
import Image from 'next/image';
import {
  getBanners,
  getCategories,
  getFeaturedProducts,
  getTestimonials,
  getBrands,
  getBlogs
} from '@/lib/api';
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Layers,
  Star,
  CheckCircle2,
  ChevronRight,
  Flame,
  Gauge,
  Sparkles,
  BookOpen,
  Calendar,
  Mail,
  Send,
  ThermometerSnowflake,
  Activity,
  Wind
} from 'lucide-react';
import ProductCard from '@/components/common/product-card';
import NewsletterBox from '@/components/common/newsletter-box';

export const revalidate = 30;

export default async function HomePage() {
  const [banners, categories, featured, testimonials, brands, blogs] = await Promise.all([
    getBanners(),
    getCategories(),
    getFeaturedProducts(),
    getTestimonials(),
    getBrands(),
    getBlogs()
  ]);

  // Pick the real active heat pump banner from API
  const heroBanner = banners.find(b => b.title?.toLowerCase().includes('heat pump') && b.image) || banners[0];
  const heroImageUrl = heroBanner?.image || 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/8ef14c3d-2c71-4928-9edd-fc2ea700199a.webp';

  // Top 3 blogs
  const latestBlogs = blogs.slice(0, 3);

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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/#categories"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-[#C5A880] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:bg-[#D4B890] transition-all shadow-xl shadow-[#C5A880]/20 group"
            >
              <span>Explore Equipment</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-[#333333] bg-[#0A0A0A]/80 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md hover:border-[#C5A880] transition-all"
            >
              <span>Request Sizing Assessment</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: PHOTO-FIRST CATEGORY GRID (Pattern 4)
          ========================================================================= */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222222] pb-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
              Equipment Taxonomy
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Engineered Thermal Solutions
            </h2>
          </div>
          <Link
            href="/category"
            className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-[#C5A880] hover:text-[#D4B890] transition-colors"
          >
            <span>View Full Taxonomy</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => {
            const catImage = c.image || 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/9a01b0f1-4db5-45cf-a3fe-8924b1a45749.webp';
            const catHref = `/category/${c.slug}`;

            return (
              <Link
                key={c.id || c.slug}
                href={catHref}
                className="group relative h-80 rounded-3xl border border-[#222222] bg-[#121212] overflow-hidden transition-all duration-500 hover:border-[#C5A880] shadow-xl hover:shadow-[0_10px_30px_-10px_rgba(197,168,128,0.2)] flex flex-col justify-end"
              >
                {/* Background Image */}
                <Image
                  src={catImage}
                  alt={c.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  unoptimized
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

                {/* Pinned Bottom Label Bar */}
                <div className="relative z-10 p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#C5A880] transition-colors line-clamp-1">
                      {c.title}
                    </h3>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white group-hover:bg-[#C5A880] group-hover:text-[#0A0A0A] transition-all">
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 line-clamp-1">
                    {c.subCategory && c.subCategory.length > 0
                      ? `${c.subCategory.length} sub-specialties available`
                      : 'Commercial & Residential Systems'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FEATURED EQUIPMENT GRID WITH QUICK-SPEC BADGES
          ========================================================================= */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222222] pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
                Flagship Systems
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display">
                Featured Equipment
              </h2>
            </div>
            <Link
              href="/category"
              className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-[#C5A880] hover:text-[#D4B890] transition-colors"
            >
              <span>Browse All Models</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featured.slice(0, 6).map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 4: DEDICATED EDUCATIONAL BLOCK - WHAT IS AEROTHERMAL TECHNOLOGY?
          (1kW In -> Up to 4.5kW Out Explainer Diagram)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#2B2B2B] bg-[#111111] p-8 sm:p-14 space-y-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#C5A880]/5 blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/40 bg-[#0A0A0A] px-3.5 py-1">
              <Flame className="h-3.5 w-3.5 text-[#C5A880]" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
                Thermodynamic Innovation
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display">
              What is Aerothermal Technology?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Aerothermal heat pumps extract free thermal energy present in ambient outdoor air—even in freezing Himalayan temperatures—and amplify it to produce high-grade heating with up to 75% less electricity than conventional systems.
            </p>
          </div>

          {/* 3-Step Thermodynamic Energy Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1: Input */}
            <div className="rounded-2xl border border-[#222222] bg-[#161616] p-6 space-y-4 relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C5A880]/15 text-[#C5A880]">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">Step 01 • Electrical Input</span>
                <h3 className="text-lg font-bold text-white mt-1">1 kW Electrical Power</h3>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Powers the high-efficiency DC inverter compressor to circulate eco-friendly refrigerant through the thermodynamic cycle.
              </p>
              <div className="pt-2 text-[11px] font-mono text-neutral-500">
                25% of Total Energy Used
              </div>
            </div>

            {/* Step 2: Renewable Harvest */}
            <div className="rounded-2xl border border-[#222222] bg-[#161616] p-6 space-y-4 relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                <Wind className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Step 02 • Ambient Harvest</span>
                <h3 className="text-lg font-bold text-white mt-1">+ 3.5 kW Free Air Energy</h3>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Absorbed directly from outside atmospheric air via the multi-path evaporator coil, active down to -25°C sub-zero ambient.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-400 font-semibold">
                75% Renewable Energy Free
              </div>
            </div>

            {/* Step 3: High-Grade Output */}
            <div className="rounded-2xl border border-[#C5A880]/40 bg-[#1A1815] p-6 space-y-4 relative shadow-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C5A880] text-[#0A0A0A]">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">Step 03 • Thermal Output</span>
                <h3 className="text-lg font-bold text-white mt-1">= Up to 4.5 kW Heat Output</h3>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Delivered straight into hot water storage, space hydronics, or pool heating loops at high COP seasonal efficiency.
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#C5A880] font-bold">
                COP 4.5 Efficiency Ratio
              </div>
            </div>
          </div>

          {/* 4 Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#222222] text-xs">
            <div className="flex items-center space-x-2 text-neutral-300">
              <CheckCircle2 className="h-4 w-4 text-[#C5A880] shrink-0" />
              <span>Up to 75% Power Savings</span>
            </div>
            <div className="flex items-center space-x-2 text-neutral-300">
              <ThermometerSnowflake className="h-4 w-4 text-[#C5A880] shrink-0" />
              <span>-25°C Sub-Zero Heating</span>
            </div>
            <div className="flex items-center space-x-2 text-neutral-300">
              <ShieldCheck className="h-4 w-4 text-[#C5A880] shrink-0" />
              <span>Zero On-Site Emissions</span>
            </div>
            <div className="flex items-center space-x-2 text-neutral-300">
              <Activity className="h-4 w-4 text-[#C5A880] shrink-0" />
              <span>&lt; 45 dB(A) Quiet Noise</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: ENGINEERING TEASER (Pattern 5: 2-Column Split)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#222222] bg-[#121212] p-8 sm:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/40 bg-[#0A0A0A] px-3.5 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[#C5A880]" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
                  German Engineering Standard
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display leading-tight">
                Engineered for Himalayan Altitudes & Extreme Climates
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Standard heat pumps fail when outdoor ambient drops below freezing. Innmotek systems are precision-engineered with enhanced vapor injection (EVI) compressors, anti-freeze evaporator matrices, and titanium heat exchangers to ensure continuous thermal delivery in Kathmandu, the high Himalayas, and harsh regional environments.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Full-DC Inverter Variable Speed Control',
                  'High Seasonal COP up to 4.5',
                  'Sub-Zero Operation Down to -25°C',
                  'Duplex Titanium & SS316L Exchangers'
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
          SECTION 6: LATEST TECHNICAL INSIGHTS & BLOGS (Top 3 from /api/blogs)
          ========================================================================= */}
      {latestBlogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222222] pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
                Knowledge & Analysis
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display">
                Latest Technical Insights
              </h2>
            </div>
            <Link
              href="/blogs"
              className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-[#C5A880] hover:text-[#D4B890] transition-colors"
            >
              <span>Explore All Articles</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {latestBlogs.map((blog) => {
              const blogImage = blog.image || 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/blogs/8cba50ef-bbd0-40e1-8848-35687fe48d0b.webp';
              const blogDate = blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Technical Briefing';

              return (
                <article
                  key={blog.id || blog.slug}
                  className="group relative flex flex-col justify-between rounded-3xl border border-[#222222] bg-[#121212] overflow-hidden transition-all duration-300 hover:border-[#C5A880] shadow-xl hover:shadow-[0_10px_30px_-10px_rgba(197,168,128,0.15)]"
                >
                  <div className="relative h-56 w-full bg-[#181818] overflow-hidden">
                    <Image
                      src={blogImage}
                      alt={blog.title}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center space-x-1 rounded-full border border-white/15 bg-black/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-300 backdrop-blur-md">
                        <Calendar className="h-3 w-3 text-[#C5A880]" />
                        <span>{blogDate}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <h3 className="text-base font-bold text-white group-hover:text-[#C5A880] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                        {blog.summary || blog.meta_description || 'In-depth engineering analysis on heat pump efficiency, thermodynamic sizing, and sustainable thermal infrastructure.'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#1F1F1F]">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#C5A880] group-hover:text-[#D4B890] transition-colors"
                      >
                        <span>Read Technical Article</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 7: NEWSLETTER SUBSCRIBER BOX
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterBox />
      </section>

      {/* =========================================================================
          SECTION 8: TESTIMONIALS STRIP (Preserved - hidden on Home to match legacy behavior)
          ========================================================================= */}
      {/* 
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
      */}

      {/* =========================================================================
          SECTION 9: BOTTOM CALL-TO-ACTION (Pattern 1 variant)
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
