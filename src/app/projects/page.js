/**
 * Innmotek Frontend - Engineering Projects & Capabilities (/projects)
 * 
 * Replaces old CRA Projects:
 *   Innmotek-frontend-OLD/src/frontend/projects/index.js
 * 
 * Features:
 *   - Pattern 4: Case Studies Grid (when projects exist in DB)
 *   - Honest capabilities & technical process showcase when case studies are in progress
 */

import Link from 'next/link';
import Image from 'next/image';
import { getProjects } from '@/lib/api';
import {
  ArrowRight,
  Building,
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Activity,
  Layers,
  FileCheck2
} from 'lucide-react';

export const revalidate = 30;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-16 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/40 bg-[#0A0A0A]/80 px-3.5 py-1 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
            System Design & Engineering Consultation
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
          Projects & System Capabilities
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Innmotek provides specialized thermal system sizing, mechanical schematics, and clean energy heating integration for residential, hospitality, and commercial applications.
        </p>
      </div>

      {/* Projects Display: Active Grid (if rows exist) or Process & Capabilities Showcase */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.slug || proj.id}
              className="group rounded-3xl border border-[#222222] bg-[#121212] overflow-hidden flex flex-col justify-between hover:border-[#C5A880] transition-all shadow-xl"
            >
              <div className="relative h-64 w-full bg-[#181818] overflow-hidden">
                {proj.image ? (
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-neutral-700 bg-[#161616]">
                    <Building className="h-10 w-10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                {proj.location && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center space-x-1 rounded-full bg-black/75 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-200 border border-white/10">
                      <MapPin className="h-3 w-3 text-[#C5A880]" />
                      <span>{proj.location}</span>
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h2 className="text-base font-bold text-white group-hover:text-[#C5A880] transition-colors">
                    {proj.title}
                  </h2>
                  {proj.summary && (
                    <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                      {proj.summary}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-[#1C1C1C]">
                  <Link
                    href={`/projects/${proj.slug}`}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#C5A880] group-hover:text-[#D4B890]"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Honest Engineering Process & Capabilities Presentation */
        <div className="space-y-12">
          <div className="rounded-3xl border border-[#222222] bg-[#121212] p-8 sm:p-14 overflow-hidden relative shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-3 py-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#C5A880]" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
                    Engineering Methodology
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display">
                  System Sizing, Modeling & Technical Consultation
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Every heating, hot water, and heat pump deployment begins with precise thermodynamic analysis. We work alongside MEP consultants, architects, and facility managers to design energy-efficient thermal systems tailored to local environmental conditions.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    'Thermodynamic heat load calculation and custom buffer volume sizing',
                    'Sub-zero cold climate heat pump configuration for high-altitude environments',
                    'Hydronic loop schematics with solar thermal auxiliary integration',
                    'Technical commissioning support and performance verification'
                  ].map((point, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <CheckCircle2 className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                      <span className="text-xs text-neutral-300 font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schematic Illustration Box */}
              <div className="relative h-[340px] sm:h-[420px] rounded-2xl border border-[#2B2B2B] overflow-hidden bg-[#181818]">
                <Image
                  src="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/1cfc7b9b-b9f3-4015-be9b-79067eb710e1.webp"
                  alt="Commercial Thermal Architecture"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl border border-white/10 bg-black/70 backdrop-blur-md space-y-1">
                  <div className="flex items-center space-x-2">
                    <FileCheck2 className="h-3.5 w-3.5 text-[#C5A880]" />
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Commercial Thermal Schematics</p>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Comprehensive installation case studies and commissioning documentation are currently in preparation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Banner */}
          <div className="rounded-3xl border border-[#C5A880]/30 bg-gradient-to-r from-[#141414] via-[#1A1815] to-[#141414] p-10 sm:p-14 text-center space-y-6 shadow-2xl">
            <div className="max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
                Planning a Heating or Hot Water Installation?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300">
                Contact our engineering desk to discuss project parameters, receive sizing recommendations, or schedule an initial technical consultation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 rounded-xl bg-[#C5A880] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:bg-[#D4B890] transition-all shadow-lg"
              >
                <span>Request Technical Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+918081741031"
                className="inline-flex items-center space-x-2 rounded-xl border border-[#333333] bg-[#141414] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:border-[#C5A880]"
              >
                <span>Direct Engineering Line: +91 808 1741031</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
