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
import { ChevronRight, Sparkles, Layers, ArrowRight, ArrowUpRight } from 'lucide-react';
import ProductCard from '@/components/common/product-card';
import SafeHtml from '@/components/common/safe-html';

const FALLBACK_SCENE_IMAGES = [
  'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-1.webp',
  'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-2.webp',
  'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-3.webp',
  'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/hero-slide-4.webp'
];

export const revalidate = 30;

export async function generateMetadata({ params }) {
  const categorySlug = params.id;
  const [productsData, categoryData] = await Promise.all([
    getCategoryProducts(categorySlug),
    getCategoryDetail(categorySlug)
  ]);

  const category = productsData?.category || categoryData?.category;
  const categoryTitle = category?.title || categorySlug.replace(/-/g, ' ').toUpperCase();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innmotek.com';
  const canonicalUrl = `${siteUrl.replace(/\/+$/, '')}/category/${encodeURIComponent(category?.slug || categorySlug)}`;

  // Smart fallback hierarchy for admin SEO fields:
  const title = category?.seo_title && category.seo_title.trim()
    ? category.seo_title.trim()
    : `${categoryTitle} | Heat Pump Systems & Thermal Solutions | Innmotek`;

  const plainDescription = category?.description ? category.description.replace(/<[^>]*>/g, '').trim() : '';
  const description = category?.seo_description && category.seo_description.trim()
    ? category.seo_description.trim()
    : (plainDescription || `Explore our high-performance ${categoryTitle} models engineered for high thermodynamic COP efficiency, durability, and commercial reliability.`);

  return {
    title,
    description,
    keywords: category?.seo_keyword ? category.seo_keyword.split(',').map(k => k.trim()) : ['heat pumps', categoryTitle, 'thermal engineering'],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: category?.image ? [{ url: category.image, alt: categoryTitle }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: category?.image ? [category.image] : [],
    }
  };
}

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innmotek.com';
  const canonicalUrl = `${siteUrl.replace(/\/+$/, '')}/category/${encodeURIComponent(category?.slug || categorySlug)}`;

  const plainDescription = category?.description ? category.description.replace(/<[^>]*>/g, '').trim() : '';
  const hasDescription = Boolean(plainDescription.length > 0);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: categoryTitle,
    url: canonicalUrl,
    description: plainDescription || `Commercial and residential ${categoryTitle} equipment range by Innmotek.`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((prod, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${siteUrl.replace(/\/+$/, '')}/products/${encodeURIComponent(prod.slug || prod.id)}`,
        name: prod.title,
        image: prod.image || undefined
      }))
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Categories',
        item: `${siteUrl}/category`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: categoryTitle,
        item: canonicalUrl
      }
    ]
  };

  return (
    <div className="space-y-16 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Schema.org CollectionPage & BreadcrumbList Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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

          {hasDescription ? (
            <SafeHtml
              className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ul>li]:text-neutral-300 [&>p]:mb-2"
              html={category.description}
            />
          ) : (
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
              Explore our high-performance {categoryTitle} models engineered for high thermodynamic efficiency, low running cost, and long-term durability.
            </p>
          )}
        </div>
      </div>

      {/* Option 4: Immersive Image Split Navigation (Full-Bleed Panels) */}
      {subCategories.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#202020] pb-3">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-[#C5A880] shadow-sm shadow-[#C5A880]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                Sub-Specialties & Product Lines ({subCategories.length})
              </h2>
            </div>
            <span className="text-[11px] text-[#C5A880] font-mono">
              Explore specialized engineering divisions
            </span>
          </div>

          <div
            className={`grid grid-cols-1 ${
              subCategories.length === 1
                ? 'md:grid-cols-1'
                : subCategories.length === 2
                ? 'md:grid-cols-2'
                : subCategories.length === 3
                ? 'md:grid-cols-3'
                : 'sm:grid-cols-2 lg:grid-cols-3'
            } gap-0 rounded-3xl overflow-hidden border border-[#2B2B2B] bg-[#0E0E0E] min-h-[360px] sm:min-h-[400px] shadow-2xl`}
          >
            {subCategories.map((sub, idx) => {
              const imageSrc = sub.image || FALLBACK_SCENE_IMAGES[idx % FALLBACK_SCENE_IMAGES.length];
              return (
                <Link
                  key={sub.slug}
                  href={`/category/${sub.slug}`}
                  className="group relative h-full min-h-[340px] sm:min-h-[400px] cursor-pointer overflow-hidden border-b sm:border-b-0 sm:border-r last:border-b-0 last:border-r-0 border-[#222222] flex flex-col justify-end p-8 transition-all duration-500"
                >
                  <Image
                    src={imageSrc}
                    alt={sub.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                  {/* Top-Right Floating Arrow Pill */}
                  <div className="absolute top-6 right-6 z-10 h-10 w-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 group-hover:text-[#C5A880] group-hover:border-[#C5A880]/50 group-hover:bg-black/70 group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <div className="relative z-10 space-y-3">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#C5A880] transition-colors uppercase tracking-wider font-display">
                      {sub.title}
                    </h3>
                    <div className="w-12 h-0.5 bg-[#C5A880] group-hover:w-24 transition-all duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Pattern 4 Grid: Products List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#202020] pb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white">
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
