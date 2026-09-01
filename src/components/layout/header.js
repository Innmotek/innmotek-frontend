/**
 * Innmotek Frontend - Global Navigation Header (Pattern 3: Architectural Navigation Bar)
 * 
 * Replaces old CRA Header:
 *   Innmotek-frontend-OLD/src/components/header/
 * 
 * Features:
 *   - Dark glassmorphism floating bar with gold accent indicators
 *   - Real Innmotek brand logo integration
 *   - Category mega-dropdown & direct links
 *   - Mobile responsive drawer
 *   - "Request Quote" / "Contact Us" CTA
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  ArrowRight,
  Flame,
  Sun,
  Droplets,
  Wind,
  Layers
} from 'lucide-react';

export default function Header({ categories = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
    { label: 'FAQS', href: '/faqs' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#222222] py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#0A0A0A]/95 to-transparent py-5'
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

            {/* Products Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                className="flex items-center space-x-1 text-xs font-semibold tracking-widest uppercase text-neutral-300 transition-colors hover:text-[#C5A880]"
              >
                <span>THERMAL SOLUTIONS</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:rotate-180" />
              </button>

              {/* Mega Dropdown Panel */}
              {productsOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[540px] rounded-2xl border border-[#262626] bg-[#121212]/95 backdrop-blur-2xl p-5 shadow-2xl animate-fadeIn">
                  <div className="grid grid-cols-2 gap-3">
                    {categories.slice(0, 6).map(c => (
                      <Link
                        key={c.id}
                        href={`/#categories`}
                        className="group/item flex items-start space-x-3 rounded-xl border border-[#1E1E1E] bg-[#161616] p-3 transition-all hover:border-[#C5A880]/50 hover:bg-[#1A1A1A]"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C5A880]/10 text-[#C5A880] group-hover/item:bg-[#C5A880] group-hover/item:text-[#0A0A0A] transition-colors">
                          <Flame className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover/item:text-[#C5A880] transition-colors">
                            {c.title}
                          </p>
                          <p className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5">
                            {c.product_count ? `${c.product_count} models` : 'Inverter & High-efficiency'}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1F1F1F] flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400">German-engineered heating & cooling</span>
                    <Link href="/#categories" className="text-[#C5A880] font-bold flex items-center space-x-1 hover:underline">
                      <span>Explore all equipment</span>
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
              className="relative inline-flex items-center space-x-2 rounded-lg bg-[#C5A880] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] transition-all hover:bg-[#D4B890] shadow-md shadow-[#C5A880]/15 group"
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
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl lg:hidden p-6 flex flex-col justify-between animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#222222] pb-4">
            <div className="relative h-8 w-32">
              <Image src="/images/logo-white.png" alt="Innmotek" fill className="object-contain object-left" />
            </div>
            <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-neutral-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="py-8 space-y-6">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block text-xl font-bold tracking-tight text-white hover:text-[#C5A880]"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block text-xl font-bold tracking-tight text-white hover:text-[#C5A880]"
            >
              About Innmotek
            </Link>
            <Link
              href="/#categories"
              onClick={() => setMobileOpen(false)}
              className="block text-xl font-bold tracking-tight text-white hover:text-[#C5A880]"
            >
              Thermal Solutions
            </Link>
            <Link
              href="/faqs"
              onClick={() => setMobileOpen(false)}
              className="block text-xl font-bold tracking-tight text-white hover:text-[#C5A880]"
            >
              FAQs & Guidance
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-xl font-bold tracking-tight text-white hover:text-[#C5A880]"
            >
              Contact & Inquiries
            </Link>
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
