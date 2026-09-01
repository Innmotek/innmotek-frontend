/**
 * Innmotek Frontend - Engineering Services (/services)
 * 
 * Replaces old CRA Services:
 *   Innmotek-frontend-OLD/src/frontend/services/index.js
 * 
 * Features:
 *   - Pattern 4: Services capability grid
 *   - Pattern 5: Sizing & CFD analysis details
 */

import Link from 'next/link';
import Image from 'next/image';
import { getServices } from '@/lib/api';
import { ArrowRight, Wrench, ShieldCheck, Sparkles, Activity, Gauge, Flame } from 'lucide-react';

export const revalidate = 30;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-16 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/40 bg-[#0A0A0A]/80 px-3.5 py-1 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
            Lifecycle Engineering & Support
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
          Turnkey Thermal Services
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          From initial thermodynamic sizing and CFD computational simulations to professional mechanical installation, commissioning, and annual service maintenance.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((srv) => (
          <div
            key={srv.slug}
            className="group rounded-3xl border border-[#222222] bg-[#121212] overflow-hidden flex flex-col justify-between hover:border-[#C5A880] transition-all shadow-xl"
          >
            <div className="relative h-60 w-full bg-[#181818] overflow-hidden">
              {srv.image ? (
                <Image
                  src={srv.image}
                  alt={srv.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-neutral-700 bg-[#161616]">
                  <Wrench className="h-10 w-10" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h2 className="text-base font-bold text-white group-hover:text-[#C5A880] transition-colors">
                  {srv.title}
                </h2>
                <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                  Certified engineering execution adhering to European thermal standards and Himalayan climate reliability requirements.
                </p>
              </div>

              <div className="pt-4 border-t border-[#1C1C1C]">
                <Link
                  href={`/services/${srv.slug}`}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#C5A880] group-hover:text-[#D4B890]"
                >
                  <span>Explore Capabilities</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
