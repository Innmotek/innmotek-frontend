'use client';

/**
 * Innmotek Frontend - Master Client Review Hub (/demo)
 * 
 * Comprehensive Staging Architecture:
 * 1. SECTION 1 (PERMANENT TOP): Present Live Layout (Exactly as on production: hero + capsules + 0 models fallback).
 * 2. SECTION 2 (PROPOSED OPTIONS): Dedicated interactive switcher for all proposed navigation patterns:
 *    - Option 1: Editorial Number Navigation (Clean & Minimalist with Hero Unit)
 *    - Option 2: Horizontal Tab Navigation (Premium Underlined Switcher)
 *    - Option 3: Photo Scene Cards (Visual + Clickable with Scene Photos & Round Arrow)
 *    - Option 4: Image Split Navigation (3 Immersive Full-Height Panels)
 *    - Option 5: Vertical List / Accordion (Drawer List + Hardware Visual)
 *    - Option 6: Category + Models Preview (Hybrid with Mini Equipment Previews)
 *    - Option 7: Visual Department Cards & Grid (Rich model counts, COP badges, specs)
 * 3. SECTION 3: Issue #1 Solution Review (Omni-Directional Dark Vignette Blend Comparison).
 * 4. SECTION 4: Master Design Spec Sheet Reference Modal.
 */

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  Eye,
  SlidersHorizontal,
  LayoutGrid,
  Bookmark,
  Layers,
  Info
} from 'lucide-react';

