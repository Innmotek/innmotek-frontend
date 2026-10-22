/**
 * Innmotek Frontend - Product Detail Page (/products/:id)
 * 
 * Replaces old CRA Product Detail:
 *   Innmotek-frontend-OLD/src/frontend/products/index.js
 * 
 * Design Reference:
 *   - Pattern 5: Gallery + Info Split (DESIGN_SPEC.md)
 *   - Pattern 6: Specification Matrix & Technical Documentation Tabs
 *   - Related Products Carousel/Grid
 *   - Graceful fallback for null specification/installation/warranty fields
 */

import Link from 'next/link';
import { getProductDetail } from '@/lib/api';
import { ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import ProductInteractive from './product-interactive';

export const revalidate = 30;

export async function generateMetadata({ params }) {
  const productSlug = params.id;
  const data = await getProductDetail(productSlug);
  const product = data?.product;

  if (!product) {
    return {
      title: 'Equipment Detail',
      description: 'Engineered thermal systems and heat pump solutions by Innmotek.'
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innmotek.com';
  const canonicalUrl = `${siteUrl.replace(/\/+$/, '')}/products/${encodeURIComponent(product.slug || productSlug)}`;

  // Smart fallback hierarchy for admin SEO fields:
  const title = product.seo_title && product.seo_title.trim()
    ? product.seo_title.trim()
    : `${product.title} | Innmotek Thermal Engineering`;

  const cleanSummary = product.summary ? product.summary.replace(/<[^>]*>?/gm, '').trim() : '';
  const cleanDesc = product.description ? product.description.replace(/<[^>]*>?/gm, '').slice(0, 160).trim() : '';
  const description = product.seo_description && product.seo_description.trim()
    ? product.seo_description.trim()
    : (cleanSummary || cleanDesc || `Explore specifications, COP efficiency, and engineering details for ${product.title} by Innmotek.`);

  return {
    title,
    description,
    keywords: product.seo_keyword ? product.seo_keyword.split(',').map(k => k.trim()) : ['heat pump', 'thermal equipment', product.title],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: product.image ? [{ url: product.image, alt: product.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.image ? [product.image] : [],
    }
  };
}

export default async function ProductDetailPage({ params }) {
  const productSlug = params.id;
  const data = await getProductDetail(productSlug);

  if (!data || !data.product) {
    notFound();
  }

  const product = data.product;
  const relatedProducts = data.products || [];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innmotek.com';
  const canonicalUrl = `${siteUrl.replace(/\/+$/, '')}/products/${encodeURIComponent(product.slug || productSlug)}`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.image ? [product.image] : [],
    description: (product.summary || product.description || '').replace(/<[^>]*>?/gm, '').slice(0, 500) || `${product.title} high efficiency thermal equipment.`,
    sku: `INM-${product.slug || product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Innmotek'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Innmotek LLP',
      url: siteUrl
    },
    category: product.category?.title || 'Heat Pump Systems',
    offers: {
      '@type': 'Offer',
      url: canonicalUrl,
      priceCurrency: 'INR',
      price: '0',
      priceValidUntil: '2028-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Innmotek LLP'
      }
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
        name: 'Products',
        item: `${siteUrl}/category`
      },
      ...(product.category ? [{
        '@type': 'ListItem',
        position: 3,
        name: product.category.title,
        item: `${siteUrl}/category/${encodeURIComponent(product.category.slug)}`
      }] : []),
      {
        '@type': 'ListItem',
        position: product.category ? 4 : 3,
        name: product.title,
        item: canonicalUrl
      }
    ]
  };

  return (
    <div className="space-y-8 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Schema.org Product & BreadcrumbList Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Complete Breadcrumb Hierarchy (Home > Products > Category > Full Product Name) */}
      <nav className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400 overflow-x-auto whitespace-nowrap scrollbar-none pb-2">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3 text-neutral-600 shrink-0" />
        <Link href="/category" className="hover:text-white transition-colors">Products</Link>
        {product.category && (
          <>
            <ChevronRight className="h-3 w-3 text-neutral-600 shrink-0" />
            <Link href={`/category/${product.category.slug}`} className="hover:text-white transition-colors">
              {product.category.title}
            </Link>
          </>
        )}
        <ChevronRight className="h-3 w-3 text-neutral-600 shrink-0" />
        <span className="text-[#C5A880] font-bold">{product.title}</span>
      </nav>

      {/* Product Interactive Core */}
      <ProductInteractive product={product} relatedProducts={relatedProducts} />
    </div>
  );
}

