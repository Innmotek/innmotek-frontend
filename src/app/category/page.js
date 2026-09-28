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
import { Sparkles } from 'lucide-react';
import ExpandableCategoryCard from '@/components/category/expandable-category-card';

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
          Equipment Categories
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Explore our complete range of high-efficiency heat pumps, solar thermal systems, buffer vessels, and clean energy heating solutions.
        </p>
      </div>

      {/* Photo-First Grid with Interactive Expandable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((cat) => (
          <ExpandableCategoryCard key={cat.slug || cat.title || cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
}
