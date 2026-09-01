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
import SafeHtml from '@/components/common/safe-html';
import { getCategoryProducts, getCategoryDetail } from '@/lib/api';
import { ArrowRight, ChevronRight, Layers, Flame, PhoneCall, Sparkles } from 'lucide-react';
import { notFound } from 'next/navigation';

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
              <div
                key={product.slug}
                className="group relative flex flex-col justify-between rounded-3xl border border-[#222222] bg-[#121212] overflow-hidden transition-all duration-300 hover:border-[#C5A880] shadow-xl"
              >
                {/* Product Visual Container */}
                <div className="relative h-64 sm:h-72 w-full bg-[#181818] overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-700">
                      <Layers className="h-12 w-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                </div>

                {/* Info Block */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-[#C5A880] transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    {product.summary ? (
                      <SafeHtml
                        className="text-xs text-neutral-400 line-clamp-3 prose prose-invert prose-xs"
                        html={product.summary}
                      />
                    ) : (
                      <p className="text-xs text-neutral-500">
                        High-efficiency commercial and residential thermal performance.
                      </p>
                    )}
                  </div>

                  {/* Thermatec Pinned Action Bar */}
                  <div className="pt-4 border-t border-[#1F1F1F]">
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex items-center justify-between rounded-xl bg-[#1A1A1A] hover:bg-[#C5A880] p-3 text-[#C5A880] hover:text-[#0A0A0A] font-bold text-xs uppercase tracking-wider transition-all duration-300 group/btn"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
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
