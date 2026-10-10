'use client';

/**
 * Innmotek Frontend - UX Review & Client Approval Playground (/demo)
 * 
 * Interactive Staging Hub for testing design solutions:
 * 1. Sub-Specialties & Category Hierarchy Navigation (4 Interactive Options)
 *    - Option 1: Visual Department Showcase Cards (Recommended)
 *    - Option 2: Luxury Segmented Action Tabs with Count Badges
 *    - Option 3: Unified Multi-Shelf View (Auto-Aggregated Zero-Drop)
 *    - Option 4: Architectural Accordion Drawers
 * 2. Product Card Dark Seamless Vignette Blend (Before vs After Comparison)
 */

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Layers,
  ChevronRight,
  ArrowRight,
  Zap,
  Flame,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  Bookmark,
  ExternalLink,
  Eye,
  Sliders,
  Check
} from 'lucide-react';

// Real Sample Category & Products Data for Prototype
const DEMO_CATEGORY = {
  title: 'Hot Water Heat Pump',
  slug: 'hot-water-heat-pump',
  description: 'Explore our high-performance Hot Water Heat Pump systems engineered for maximum thermodynamic COP efficiency, ultra-low running costs, and long-term durability in extreme climates.',
  subCategories: [
    {
      id: 1,
      title: 'Residential Heat Pump',
      slug: 'residential',
      count: 4,
      tagline: '190L – 300L Compact Split & All-In-One Units',
      highlights: 'Up to 4.2 COP • Whisper Quiet 42dB • Smart Touch Display',
      image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-1.webp'
    },
    {
      id: 2,
      title: 'Commercial Heat Pump',
      slug: 'commercial',
      count: 3,
      tagline: 'High-Volume Central Heating for Hotels & Hospitals',
      highlights: 'Modular Cascade • 75°C High-Temp • Dual Circuit Safety',
      image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-2.webp'
    },
    {
      id: 3,
      title: 'Industrial Heat Pump',
      slug: 'industrial',
      count: 2,
      tagline: 'Heavy-Duty Process Water & Industrial Drying',
      highlights: 'R290 Eco System • Heavy Duty Inverter • 24/7 Duty Cycle',
      image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-3.webp'
    }
  ],
  sampleProducts: [
    {
      id: 'p1',
      subCategoryId: 1,
      title: 'Split Heat Pump Water Heater : IMHW-0132-S',
      subCategoryName: 'Residential Heat Pump',
      cop: '4.25 COP',
      fluid: 'R410A Eco',
      capacity: '190 - 300 Litres',
      summary: 'High-efficiency residential split unit with anti-corrosion condenser coil and rapid reheating cycle.',
      image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-1.webp'
    },
    {
      id: 'p2',
      subCategoryId: 1,
      title: 'All in One 190 Litres Heat Pump : IMHW-0076-S',
      subCategoryName: 'Residential Heat Pump',
      cop: '4.10 COP',
      fluid: 'R134a Fluid',
      capacity: '190 Litres',
      summary: 'Integrated tank and heat pump in a single sleek footprint for indoor or terrace utility rooms.',
      image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-2.webp'
    },
    {
      id: 'p3',
      subCategoryId: 2,
      title: 'Commercial Central Heat Pump : IMHW-0500-C',
      subCategoryName: 'Commercial Heat Pump',
      cop: '4.40 COP',
      fluid: 'R410A Inverter',
      capacity: '500 - 2000 Litres',
      summary: 'Designed for boutique resorts and commercial complexes with multi-stage scroll compressors.',
      image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-3.webp'
    },
    {
      id: 'p4',
      subCategoryId: 3,
      title: 'Industrial Ultra High-Temp Heat Pump : IMHW-1200-IND',
      subCategoryName: 'Industrial Heat Pump',
      cop: '4.00 COP',
      fluid: 'R290 Eco',
      capacity: 'Continuous Flow',
      summary: 'Delivers process water up to 85°C with dual economizer circuits for manufacturing facilities.',
      image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-4.webp'
    }
  ]
};