const CATEGORY_DATA = {
  title: 'Hot Water Heat Pump',
  slug: 'hot-water-heat-pump',
  description:
    'Explore our high-performance Hot Water Heat Pump models engineered for high thermodynamic efficiency, low running cost, and long-term durability in extreme climates.',
  subCategories: [
    {
      id: 'residential',
      num: '01',
      title: 'Residential Heat Pump',
      slug: 'residential',
      count: 4,
      subtitle: 'Efficient & reliable solutions for homes',
      scope: 'Homes | Villas | Apartments | Small Facilities',
      tagline: '190L – 300L Compact Split & All-In-One Units',
      highlights: 'Up to 4.2 COP • Whisper Quiet 42dB • Smart Touch Display',
      sceneImage: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-1.webp',
      models: [
        { name: 'Split Heat Pump', code: 'IMHW-0132-S', img: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-1.webp' },
        { name: 'All in One 190L', code: 'IMHW-0076-S', img: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-2.webp' },
        { name: 'Combo Heating DHW', code: 'IMHW-0300', img: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-3.webp' }
      ]
    },
    {
      id: 'commercial',
      num: '02',
      title: 'Commercial Heat Pump',
      slug: 'commercial',
      count: 3,
      subtitle: 'Scalable systems for commercial spaces',
      scope: 'Hotels | Hospitals | Institutions | Large Facilities',
      tagline: 'High-Volume Central Heating for Hotels & Resorts',
      highlights: 'Modular Cascade • 75°C High-Temp • Dual Circuit Safety',
      sceneImage: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-2.webp',
      models: [
        { name: 'Central Cascade', code: 'IMHW-0500-C', img: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-2.webp' },
        { name: 'High-Temp 75°C', code: 'IMHW-0800-C', img: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-3.webp' },
        { name: 'Modular Unit', code: 'IMHW-1000-M', img: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-1.webp' }
      ]
    },
    {
      id: 'industrial',
      num: '03',
      title: 'Industrial Heat Pump',
      slug: 'industrial',
      count: 2,
      subtitle: 'High-capacity solutions for industrial applications',
      scope: 'Process Heating | Industrial Applications | High Capacity',
      tagline: 'Heavy-Duty Process Water & Industrial Drying',
      highlights: 'R290 Eco System • Heavy Duty Inverter • 24/7 Duty Cycle',
      sceneImage: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-3.webp',
      models: [
        { name: 'Ultra High-Temp', code: 'IMHW-1200-IND', img: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-4.webp' },
        { name: 'Air Dryer Kiln', code: 'IMAD-0500', img: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-1.webp' }
      ]
    }
  ],
  products: [
    {
      id: 'p1',
      subCategory: 'residential',
      subCategoryTitle: 'Residential Heat Pump',
      title: 'Split Heat Pump Water Heater : IMHW-0132-S',
      cop: '4.25 COP',
      fluid: 'R410A Eco',
      capacity: '190 - 300 Litres',
      summary: 'High-efficiency residential split unit with anti-corrosion condenser coil and rapid reheat cycle.',
      image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-1.webp'
    },
    {
      id: 'p2',
      subCategory: 'residential',
      subCategoryTitle: 'Residential Heat Pump',
      title: 'All in One 190 Litres Heat Pump : IMHW-0076-S',
      cop: '4.10 COP',
      fluid: 'R134a Fluid',
      capacity: '190 Litres',
      summary: 'Integrated tank and heat pump in a single sleek footprint for indoor or terrace utility rooms.',
      image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-2.webp'
    },
    {
      id: 'p3',
      subCategory: 'residential',
      subCategoryTitle: 'Residential Heat Pump',
      title: 'Residential Heating, Cooling & DHW System',
      cop: '4.35 COP',
      fluid: 'R32 Inverter',
      capacity: 'All-Weather Inverter',
      summary: 'Tri-generation thermal heat pump handling domestic hot water alongside radiant floor heating.',
      image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-3.webp'
    },
    {
      id: 'p4',
      subCategory: 'commercial',
      subCategoryTitle: 'Commercial Heat Pump',
      title: 'Commercial Central Heat Pump : IMHW-0500-C',
      cop: '4.40 COP',
      fluid: 'R410A Inverter',
      capacity: '500 - 2000 Litres',
      summary: 'Designed for boutique resorts and hospitals with multi-stage high-efficiency scroll compressors.',
      image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-2.webp'
    },
    {
      id: 'p5',
      subCategory: 'commercial',
      subCategoryTitle: 'Commercial Heat Pump',
      title: 'Commercial High-Temp Water Heater : IMHW-0800-C',
      cop: '4.20 COP',
      fluid: 'R134a High Temp',
      capacity: '800 Litres/hr',
      summary: 'Generates up to 75°C output temperature continuously with dual electronic expansion valves.',
      image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-3.webp'
    },
    {
      id: 'p6',
      subCategory: 'industrial',
      subCategoryTitle: 'Industrial Heat Pump',
      title: 'Industrial Ultra High-Temp Heat Pump : IMHW-1200-IND',
      cop: '4.00 COP',
      fluid: 'R290 Eco System',
      capacity: 'Continuous Flow Process',
      summary: 'Delivers process water up to 85°C with dual economizer circuits for manufacturing facilities.',
      image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-4.webp'
    }
  ]
};

export default function MasterDemoReviewPage() {
  const [activeProposedOption, setActiveProposedOption] = useState('opt_ambient'); // 'opt_ambient' | 'opt1' | 'opt2' | 'opt3' | 'opt4' | 'opt5' | 'opt6' | 'opt7'
  const [horizontalTab, setHorizontalTab] = useState('residential');
  const [openAccordion, setOpenAccordion] = useState('residential');
  const [activeCardLine, setActiveCardLine] = useState('residential');
  const [vignetteEnabled, setVignetteEnabled] = useState(true);
  const cardProducts = CATEGORY_DATA.products.filter(
    (p) => p.subCategory === activeCardLine
  );

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      {/* =========================================================================
          SLIM STICKY CLIENT CONTROL BAR
          ========================================================================= */}
      <div className="sticky top-[72px] z-30 bg-[#0E0E0E]/95 backdrop-blur-xl border-b border-[#252525] shadow-2xl py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 shrink-0">
            <span className="h-2 w-2 rounded-full bg-[#C5A880]" />
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-white font-mono">
                Architectural Lab
              </span>
              <span className="text-neutral-600 text-xs">•</span>
              <span className="text-xs text-[#C5A880] font-medium">
                Baseline vs Proposed Options Comparison
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-neutral-400">Jump To:</span>
            <a href="#present-baseline" className="text-neutral-300 hover:text-[#C5A880] underline font-mono text-[11px]">
              Present Baseline
            </a>
            <span className="text-neutral-600">•</span>
            <a href="#proposed-options" className="text-neutral-300 hover:text-[#C5A880] underline font-mono text-[11px]">
              Proposed Layouts
            </a>
            <span className="text-neutral-600">•</span>
            <a href="#vignette-preview" className="text-neutral-300 hover:text-[#C5A880] underline font-mono text-[11px]">
              Vignette Preview
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN PAGE CONTENT
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-32 space-y-20">

        {/* =======================================================================
            SECTION 1: PERMANENT PRESENT LIVE BASELINE (Always on Top)
            ======================================================================= */}
        <section id="present-baseline" className="space-y-8 scroll-mt-28">
          <div className="flex items-center justify-between border-b border-[#202020] pb-3">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-neutral-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
                Present Baseline (Current Live on Production Site)
              </span>
            </div>
            <span className="text-[11px] text-neutral-500 font-mono">
              Existing Production Behavior
            </span>
          </div>

          <div className="rounded-3xl border border-[#202020] bg-gradient-to-b from-[#141414] to-[#0A0A0A] p-8 sm:p-14 relative overflow-hidden shadow-2xl space-y-8">
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3 text-neutral-600" />
              <Link href="/category" className="hover:text-white transition-colors">Categories</Link>
              <ChevronRight className="h-3 w-3 text-neutral-600" />
              <span className="text-[#C5A880] font-bold">{CATEGORY_DATA.title}</span>
            </nav>

            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/40 bg-[#0A0A0A]/80 px-3 py-1">
                <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
                  Product Category
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
                {CATEGORY_DATA.title}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
                {CATEGORY_DATA.description}
              </p>
            </div>

            {/* Current Live Pill Capsules with Arrows */}
            <div className="pt-6 border-t border-[#1F1F1F] space-y-3 relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] font-mono">
                SUB-SPECIALTIES & PRODUCT LINES:
              </p>

              <div className="flex flex-wrap gap-3">
                {CATEGORY_DATA.subCategories.map((sub) => (
                  <div
                    key={sub.slug}
                    className="inline-flex items-center space-x-3 rounded-full border border-[#C5A880]/40 bg-gradient-to-r from-[#141414] to-[#1C1C1C] px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg hover:border-[#C5A880] transition-all cursor-pointer"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#C5A880]" />
                    <span>{sub.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#C5A880]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================================
            SECTION 2: PROPOSED ARCHITECTURAL OPTIONS (Dedicated Switcher Lab)
            ======================================================================= */}
        <section id="proposed-options" className="space-y-8 scroll-mt-28">
          
          <div className="rounded-3xl border border-[#252525] bg-[#0E0E0E] p-6 sm:p-10 space-y-10 shadow-2xl">
            
            {/* Header & Tab Switcher Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#1F1F1F]">
              <div className="space-y-1.5">
                <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#C5A880]">
                  <span>Proposed Navigation Options</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Select Option Below to Compare Proposed Designs
                </h2>
                <p className="text-xs text-neutral-400 max-w-xl">
                  Click between the options to see how each design transforms the subcategory presentation.
                </p>
              </div>

              {/* Clean Option Switcher Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 bg-[#141414] border border-[#282828] p-1.5 rounded-2xl overflow-x-auto">
                {[
                  { id: 'opt_ambient', label: '1. Ambient Numbered Grid' },
                  { id: 'opt1', label: '2. Editorial Numbers' },
                  { id: 'opt2', label: '3. Horizontal Tabs' },
                  { id: 'opt3', label: '4. Photo Scene Cards' },
                  { id: 'opt4', label: '5. Image Split' },
                  { id: 'opt5', label: '6. Vertical List' },
                  { id: 'opt6', label: '7. Models Hybrid' },
                  { id: 'opt7', label: '8. Department Cards + Grid' }
                ].map((tab) => {
                  const isActive = activeProposedOption === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveProposedOption(tab.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-[#C5A880] text-black font-extrabold shadow-md shadow-[#C5A880]/20 scale-[1.01]'
                          : 'text-neutral-400 hover:text-white hover:bg-[#1E1E1E]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* -------------------------------------------------------------------
                OPTION: AMBIENT NUMBERED GRID
                ------------------------------------------------------------------- */}
            {activeProposedOption === 'opt_ambient' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-[#C5A880] font-bold uppercase tracking-wider font-mono">
                    Option 1: Ambient Numbered Grid with Ghost Watermarks & Underglow Flares
                  </div>
                </div>

                <div className="rounded-3xl border border-[#202020] bg-gradient-to-b from-[#141414] via-[#101010] to-[#0A0A0A] p-8 sm:p-14 relative overflow-hidden shadow-2xl space-y-10">
                  {/* Ambient Warm Golden Glow Flare at Top Right Corner */}
                  <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-[#C5A880]/15 via-[#C5A880]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

                  {/* Breadcrumb Navigation */}
                  <nav className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <ChevronRight className="h-3 w-3 text-neutral-600" />
                    <Link href="/category" className="hover:text-white transition-colors">Categories</Link>
                    <ChevronRight className="h-3 w-3 text-neutral-600" />
                    <span className="text-[#C5A880] font-bold">{CATEGORY_DATA.title}</span>
                  </nav>

                  {/* Title & Description */}
                  <div className="max-w-3xl space-y-4 relative z-10">
                    <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/40 bg-[#0A0A0A]/80 px-3 py-1">
                      <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
                        Product Category
                      </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
                      {CATEGORY_DATA.title}
                    </h1>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
                      {CATEGORY_DATA.description}
                    </p>
                  </div>

                  {/* SUB-SPECIALTIES & PRODUCT LINES (EXACT SCREENSHOT REPLICA) */}
                  <div className="pt-8 border-t border-[#1F1F1F] space-y-6 relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] font-mono">
                      SUB-SPECIALTIES & PRODUCT LINES:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#242424]">
                      {CATEGORY_DATA.subCategories.map((sub, idx) => (
                        <div
                          key={sub.slug}
                          className={`group flex items-center justify-between py-6 md:py-4 cursor-pointer select-none transition-all duration-300 ${
                            idx === 0 ? 'md:pr-8' : idx === 1 ? 'md:px-8' : 'md:pl-8'
                          }`}
                        >
                          {/* Left: Giant Ghost Watermark Number with Warm Ambient Flare */}
                          <div className="relative shrink-0 pr-4">
                            <span className="text-6xl sm:text-7xl font-extrabold text-neutral-800/80 font-mono tracking-tighter group-hover:text-neutral-700 transition-colors select-none block">
                              {sub.num}
                            </span>
                            {/* Golden Underglow Flare Line Centered Under Digits */}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-[2px] bg-gradient-to-r from-transparent via-[#E2CFB4] to-transparent shadow-[0_0_14px_#C5A880]" />
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-[#C5A880]/35 blur-sm rounded-full pointer-events-none" />
                          </div>

                          {/* Right: Tag, Title, Dash Line, Circular Arrow */}
                          <div className="flex-1 space-y-2.5 pl-2">
                            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C5A880]">
                              {sub.id}
                            </div>

                            <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#C5A880] transition-colors leading-tight">
                              {sub.title.replace(/Heat Pump/i, '')} <br />
                              <span className="text-white">Heat Pump</span>
                            </h4>

                            {/* Golden Dash Indicator */}
                            <div className="w-8 h-[2px] bg-[#C5A880]" />

                            {/* Circular Luxury Arrow Button */}
                            <div className="pt-2">
                              <div className="h-10 w-10 rounded-full border border-[#C5A880]/60 bg-[#0E0E0E] flex items-center justify-center text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#0A0A0A] group-hover:scale-105 transition-all duration-300 shadow-md shadow-[#C5A880]/10">
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------------
                OPTION 1: EDITORIAL NUMBER NAVIGATION (CLEAN)
                ------------------------------------------------------------------- */}
            {activeProposedOption === 'opt1' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-xs text-[#C5A880] font-bold uppercase tracking-wider">
                  Option 1: Editorial Number Navigation (Clean & Minimalist)
                </div>

                <div className="rounded-3xl border border-[#202020] bg-gradient-to-r from-[#141414] via-[#101010] to-[#0A0A0A] p-8 sm:p-12 relative overflow-hidden shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Column: Title + Editorial Numbers */}
                    <div className="lg:col-span-7 space-y-8">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-[#C5A880] font-bold tracking-widest uppercase">
                          Product Category
                        </span>
                        <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display">
                          {CATEGORY_DATA.title}
                        </h3>
                        <p className="text-xs text-neutral-300 leading-relaxed max-w-xl">
                          {CATEGORY_DATA.description}
                        </p>
                      </div>

                      {/* Editorial Numbers Row */}
                      <div className="pt-6 border-t border-[#202020] grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {CATEGORY_DATA.subCategories.map((sub) => (
                          <div
                            key={sub.slug}
                            className="group cursor-pointer space-y-2 select-none"
                          >
                            <div className="text-2xl sm:text-3xl font-extrabold text-[#C5A880] font-mono tracking-tight flex items-baseline justify-between border-b border-[#C5A880]/50 pb-2">
                              <span>{sub.num}</span>
                              <ArrowRight className="h-4 w-4 text-[#C5A880] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </div>
                            <div className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#C5A880] transition-colors">
                              {sub.id}
                            </div>
                            <div className="text-[11px] text-neutral-400 font-medium">
                              {sub.title.replace(/Heat Pump/i, '')} Heat Pump
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Hero Visual */}
                    <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#2B2B2B] bg-[#121212]">
                      <Image
                        src="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-1.webp"
                        alt="Hero Visual"
                        fill
                        className="object-cover object-center"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------------
                OPTION 2: HORIZONTAL TAB NAVIGATION (PREMIUM)
                ------------------------------------------------------------------- */}
            {activeProposedOption === 'opt2' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-xs text-[#C5A880] font-bold uppercase tracking-wider">
                  Option 2: Horizontal Tab Navigation (Premium Underlined)
                </div>

                <div className="rounded-3xl border border-[#202020] bg-gradient-to-r from-[#141414] via-[#101010] to-[#0A0A0A] p-8 sm:p-12 relative overflow-hidden shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    <div className="lg:col-span-7 space-y-8">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-[#C5A880] font-bold tracking-widest uppercase">
                          Product Category
                        </span>
                        <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display">
                          {CATEGORY_DATA.title}
                        </h3>
                        <p className="text-xs text-neutral-300 leading-relaxed max-w-xl">
                          {CATEGORY_DATA.description}
                        </p>
                      </div>

                      {/* Underlined Tabs */}
                      <div className="pt-6 border-t border-[#202020]">
                        <div className="flex items-center space-x-8 border-b border-[#242424] pb-2">
                          {CATEGORY_DATA.subCategories.map((sub) => {
                            const isSelected = horizontalTab === sub.slug;
                            return (
                              <button
                                key={sub.slug}
                                type="button"
                                onClick={() => setHorizontalTab(sub.slug)}
                                className={`relative pb-3 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all cursor-pointer ${
                                  isSelected ? 'text-[#C5A880]' : 'text-neutral-400 hover:text-white'
                                }`}
                              >
                                <span>{sub.id}</span>
                                {isSelected && (
                                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A880] shadow-[0_0_12px_#C5A880]" />
                                )}
                              </button>
                            );
                          })}
                          <div className="ml-auto text-neutral-500 hover:text-[#C5A880] transition-colors cursor-pointer">
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>

                        <div className="pt-4 flex items-center justify-between text-xs text-neutral-300">
                          <span className="text-neutral-400">
                            {CATEGORY_DATA.subCategories.find((s) => s.slug === horizontalTab)?.tagline}
                          </span>
                          <span className="font-mono text-[#C5A880] font-bold">
                            {CATEGORY_DATA.subCategories.find((s) => s.slug === horizontalTab)?.count} Models Active
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#2B2B2B] bg-[#121212]">
                      <Image
                        src="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-2.webp"
                        alt="Hero Visual"
                        fill
                        className="object-cover object-center"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------------
                OPTION 3: PHOTO SCENE CARDS (VISUAL + CLICKABLE)
                ------------------------------------------------------------------- */}
            {activeProposedOption === 'opt3' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-[#C5A880] font-bold uppercase tracking-wider">
                    Option 3: Card Style with Scene Photos & Circular Arrow
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Matches Client Upload 2
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {CATEGORY_DATA.subCategories.map((sub) => (
                    <div
                      key={sub.slug}
                      className="group relative rounded-2xl border border-[#2B2B2B] bg-[#121212] hover:border-[#C5A880] p-6 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(197,168,128,0.18)] cursor-pointer overflow-hidden flex flex-col justify-between min-h-[220px]"
                    >
                      {/* Background Scene Image with Dark Blend */}
                      <div className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-500">
                        <Image
                          src={sub.sceneImage}
                          alt={sub.title}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-[#121212]/60" />
                      </div>

                      <div className="space-y-3 relative z-10">
                        {/* Number + Dash line */}
                        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-neutral-400">
                          <span className="text-white text-sm">{sub.num}</span>
                          <span className="w-8 h-[1px] bg-neutral-600" />
                        </div>

                        <h4 className="text-lg font-bold text-white group-hover:text-[#C5A880] transition-colors">
                          {sub.title}
                        </h4>

                        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                          {sub.subtitle}
                        </p>
                      </div>

                      {/* Circular Luxury Arrow Button */}
                      <div className="pt-4 relative z-10 flex items-center justify-start">
                        <div className="h-10 w-10 rounded-full border border-[#C5A880]/50 bg-[#0A0A0A]/60 flex items-center justify-center text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#0A0A0A] transition-all duration-300 shadow-md">
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------------
                OPTION 4: IMAGE SPLIT NAVIGATION (IMMERSIVE 3 PANELS)
                ------------------------------------------------------------------- */}
            {activeProposedOption === 'opt4' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-xs text-[#C5A880] font-bold uppercase tracking-wider">
                  Option 4: Immersive Image Split Navigation (Full-Bleed Panels)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-2xl overflow-hidden border border-[#2B2B2B] h-[360px] sm:h-[400px]">
                  {CATEGORY_DATA.subCategories.map((sub) => (
                    <div
                      key={sub.slug}
                      className="group relative h-full cursor-pointer overflow-hidden border-r last:border-r-0 border-[#222] flex flex-col justify-end p-8 transition-all duration-500"
                    >
                      <Image
                        src={sub.sceneImage}
                        alt={sub.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                      <div className="relative z-10 space-y-2">
                        <div className="text-[11px] font-bold uppercase tracking-widest text-[#C5A880]">
                          {sub.num} • {sub.id}
                        </div>
                        <h3 className="text-xl font-extrabold text-white group-hover:text-[#C5A880] transition-colors uppercase tracking-wider">
                          {sub.title}
                        </h3>
                        <div className="w-12 h-0.5 bg-[#C5A880] group-hover:w-20 transition-all duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------------
                OPTION 5: VERTICAL LIST / ACCORDION
                ------------------------------------------------------------------- */}
            {activeProposedOption === 'opt5' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-xs text-[#C5A880] font-bold uppercase tracking-wider">
                  Option 5: Vertical List / Accordion (Drawer List + Hardware Visual)
                </div>

                <div className="rounded-3xl border border-[#202020] bg-gradient-to-r from-[#141414] via-[#101010] to-[#0A0A0A] p-8 sm:p-12 relative overflow-hidden shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    <div className="lg:col-span-7 space-y-3">
                      {CATEGORY_DATA.subCategories.map((sub) => {
                        const isOpen = openAccordion === sub.slug;
                        return (
                          <div
                            key={sub.slug}
                            className="rounded-2xl border border-[#262626] bg-[#121212] overflow-hidden transition-all"
                          >
                            <button
                              type="button"
                              onClick={() => setOpenAccordion(isOpen ? null : sub.slug)}
                              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-[#161616] transition-colors cursor-pointer"
                            >
                              <div className="flex items-center space-x-4">
                                <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-[#222] shrink-0 border border-[#333]">
                                  <Image
                                    src={sub.sceneImage}
                                    alt={sub.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                                <div>
                                  <h4 className="text-sm sm:text-base font-bold text-white">
                                    {sub.title}
                                  </h4>
                                  <p className="text-xs text-neutral-400">
                                    {sub.scope}
                                  </p>
                                </div>
                              </div>

                              <div className="text-[#C5A880] p-1 rounded-lg bg-[#1F1F1F]">
                                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                              </div>
                            </button>

                            {isOpen && (
                              <div className="p-4 sm:p-5 border-t border-[#1F1F1F] bg-[#0E0E0E] flex items-center justify-between text-xs animate-fadeIn">
                                <span className="text-neutral-400 font-mono">
                                  {sub.highlights}
                                </span>
                                <span className="inline-flex items-center space-x-1.5 text-[#C5A880] font-bold hover:underline cursor-pointer">
                                  <span>Explore Models</span>
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#2B2B2B] bg-[#121212]">
                      <Image
                        src="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-4.webp"
                        alt="Hero Visual"
                        fill
                        className="object-cover object-center"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------------
                OPTION 6: CATEGORY + MODELS PREVIEW (HYBRID)
                ------------------------------------------------------------------- */}
            {activeProposedOption === 'opt6' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-xs text-[#C5A880] font-bold uppercase tracking-wider">
                  Option 6: Category + Models Preview (Hybrid with Mini Equipment Cards)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {CATEGORY_DATA.subCategories.map((sub) => (
                    <div
                      key={sub.slug}
                      className="group rounded-2xl border border-[#262626] bg-[#121212] hover:border-[#C5A880] p-6 space-y-5 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-white group-hover:text-[#C5A880] transition-colors">
                          {sub.title}
                        </h4>
                        <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all" />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {sub.models.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="rounded-xl border border-[#242424] bg-[#181818] p-1.5 flex flex-col items-center justify-center space-y-1"
                          >
                            <div className="relative h-14 w-full rounded-lg overflow-hidden bg-[#202020]">
                              <Image
                                src={m.img}
                                alt={m.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <span className="text-[9px] font-mono text-neutral-400 line-clamp-1 text-center">
                              {m.code}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs text-[#C5A880] font-bold group-hover:underline">
                        <span>Explore Models</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------------
                OPTION 7: VISUAL DEPARTMENT CARDS & EQUIPMENT GRID (RICH COMBO)
                ------------------------------------------------------------------- */}
            {activeProposedOption === 'opt7' && (
              <div className="space-y-10 animate-fadeIn">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-[#C5A880] font-bold uppercase tracking-wider">
                      Option 7: Department Cards with Connected Equipment Grid
                    </div>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      Click any card to filter equipment below
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {CATEGORY_DATA.subCategories.map((sub) => {
                      const isSelected = activeCardLine === sub.slug;
                      return (
                        <div
                          key={sub.slug}
                          onClick={() => setActiveCardLine(sub.slug)}
                          className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 cursor-pointer overflow-hidden ${
                            isSelected
                              ? 'border-[#C5A880] bg-[#161410] shadow-[0_10px_30px_rgba(197,168,128,0.15)] scale-[1.01]'
                              : 'border-[#262626] bg-[#121212] hover:bg-[#161616] hover:border-[#383838]'
                          }`}
                        >
                          <div className="space-y-3.5 relative z-10">
                            <div className="flex items-center justify-between">
                              <span
                                className={`inline-flex items-center space-x-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${
                                  isSelected
                                    ? 'border-[#C5A880] bg-[#C5A880] text-black font-extrabold'
                                    : 'border-[#C5A880]/30 bg-[#C5A880]/10 text-[#C5A880]'
                                }`}
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                <span>{sub.count} Models</span>
                              </span>
                              <ArrowRight className="h-4 w-4 text-[#C5A880]" />
                            </div>

                            <div>
                              <h4 className="text-base font-bold text-white group-hover:text-[#C5A880] transition-colors">
                                {sub.title}
                              </h4>
                              <p className="text-xs text-neutral-400 mt-1 line-clamp-1 font-medium">
                                {sub.tagline}
                              </p>
                            </div>

                            <div className="text-[11px] text-neutral-400 font-mono border-t border-[#1F1F1F] pt-2.5">
                              {sub.highlights}
                            </div>
                          </div>

                          <div className="mt-5 pt-3.5 border-t border-[#1F1F1F] flex items-center justify-between text-xs font-bold text-[#C5A880]">
                            <span>Explore Equipment</span>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Filtered Equipment Grid */}
                <div className="pt-8 border-t border-[#1F1F1F] space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Models for:{' '}
                      <span className="text-[#C5A880]">
                        {CATEGORY_DATA.subCategories.find((s) => s.slug === activeCardLine)?.title}
                      </span>{' '}
                      ({cardProducts.length})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cardProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="rounded-3xl border border-[#222222] bg-[#121212] overflow-hidden flex flex-col justify-between"
                      >
                        <div className="relative h-56 w-full bg-[#161616] overflow-hidden">
                          <Image
                            src={prod.image}
                            alt={prod.title}
                            fill
                            className="object-cover object-center"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent" />
                          <div className="absolute inset-0 shadow-[inset_0_0_35px_15px_#121212]" />
                        </div>
                        <div className="p-5 space-y-3">
                          <div className="flex items-center space-x-2">
                            <span className="rounded-md border border-amber-500/40 bg-amber-950/40 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                              {prod.cop}
                            </span>
                            <span className="rounded-md border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-[10px] font-mono text-neutral-400">
                              {prod.capacity}
                            </span>
                          </div>
                          <h5 className="text-sm font-bold text-white">{prod.title}</h5>
                          <p className="text-xs text-neutral-400 line-clamp-2">{prod.summary}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* =======================================================================
            SECTION 3: ISSUE #1 ISOLATED PREVIEW (SEAMLESS DARK VIGNETTE BLEND)
            ======================================================================= */}
        <section id="vignette-preview" className="rounded-3xl border border-[#222222] bg-[#0E0E0E] p-6 sm:p-10 space-y-8 shadow-2xl scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F1F] pb-6">
            <div>
              <div className="inline-flex items-center space-x-1.5 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#C5A880] mb-2">
                <span>Issue #1 Solution Review</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Product Image Edge Blend (Dark Vignette)
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Toggle the switch to see how omni-directional vignette dissolves white product photos seamlessly into dark cards.
              </p>
            </div>

            {/* Before vs After Switch */}
            <div className="flex items-center space-x-2 bg-[#141414] border border-[#262626] p-1 rounded-xl shrink-0">
              <button
                type="button"
                onClick={() => setVignetteEnabled(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !vignetteEnabled
                    ? 'bg-[#2B2B2B] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Raw Box Cutout
              </button>
              <button
                type="button"
                onClick={() => setVignetteEnabled(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  vignetteEnabled
                    ? 'bg-[#C5A880] text-black font-extrabold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Seamless Vignette Active
              </button>
            </div>
          </div>

          {/* 2-Card Direct Before / After Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORY_DATA.products.slice(0, 2).map((prod) => (
              <div
                key={prod.id}
                className="rounded-3xl border border-[#222222] bg-[#121212] overflow-hidden shadow-xl"
              >
                <div className="relative h-64 w-full bg-[#161616] overflow-hidden flex items-center justify-center">
                  <Image
                    src={prod.image}
                    alt={prod.title}
                    fill
                    className="object-cover object-center"
                    unoptimized
                  />

                  {/* Vignette Blend */}
                  {vignetteEnabled ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-[#121212] opacity-75 pointer-events-none" />
                      <div className="absolute inset-0 shadow-[inset_0_0_35px_15px_#121212] pointer-events-none" />
                      <span className="absolute top-3 right-3 rounded-full bg-black/75 border border-[#C5A880]/40 px-2.5 py-0.5 text-[10px] font-bold text-[#C5A880]">
                        Seamless Edge Dissolve Active
                      </span>
                    </>
                  ) : (
                    <span className="absolute top-3 right-3 rounded-full bg-red-950/80 border border-red-800/50 px-2.5 py-0.5 text-[10px] font-bold text-red-300">
                      Harsh Box Cutout
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="rounded-md border border-amber-500/40 bg-amber-950/40 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                      {prod.cop}
                    </span>
                    <span className="rounded-md border border-blue-500/40 bg-blue-950/40 px-2 py-0.5 text-[10px] font-bold text-blue-300">
                      {prod.fluid}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {prod.title}
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {prod.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
