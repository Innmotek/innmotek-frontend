/**
 * Innmotek Frontend - All Categories Catalogue (/category)
 * 
 * Replaces old CRA Categories page:
 *   Innmotek-frontend-OLD/src/frontend/categories/index.js
 * 
 * Design Reference:
 *   - Pattern 4: Photo-First Category Grid with bottom gold label bars (DESIGN_SPEC.md)
 *   - All categories with nested subcategories breakdown
 */

import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/api';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';

export const revalidate = 30;

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-16 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/40 bg-[#0A0A0A]/80 px-3.5 py-1 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
            System Architecture & Products
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
          Thermal Equipment Categories
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Explore our complete range of ultra-high COP heat pumps, solar thermal systems, duplex buffer vessels, and clean energy heating solutions.
        </p>
      </div>

      {/* Pattern 4 Photo-First Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((cat) => {
          const subcats = cat.subCategory || [];
          const catUrl = `/category/${cat.slug || cat.id}`;

          return (
            <div
              key={cat.slug || cat.title}
              className="group relative flex flex-col justify-end h-[400px] sm:h-[440px] rounded-3xl border border-[#222222] overflow-hidden bg-[#121212] transition-all duration-300 hover:border-[#C5A880] shadow-2xl"
            >
              {/* Category Background Photograph */}
              <div className="absolute inset-0 z-0">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-75 group-hover:opacity-90"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#161616] text-neutral-700">
                    <Layers className="h-12 w-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/45 to-transparent" />
              </div>

              {/* Top Meta Badges */}
              <div className="relative z-10 p-6 self-start flex items-center space-x-2">
                <span className="inline-flex items-center rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-200 border border-white/10">
                  {subcats.length > 0 ? `${subcats.length} Subcategories` : 'Thermal Equipment'}
                </span>
              </div>

              {/* Subcategories Chip Strip */}
              {subcats.length > 0 && (
                <div className="relative z-10 px-6 pb-4 flex flex-wrap gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  {subcats.slice(0, 3).map((sub) => (
                    <Link
                      key={sub.slug || sub.title}
                      href={`/category/${sub.slug}`}
                      className="text-[10px] bg-black/60 hover:bg-[#C5A880] hover:text-[#0A0A0A] text-neutral-300 px-2.5 py-0.5 rounded-md border border-white/10 transition-colors backdrop-blur-sm"
                    >
                      {sub.title}
                    </Link>
                  ))}
                  {subcats.length > 3 && (
                    <span className="text-[10px] text-neutral-400 self-center pl-1">
                      +{subcats.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Thermatec Signature Pinned Gold Bar */}
              <Link
                href={catUrl}
                className="relative z-10 bg-[#C5A880] p-4.5 transition-all duration-300 group-hover:bg-[#D4B890] block"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wider">
                      {cat.title}
                    </h2>
                    <p className="text-[11px] text-[#242424] font-medium mt-0.5">
                      Explore full catalogue & specifications
                    </p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0A0A0A] text-[#C5A880] transition-transform duration-300 group-hover:translate-x-1 shadow-md">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