export default function DemoLabPage() {
  const [activeTab, setActiveTab] = useState('cards'); // 'cards' | 'tabs' | 'shelves' | 'accordion'
  const [selectedSubTab, setSelectedSubTab] = useState(1);
  const [openAccordions, setOpenAccordions] = useState({ 1: true, 2: false, 3: false });
  const [vignetteEnabled, setVignetteEnabled] = useState(true);
  const [clientDecision, setClientDecision] = useState('cards');

  const toggleAccordion = (id) => {
    setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white pt-28 pb-32">
      {/* Top Review Header Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="rounded-2xl border border-[#C5A880]/30 bg-gradient-to-r from-[#171410] via-[#1A1814] to-[#121212] p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/40 bg-[#0A0A0A] px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-[#C5A880] animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
                  Client Review & Architecture Lab
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                Sub-Specialty Navigation & Image Blend Playground
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                Test and compare the 4 proposed user experience patterns for discovering subcategories and equipment lines. Select the one your client approves to roll it out site-wide.
              </p>
            </div>

            {/* Quick Choice Indicator */}
            <div className="rounded-xl border border-[#2B2B2B] bg-[#0E0E0E] p-4 text-xs space-y-2 shrink-0">
              <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                Current Client Preference:
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-[#C5A880] text-sm">
                  {clientDecision === 'cards' && 'Option 1: Visual Department Cards (Recommended)'}
                  {clientDecision === 'tabs' && 'Option 2: Luxury Segmented Tabs'}
                  {clientDecision === 'shelves' && 'Option 3: All-in-One Multi-Shelf View'}
                  {clientDecision === 'accordion' && 'Option 4: Architectural Drawers'}
                </span>
                <CheckCircle2 className="h-4 w-4 text-[#C5A880]" />
              </div>
            </div>
          </div>

          {/* Interactive Pattern Selector Tabs */}
          <div className="mt-8 pt-6 border-t border-[#252525] flex flex-wrap gap-2.5">
            {[
              {
                id: 'cards',
                title: 'Option 1: Visual Cards',
                badge: 'Recommended ⭐',
                desc: 'Photographic department cards with model counts'
              },
              {
                id: 'tabs',
                title: 'Option 2: Action Tabs',
                badge: 'Compact & Clean',
                desc: 'Glow pill navigation bar with active state'
              },
              {
                id: 'shelves',
                title: 'Option 3: Multi-Shelf',
                badge: 'Zero Dropoff',
                desc: 'Shows all products on one page with anchor jumps'
              },
              {
                id: 'accordion',
                title: 'Option 4: Drawers',
                badge: 'Collapsible',
                desc: 'Expandable drawers for quick inline previews'
              }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[200px] text-left p-3.5 rounded-xl border transition-all duration-200 ${
                    isActive
                      ? 'border-[#C5A880] bg-[#C5A880]/15 text-white shadow-lg shadow-[#C5A880]/10 scale-[1.01]'
                      : 'border-[#242424] bg-[#121212] text-neutral-400 hover:border-[#383838] hover:text-neutral-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${isActive ? 'text-[#C5A880]' : 'text-white'}`}>
                      {tab.title}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                      isActive ? 'bg-[#C5A880] text-black' : 'bg-[#1E1E1E] text-neutral-400'
                    }`}>
                      {tab.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 line-clamp-1">{tab.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Category Context Banner (Mimicking the real live Category Page) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="rounded-3xl border border-[#222222] bg-gradient-to-b from-[#161616] to-[#0D0D0D] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <nav className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-4">
            <span>Home</span>
            <ChevronRight className="h-3 w-3 text-neutral-600" />
            <span>Categories</span>
            <ChevronRight className="h-3 w-3 text-neutral-600" />
            <span className="text-[#C5A880] font-bold">{DEMO_CATEGORY.title}</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/40 bg-[#0A0A0A]/80 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
                Live Category Detail Prototype
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
              {DEMO_CATEGORY.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
              {DEMO_CATEGORY.description}
            </p>
          </div>

          {/* =========================================================================
              PATTERN 1: VISUAL DEPARTMENT SHOWCASE CARDS (RECOMMENDED)
              ========================================================================= */}
          {activeTab === 'cards' && (
            <div className="mt-10 pt-8 border-t border-[#222222] space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C5A880] flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4" />
                    <span>Select Sub-Specialty / Product Line:</span>
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Click any product line below to view its dedicated high-efficiency models.
                  </p>
                </div>
                <span className="text-[10px] text-neutral-500 font-mono">
                  3 Departments Available
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {DEMO_CATEGORY.subCategories.map(sub => (
                  <div
                    key={sub.id}
                    onClick={() => {}}
                    className="group relative flex flex-col justify-between rounded-2xl border border-[#2B2B2B] bg-[#141414] hover:bg-[#181818] p-5 transition-all duration-300 hover:border-[#C5A880] hover:shadow-[0_10px_30px_rgba(197,168,128,0.15)] cursor-pointer overflow-hidden"
                  >
                    {/* Background Subtle Photo Vignette */}
                    <div className="absolute top-0 right-0 w-36 h-36 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none overflow-hidden rounded-full blur-2xl bg-[#C5A880]" />

                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center space-x-1.5 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#C5A880]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
                          <span>{sub.count} Models</span>
                        </span>
                        <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all" />
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-[#C5A880] transition-colors">
                          {sub.title}
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-1 font-medium">
                          {sub.tagline}
                        </p>
                      </div>

                      <div className="text-[11px] text-neutral-500 font-mono border-t border-[#202020] pt-2">
                        {sub.highlights}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#222222] flex items-center justify-between text-xs font-bold text-[#C5A880] group-hover:text-white transition-colors">
                      <span>Explore Equipment</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              PATTERN 2: INTERACTIVE GLOWING SEGMENTED TABS
              ========================================================================= */}
          {activeTab === 'tabs' && (
            <div className="mt-10 pt-8 border-t border-[#222222] space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A880] flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Choose Product Line:</span>
                </h3>
                <span className="text-[11px] text-neutral-400">Click a tab to switch models instantly</span>
              </div>

              {/* Segmented Tab Strip */}
              <div className="flex flex-wrap gap-2.5 p-1.5 rounded-2xl border border-[#2B2B2B] bg-[#111111] backdrop-blur-md">
                {DEMO_CATEGORY.subCategories.map(sub => {
                  const isSelected = selectedSubTab === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubTab(sub.id)}
                      className={`flex-1 min-w-[180px] flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#C5A880] to-[#E2CFB4] text-black shadow-lg shadow-[#C5A880]/20 font-extrabold scale-[1.01]'
                          : 'bg-[#181818] text-neutral-300 hover:bg-[#202020] hover:text-white border border-[#262626]'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className={`h-2 w-2 rounded-full ${isSelected ? 'bg-black' : 'bg-[#C5A880]'}`} />
                        <span>{sub.title}</span>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                        isSelected ? 'bg-black/20 text-black font-mono' : 'bg-black/60 text-neutral-400 font-mono'
                      }`}>
                        {sub.count} models
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="text-[11px] text-neutral-400 italic">
                Showing equipment for: <strong className="text-white">{DEMO_CATEGORY.subCategories.find(s => s.id === selectedSubTab)?.title}</strong>
              </div>
            </div>
          )}

          {/* =========================================================================
              PATTERN 3: UNIFIED MULTI-SHELF VIEW
              ========================================================================= */}
          {activeTab === 'shelves' && (
            <div className="mt-10 pt-8 border-t border-[#222222] space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A880] flex items-center gap-2">
                    <Bookmark className="h-4 w-4" />
                    <span>Quick Jump To Specialty Line:</span>
                  </h3>
                  <p className="text-[11px] text-neutral-400">All products are displayed below — use quick anchors to jump.</p>
                </div>
              </div>

              {/* Quick Jump Anchor Strip */}
              <div className="flex flex-wrap gap-2">
                {DEMO_CATEGORY.subCategories.map(sub => (
                  <a
                    key={sub.id}
                    href={`#shelf-${sub.id}`}
                    className="inline-flex items-center space-x-2 rounded-xl border border-[#C5A880]/30 bg-[#1A1A1A] px-4 py-2 text-xs font-bold text-[#C5A880] hover:bg-[#C5A880] hover:text-black transition-all"
                  >
                    <span>{sub.title} ({sub.count})</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              PATTERN 4: ARCHITECTURAL ACCORDION DRAWERS
              ========================================================================= */}
          {activeTab === 'accordion' && (
            <div className="mt-10 pt-8 border-t border-[#222222] space-y-3 animate-fadeIn">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A880] flex items-center gap-2 mb-3">
                <Sliders className="h-4 w-4" />
                <span>Expandable Product Line Drawers:</span>
              </h3>

              <div className="space-y-3">
                {DEMO_CATEGORY.subCategories.map(sub => {
                  const isOpen = openAccordions[sub.id];
                  const subProducts = DEMO_CATEGORY.sampleProducts.filter(p => p.subCategoryId === sub.id);
                  return (
                    <div
                      key={sub.id}
                      className="rounded-2xl border border-[#2B2B2B] bg-[#141414] overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleAccordion(sub.id)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-[#1A1A1A] transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C5A880]/15 text-[#C5A880] font-bold text-xs">
                            0{sub.id}
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-white">
                              {sub.title}
                            </h4>
                            <p className="text-[11px] text-neutral-400">
                              {sub.tagline}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className="hidden sm:inline-block rounded-full border border-[#333] bg-[#0E0E0E] px-2.5 py-0.5 text-[10px] font-mono text-neutral-400">
                            {sub.count} models
                          </span>
                          <div className={`p-1.5 rounded-lg bg-[#222] text-[#C5A880] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="p-4 sm:p-6 border-t border-[#222222] bg-[#0F0F0F] space-y-4 animate-fadeIn">
                          <p className="text-xs text-neutral-400 font-mono">{sub.highlights}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {subProducts.map(prod => (
                              <div
                                key={prod.id}
                                className="rounded-xl border border-[#262626] bg-[#161616] p-4 flex items-center justify-between hover:border-[#C5A880] transition-colors"
                              >
                                <div>
                                  <span className="text-[10px] font-bold text-[#C5A880] uppercase tracking-wider">{prod.cop}</span>
                                  <h5 className="text-xs font-bold text-white mt-0.5">{prod.title}</h5>
                                  <p className="text-[11px] text-neutral-400">{prod.capacity}</p>
                                </div>
                                <Link
                                  href={`/category/${sub.slug}`}
                                  className="p-2 rounded-lg bg-[#222] hover:bg-[#C5A880] hover:text-black text-neutral-300 transition-colors"
                                >
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            ISSUE 1 INTERACTIVE PREVIEW: PRODUCT CARD SEAMLESS DARK VIGNETTE BLEND
            ========================================================================= */}
        <div className="rounded-3xl border border-[#222222] bg-[#101010] p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222222] pb-6">
            <div>
              <div className="inline-flex items-center space-x-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 mb-2">
                <span>Issue #1 Solution Preview</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Product Image Edge Blend Comparison
              </h3>
              <p className="text-xs text-neutral-400">
                Toggle the switch to see how omni-directional vignette removes harsh white cutouts and dissolves white product images seamlessly into the dark card.
              </p>
            </div>

            {/* Before vs After Switch */}
            <div className="flex items-center space-x-3 bg-[#181818] border border-[#2E2E2E] p-1.5 rounded-2xl shrink-0">
              <button
                type="button"
                onClick={() => setVignetteEnabled(false)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  !vignetteEnabled ? 'bg-red-950/80 text-red-300 border border-red-800/40' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Before (Harsh Box)
              </button>
              <button
                type="button"
                onClick={() => setVignetteEnabled(true)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  vignetteEnabled ? 'bg-[#C5A880] text-black font-extrabold shadow-md shadow-[#C5A880]/20' : 'text-neutral-400 hover:text-white'
                }`}
              >
                After (Seamless Vignette) ✨
              </button>
            </div>
          </div>

          {/* Side by Side Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEMO_CATEGORY.sampleProducts.slice(0, 2).map((prod, idx) => (
              <div
                key={prod.id}
                className="rounded-3xl border border-[#222222] bg-[#121212] overflow-hidden shadow-xl"
              >
                {/* Image Box */}
                <div className="relative h-64 sm:h-72 w-full bg-[#161616] overflow-hidden flex items-center justify-center">
                  <Image
                    src={prod.image}
                    alt={prod.title}
                    fill
                    className="object-cover object-center"
                    unoptimized
                  />

                  {/* VIGNETTE TOGGLE EFFECT */}
                  {vignetteEnabled ? (
                    <>
                      {/* Omni-directional 4-side dark dissolve + bottom shadow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-[#121212] opacity-80" />
                      <div className="absolute inset-0 shadow-[inset_0_0_40px_20px_#121212]" />
                      <span className="absolute top-3 right-3 rounded-full bg-emerald-950/80 border border-emerald-800/50 px-2.5 py-1 text-[10px] font-bold text-emerald-300 backdrop-blur-md">
                        ✨ Seamless Dark Dissolve Active
                      </span>
                    </>
                  ) : (
                    <>
                      {/* Harsh cutoff */}
                      <span className="absolute top-3 right-3 rounded-full bg-red-950/80 border border-red-800/50 px-2.5 py-1 text-[10px] font-bold text-red-300 backdrop-blur-md">
                        ❌ Harsh Rectangular Edge Cutout
                      </span>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="rounded-md border border-amber-500/40 bg-amber-950/40 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                      {prod.cop}
                    </span>
                    <span className="rounded-md border border-blue-500/40 bg-blue-950/40 px-2 py-0.5 text-[10px] font-bold text-blue-300">
                      {prod.fluid}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white line-clamp-2">
                    {prod.title}
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {prod.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Decision Finalization Bar */}
        <div className="rounded-2xl border border-[#2B2B2B] bg-[#121212] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Check className="h-4 w-4 text-[#C5A880]" />
              <span>Select Final Layout Option for Site-Wide Rollout:</span>
            </h4>
            <p className="text-xs text-neutral-400 mt-0.5">
              Whichever option the client approves will be automatically applied across all Category and Product catalogue pages.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {[
              { id: 'cards', label: '1. Visual Cards' },
              { id: 'tabs', label: '2. Action Tabs' },
              { id: 'shelves', label: '3. Multi-Shelf' },
              { id: 'accordion', label: '4. Drawers' }
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setClientDecision(opt.id);
                  setActiveTab(opt.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  clientDecision === opt.id
                    ? 'bg-[#C5A880] text-black shadow-md'
                    : 'bg-[#1C1C1C] text-neutral-400 hover:text-white border border-[#2E2E2E]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
