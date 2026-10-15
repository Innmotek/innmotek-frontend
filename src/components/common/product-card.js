/**
 * Innmotek Frontend - Reusable Product Card Component
 * 
 * Features:
 *   - Dark luxury architectural card styling (DESIGN_SPEC.md Pattern 4)
 *   - Uniform, future-proof alignment across all product cards
 *   - Clean typography with consistent title height and luxury styling
 *   - "View Specifications" CTA strip (no B2C price tags)
 */

import Link from 'next/link';
import Image from 'next/image';
import { Layers, ArrowRight } from 'lucide-react';
import SafeHtml from './safe-html';

export default function ProductCard({ product, priority = false }) {
  if (!product) return null;
  
  // Sanitize slug to prevent duplicate /products/ segments
  const rawSlug = (product.slug || product.id || '').toString().trim();
  const cleanSlug = rawSlug.replace(/^\/+products\/+/, '').replace(/^\/+/, '');
  const productHref = `/products/${cleanSlug}`;

  return (
    <Link
      href={productHref}
      className="group relative flex flex-col justify-between rounded-3xl border border-[#222222] bg-[#121212] overflow-hidden transition-all duration-300 hover:border-[#C5A880] shadow-xl hover:shadow-[0_12px_35px_-10px_rgba(197,168,128,0.2)] cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative h-64 sm:h-72 w-full bg-[#181818] overflow-hidden flex items-center justify-center p-3">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            unoptimized
            priority={priority}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-700">
            <Layers className="h-12 w-12" />
          </div>
        )}

        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Product Content Block */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white group-hover:text-[#C5A880] transition-colors line-clamp-2 min-h-[3rem] flex items-center">
            {product.title}
          </h3>

          {product.summary ? (
            <SafeHtml
              className="text-xs text-neutral-400 line-clamp-3 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-1 [&_li]:leading-relaxed"
              html={product.summary}
            />
          ) : (
            <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
              {product.description || 'Engineered for high thermodynamic efficiency and reliable continuous operation.'}
            </p>
          )}
        </div>

        {/* Action Button Strip */}
        <div className="pt-4 border-t border-[#1F1F1F]">
          <div className="flex items-center justify-between rounded-xl bg-[#1A1A1A] group-hover:bg-[#C5A880] p-3 text-[#C5A880] group-hover:text-[#0A0A0A] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm">
            <span>View Specifications</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

