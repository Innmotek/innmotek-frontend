/**
 * Innmotek Frontend - Global Navigation Header & Hierarchical Mega-Menu
 * 
 * Replaces old CRA Header:
 *   Innmotek-frontend-OLD/src/frontend/layouts/navigation/index.js
 * 
 * Features:
 *   - Dark luxury architectural aesthetic (DESIGN_SPEC.md)
 *   - Full Hierarchical Mega-Menu with all 7 Parent Categories and 18+ Subcategory Links
 *   - Deep-linking to dedicated showcase routes (/pool-and-spa-cover, /thermal-solar-collector, etc.)
 *     and dynamic category hubs (/category/:slug)
 *   - Mobile responsive drawer with expandable category accordion
 *   - "Request Quote" / Consultation CTA
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Flame,
  Sun,
  Droplets,
  Layers,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Gauge,
  FolderTree
} from 'lucide-react';

// Category Icon Mapping
const CATEGORY_ICONS = {
  'hot-water-heat-pump': Flame,
  'solar-water-heaters': Sun,
  'pool-and-spa': Droplets,
  'hot-water-storage-tanks': Layers,
  'heaters': Zap,
  'radiator-and-fancoil': Gauge,
  'others': Sparkles
};

// Route resolver matching legacy & showcase routing
function resolveCategoryHref(slug, isParent = false) {
  if (!slug) return '/categories';
  
  // Dedicated showcase pages
  const showcaseMap = {
    'pool-and-spa-cover': '/pool-and-spa-cover',
    'pool-pumps': '/pool-pumps',
    'pool-pump': '/pool-pumps',
    'robotic-pool-cleaner': '/robotic-pool-cleaner',
    'dehumidifier': '/dehumidifier',
    'hot-water-storage-tank': '/hot-water-storage-tank',
    'modular-panel-tank': '/modular-panel-tank',
    'thermal-solar-collector': '/thermal-solar-collector',
    'pressurized-thermosiphon': '/pressurized-thermosiphon',
    'radiator-and-fancoil': '/radiator-and-fancoil',
    'glass-lined-tanks': '/glass-lined-tanks',
    'heat-pump-air-dryer': '/heat-pump-air-dryer'
  };

  if (showcaseMap[slug]) return showcaseMap[slug];
  return `/category/${slug}`;
}

export default function Header({ categories = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setProductsOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setProductsOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductsOpen(false);
    }, 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0A0A]/98 backdrop-blur-xl border-b border-[#222222] py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-9 w-32 sm:w-36">
              <Image
                src="/images/logo-white.png"
                alt="Innmotek Thermal Systems"
                fill
                className="object-contain object-left transition-opacity group-hover:opacity-90"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-xs font-semibold tracking-widest uppercase transition-colors hover:text-[#C5A880] ${
                pathname === '/' ? 'text-[#C5A880]' : 'text-neutral-300'
              }`}
            >
              HOME
            </Link>

            {/* Hierarchical Mega-Menu Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center space-x-1.5 text-xs font-semibold tracking-widest uppercase transition-colors hover:text-[#C5A880] ${
                  pathname.startsWith('/category') || pathname.startsWith('/products') ? 'text-[#C5A880]' : 'text-neutral-300'
                }`}
                aria-expanded={productsOpen}
              >
                <span>THERMAL SOLUTIONS</span>
                <ChevronDown className={`h-3.5 w-3.5 opacity-70 transition-transform duration-300 ${productsOpen ? 'rotate-180 text-[#C5A880]' : ''}`} />
              </button>

              {/* Full-Width Hierarchical Mega Dropdown Panel (100% Solid Backdrop - No Bleed-through) */}
              {productsOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[1000px] max-w-[95vw] rounded-3xl border border-[#2E2E2E] bg-gradient-to-b from-[#181818] via-[#131313] to-[#0E0E0E] p-8 shadow-[0_35px_90px_rgba(0,0,0,0.98)] ring-1 ring-white/10 animate-fadeIn z-[100] relative overflow-hidden">
                  {/* Subtle Ambient Top Glow */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -top-24 left-1/3 w-80 h-80 bg-[#C5A880]/[0.03] rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 grid grid-cols-3 gap-6 lg:gap-8">
                    {categories.map((cat) => {
                      const IconComp = CATEGORY_ICONS[cat.slug] || FolderTree;
                      const hasSubs = cat.subCategory && cat.subCategory.length > 0;
                      const parentHref = resolveCategoryHref(cat.slug, true);

                      return (
                        <div key={cat.slug || cat.id} className="space-y-3">
                          {/* Parent Category Header Link */}
                          <Link
                            href={parentHref}
                            className="group/parent flex items-center space-x-2.5 pb-2 border-b border-[#242424] transition-colors"
                          >
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#C5A880]/15 text-[#C5A880] group-hover/parent:bg-[#C5A880] group-hover/parent:text-[#0A0A0A] transition-colors">
                              <IconComp className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-bold text-white uppercase tracking-wide group-hover/parent:text-[#C5A880] transition-colors line-clamp-1">
                              {cat.title}
                            </span>
                          </Link>

                          {/* Subcategories List */}
                          {hasSubs ? (
                            <ul className="space-y-1.5 pl-1">
                              {cat.subCategory.map((sub) => {
                                const subHref = resolveCategoryHref(sub.slug, false);
                                return (
                                  <li key={sub.slug || sub.id}>
                                    <Link
                                      href={subHref}
                                      className="group/sub flex items-center justify-between py-1 px-2 rounded-lg text-[11px] text-neutral-400 hover:text-white hover:bg-[#1E1E1E] transition-all"
                                    >
                                      <span className="line-clamp-1 group-hover/sub:text-[#C5A880] transition-colors">
                                        {sub.title}
                                      </span>
                                      <ChevronRight className="h-3 w-3 text-neutral-600 group-hover/sub:text-[#C5A880] group-hover/sub:translate-x-0.5 transition-all shrink-0 ml-1 opacity-0 group-hover/sub:opacity-100" />
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <div className="py-1 px-2">
                              <Link
                                href={parentHref}
                                className="inline-flex items-center space-x-1 text-[11px] text-[#C5A880] hover:underline"
                              >
                                <span>Explore {cat.title} models</span>
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Mega-Menu Footer Bar */}
                  <div className="relative z-10 mt-7 pt-4 border-t border-[#222222] flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 text-neutral-400 text-[11px]">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#C5A880]" />
                      <span>Certified German Engineering & Sub-Zero Himalayan Testing</span>
                    </div>
                    <Link
                      href="/category"
                      className="inline-flex items-center space-x-1.5 rounded-full bg-[#1C1C1C] hover:bg-[#C5A880] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-200 hover:text-[#0A0A0A] border border-[#2E2E2E] hover:border-[#C5A880] transition-all"
                    >
                      <span>Full Equipment Catalogue</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`text-xs font-semibold tracking-widest uppercase transition-colors hover:text-[#C5A880] ${
                pathname === '/about' ? 'text-[#C5A880]' : 'text-neutral-300'
              }`}
            >
              ABOUT US
            </Link>

            <Link
              href="/blogs"
              className={`text-xs font-semibold tracking-widest uppercase transition-colors hover:text-[#C5A880] ${
                pathname.startsWith('/blog') ? 'text-[#C5A880]' : 'text-neutral-300'
              }`}
            >
              BLOGS
            </Link>

            <Link
              href="/faqs"
              className={`text-xs font-semibold tracking-widest uppercase transition-colors hover:text-[#C5A880] ${
                pathname === '/faqs' ? 'text-[#C5A880]' : 'text-neutral-300'
              }`}
            >
              FAQS
            </Link>

            <Link
              href="/contact"
              className={`text-xs font-semibold tracking-widest uppercase transition-colors hover:text-[#C5A880] ${
                pathname === '/contact' ? 'text-[#C5A880]' : 'text-neutral-300'
              }`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/contact"
              className="relative inline-flex items-center space-x-2 rounded-xl bg-[#C5A880] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] transition-all hover:bg-[#D4B890] shadow-md shadow-[#C5A880]/15 group"
            >
              <span>Request Quote</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden rounded-xl border border-[#2B2B2B] bg-[#141414] p-2 text-neutral-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl lg:hidden p-6 flex flex-col justify-between animate-fadeIn overflow-y-auto">
          <div>
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div className="relative h-8 w-32">
                <Image src="/images/logo-white.png" alt="Innmotek" fill className="object-contain object-left" />
              </div>
              <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-neutral-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="py-6 space-y-4">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block text-lg font-bold tracking-tight text-white hover:text-[#C5A880]"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="block text-lg font-bold tracking-tight text-white hover:text-[#C5A880]"
              >
                About Innmotek
              </Link>

              {/* Mobile Thermal Solutions Accordion */}
              <div>
                <button
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="flex w-full items-center justify-between text-lg font-bold tracking-tight text-white hover:text-[#C5A880] py-1"
                >
                  <span>Thermal Solutions</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${mobileSolutionsOpen ? 'rotate-180 text-[#C5A880]' : ''}`} />
                </button>

                {mobileSolutionsOpen && (
                  <div className="mt-3 space-y-4 pl-3 border-l border-[#2B2B2B] text-sm">
                    {categories.map((cat) => (
                      <div key={cat.slug} className="space-y-1.5">
                        <Link
                          href={resolveCategoryHref(cat.slug, true)}
                          onClick={() => setMobileOpen(false)}
                          className="block font-bold text-xs uppercase tracking-wider text-[#C5A880]"
                        >
                          {cat.title}
                        </Link>
                        {cat.subCategory && cat.subCategory.length > 0 && (
                          <div className="space-y-1 pl-2">
                            {cat.subCategory.map((sub) => (
                              <Link
                                key={sub.slug}
                                href={resolveCategoryHref(sub.slug, false)}
                                onClick={() => setMobileOpen(false)}
                                className="block text-xs text-neutral-400 hover:text-white py-0.5"
                              >
                                {sub.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/blogs"
                onClick={() => setMobileOpen(false)}
                className="block text-lg font-bold tracking-tight text-white hover:text-[#C5A880]"
              >
                Blogs & Insights
              </Link>
              <Link
                href="/faqs"
                onClick={() => setMobileOpen(false)}
                className="block text-lg font-bold tracking-tight text-white hover:text-[#C5A880]"
              >
                FAQs & Guidance
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block text-lg font-bold tracking-tight text-white hover:text-[#C5A880]"
              >
                Contact & Inquiries
              </Link>
            </div>
          </div>

          <div className="border-t border-[#222222] pt-6 space-y-4">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-[#C5A880] py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0A]"
            >
              <span>Request System Sizing</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="flex justify-around text-xs text-neutral-400 pt-2">
              <span>Kathmandu, Nepal</span>
              <span>•</span>
              <span>info@innmotek.com</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
