/**
 * Innmotek Frontend - Category Detail Page (/category/:id)
 * 
 * Replaces old CRA Category Detail:
 *   Innmotek-frontend-OLD/src/frontend/categories/categoryDetail.js
 * 
 * Design Reference:
 *   - Pattern 1: Subpage Hero with category title & breadcrumb
 *   - Pattern 4: Product Grid with photo-first cards and gold label bars
 *   - Graceful fallback for empty/custom engineering categories
 */

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCategoryDetail, getCategoryProducts } from '@/lib/api';
import { ChevronRight, Sparkles, Layers, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/common/product-card';
import SafeHtml from '@/components/common/safe-html';

export const revalidate = 30;

export default async function CategoryDetailPage({ params }) {
  const categorySlug = params.id;

  const [productsData, categoryData] = await Promise.all([
    getCategoryProducts(categorySlug),
    getCategoryDetail(categorySlug)
  ]);

  const category = productsData?.category || categoryData?.category;
  const products = productsData?.products || [];
  const subCategories = categoryData?.categories || [];

  if (!category && products.length === 0 && subCategories.length === 0) {
    notFound();
  }

  const categoryTitle = category?.title || categorySlug.replace(/-/g, ' ').toUpperCase();

  return (
    <div className="space-y-16 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Pattern 1: Subpage Hero */}
      <div className="rounded-3xl border border-[#222222] bg-gradient-to-b from-[#161616] to-[#0D0D0D] p-8 sm:p-14 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-neutral-600" />
          <Link href="/category" className="hover:text-white transition-colors">Categories</Link>
          <ChevronRight className="h-3 w-3 text-neutral-600" />
          <span className="text-[#C5A880] font-bold">{categoryTitle}</span>
        </nav>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/40 bg-[#0A0A0A]/80 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
              Product Category
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
            {categoryTitle}
          </h1>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
            {category?.description || `Explore our high-performance ${categoryTitle} models engineered for high thermodynamic efficiency, low running cost, and long-term durability.`}
          </p>
        </div>

        {/* Child Subcategories Chips if applicable */}
        {subCategories.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#222222] space-y-3 relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              Sub-Specialties:
            </p>
            <div className="flex flex-wrap gap-2">
              {subCategories.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/category/${sub.slug}`}
                  className="rounded-xl border border-[#2B2B2B] bg-[#141414] px-4 py-2 text-xs font-semibold text-neutral-200 hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  {sub.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pattern 4 Grid: Products List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#222222] pb-4">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider text-xs">
            Available Models & Equipment ({products.length})
          </h2>
          <span className="text-[11px] text-neutral-500 font-mono">
            Showing all active products
          </span>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.slug || product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Graceful Fallback if Category has No Direct Products */
          <div className="rounded-3xl border border-[#222222] bg-[#121212] p-10 text-center space-y-4 max-w-xl mx-auto my-8">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-full bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                <Layers className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white">Custom Engineering & Sizing</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Standard catalogue units for this category are sized on project demand. Contact our thermal engineering desk for direct sizing, specifications, and pricing.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 rounded-xl bg-[#C5A880] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:bg-[#D4B890] transition-colors"
              >
                <span>Request Custom Sizing</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
