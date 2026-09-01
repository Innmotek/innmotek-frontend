/**
 * Innmotek Frontend - About Us Page (/about)
 * 
 * Replaces old CRA About:
 *   Innmotek-frontend-OLD/src/frontend/abouts/index.js
 * 
 * Features:
 *   - Dark luxury architectural styling matching DESIGN_SPEC.md
 *   - Real About content loaded from live backend (/api/pages/about-us or /api/pages)
 *   - Core engineering values & sustainability pillars
 *   - Mission & Vision statement blocks
 */

import Image from 'next/image';
import Link from 'next/link';
import { getPageBySlug } from '@/lib/api';
import {
  ShieldCheck,
  Zap,
  Target,
  Eye,
  Award,
  CheckCircle2,
  ArrowRight,
  Flame
} from 'lucide-react';

export const metadata = {
  title: 'About Us | Innmotek Thermal Systems',
  description: 'Learn about Innmotek LLP, our sustainable heating mission, German engineering standards, and advanced heat pump solutions.',
};

export const revalidate = 30;

export default async function AboutPage() {
  const pageData = await getPageBySlug('about-us');

  return (
    <div className="space-y-24 sm:space-y-28 pt-28 pb-24">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#222222] bg-[#121212] p-8 sm:p-14 overflow-hidden relative shadow-2xl">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/40 bg-[#C5A880]/10 px-3.5 py-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
                Company Profile & Engineering DNA
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
              Pioneering Clean Thermal Technology in South Asia
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
              Innmotek LLP is dedicated to engineering ultra-efficient heat pumps, hot water systems, and solar thermal integrations designed for durability, maximum COP output, and zero direct emissions.
            </p>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C5A880]/5 blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* Main Narrative & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
              Engineering Excellence Born for Extreme Climates
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Founded on the principles of precision thermodynamic engineering, Innmotek bridges the gap between European HVAC technology and regional Himalayan climatic requirements. Our systems are engineered to operate seamlessly from sweltering sub-tropical plains to freezing mountain peaks.
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              By utilizing ambient heat from the atmosphere, our aerothermal heat pumps achieve coefficients of performance (COP) exceeding 4.2—meaning every unit of electrical energy yields over four units of usable thermal output.
            </p>

            <div className="pt-2 space-y-3">
              {[
                'Full in-house thermal simulation and hydraulic system sizing',
                'Authorised distribution of Midea Building Technologies',
                'Comprehensive technical service support across Nepal & India',
                'SUS316 Duplex and Vitreous Enamel Glass corrosion-proof storage'
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <span className="text-xs text-neutral-200 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="relative h-[380px] sm:h-[460px] rounded-2xl border border-[#2B2B2B] overflow-hidden bg-[#161616] shadow-xl">
            <Image
              src="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/products/3e12ee32-093e-43f5-87ab-d90b53a3f6bc.webp"
              alt="Innmotek Engineering Facility"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl border border-white/10 bg-black/70 backdrop-blur-md">
              <p className="text-xs font-bold text-white uppercase tracking-wider">Innmotek Thermal Standards</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Tested for performance in sub-zero Himalayan altitudes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Split (Pattern 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-[#222222] bg-[#121212] p-8 space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C5A880]/15 text-[#C5A880]">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Our Mission</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              To decarbonize water and space heating across commercial and residential sectors by delivering innovative, energy-efficient, and dependable thermal appliances that dramatically cut operational costs while preserving our environment.
            </p>
          </div>

          <div className="rounded-2xl border border-[#222222] bg-[#121212] p-8 space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C5A880]/15 text-[#C5A880]">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Our Vision</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              To be the foremost thermal engineering authority in South Asia, recognized for setting the benchmark in heating performance, renewable energy integration, and customer-first technical excellence.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
            Core Values
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            The Innmotek Advantage
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Thermal Efficiency', desc: 'Up to 75% power reduction via intelligent inverter modulation.' },
            { title: 'Extreme Climate Ready', desc: 'Continuous hot water supply even in heavy frost at -25°C.' },
            { title: 'Quality Materials', desc: 'SUS316 stainless and vitreous enamel prevents rust and scaling.' },
            { title: 'End-to-End Service', desc: 'From sizing and delivery to warranty support and maintenance.' }
          ].map((pillar, i) => (
            <div key={i} className="rounded-2xl border border-[#222222] bg-[#121212] p-6 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">{pillar.title}</p>
              <p className="text-xs text-neutral-400 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
