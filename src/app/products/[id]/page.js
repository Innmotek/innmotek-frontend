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

export default async function ProductDetailPage({ params }) {
  const productSlug = params.id;
  const data = await getProductDetail(productSlug);

  if (!data || !data.product) {
    notFound();
  }

  const product = data.product;
  const relatedProducts = data.products || [];

  return (
    <div className="space-y-8 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Bar */}
      <nav className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400 overflow-x-auto whitespace-nowrap scrollbar-none pb-2">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3 text-neutral-600 shrink-0" />
        <Link href="/category" className="hover:text-white transition-colors">Categories</Link>
        <ChevronRight className="h-3 w-3 text-neutral-600 shrink-0" />
        <span className="text-[#C5A880] font-bold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Product Interactive Core */}
      <ProductInteractive product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
