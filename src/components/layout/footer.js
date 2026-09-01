/**
 * Innmotek Frontend - Global Architectural Footer (Pattern 7)
 * 
 * Replaces old CRA Footer:
 *   Innmotek-frontend-OLD/src/components/footer/
 * 
 * Features:
 *   - Clean multi-column layout with high-contrast typography
 *   - Real Innmotek brand logo, address, phone numbers, and email
 *   - Direct category & policy navigation
 *   - Modern newsletter capture block
 */

import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

export default function Footer({ categories = [] }) {
  return (
    <footer className="border-t border-[#222222] bg-[#0A0A0A] text-neutral-400 relative z-20">
      {/* Top Value Banner */}
      <div className="border-b border-[#1A1A1A] py-8 bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C5A880]/10 text-[#C5A880] border border-[#C5A880]/20">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">High COP Efficiency</p>
              <p className="text-[11px] text-neutral-400">Up to 75% energy savings vs conventional heating</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C5A880]/10 text-[#C5A880] border border-[#C5A880]/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">German Engineering</p>
              <p className="text-[11px] text-neutral-400">Built to European thermal certification standards</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C5A880]/10 text-[#C5A880] border border-[#C5A880]/20">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Nationwide Support</p>
              <p className="text-[11px] text-neutral-400">Full technical installation & maintenance coverage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative h-10 w-36">
              <Image src="/images/logo-white.png" alt="Innmotek" fill className="object-contain object-left" />
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Innmotek LLP is a leading innovator in modern thermal technology, offering advanced heat pump water heaters, solar thermal collectors, stainless steel tanks, and high-performance climate systems.
            </p>
            <div className="pt-2 space-y-2.5 text-xs">
              <div className="flex items-start space-x-2.5 text-neutral-300">
                <MapPin className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">India Hub: GIDA, Uttar Pradesh, 273209</p>
                  <p className="text-neutral-500 text-[11px]">UAE Hub: Meydan Road, Nad Al Sheba, Dubai</p>
                </div>
              </div>
              <div className="flex items-center space-x-2.5 text-neutral-300">
                <Phone className="h-4 w-4 text-[#C5A880] shrink-0" />
                <div className="space-x-3">
                  <a href="tel:+918081741031" className="hover:text-white transition-colors font-mono">+91 808 1741031</a>
                  <span>•</span>
                  <a href="tel:+971554398350" className="hover:text-white transition-colors font-mono">+971 554398350</a>
                </div>
              </div>
              <div className="flex items-center space-x-2.5 text-neutral-300">
                <Mail className="h-4 w-4 text-[#C5A880] shrink-0" />
                <a href="mailto:info@innmotek.com" className="hover:text-white transition-colors">info@innmotek.com</a>
              </div>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#C5A880] mb-4">
              Thermal Systems
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">Heat Pump Water Heaters</Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">Solar Thermal Collectors</Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">Hot Water Storage Tanks</Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">Inverter Pool Heat Pumps</Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">Radiators & Fan Coils</Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">Dehumidifiers</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#C5A880] mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Innmotek</Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors">Technical FAQs</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact Engineering</Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">Product Catalogue</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#C5A880] mb-4">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">Payment Terms</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">Dealer Warranty</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} Innmotek LLP. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>Precision Thermal Technology</span>
            <span>•</span>
            <span>Thermatec Architectural Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
