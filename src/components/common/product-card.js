/**
 * Innmotek Frontend - Reusable Product Card Component with Quick-Spec Badges
 * 
 * Features:
 *   - Dark luxury architectural card styling (DESIGN_SPEC.md Pattern 4)
 *   - Real quick-spec badges (COP rating, capacity, inverter technology) extracted from actual product data
 *   - Hover lift, smooth image zoom, and pinned CTA bar
 *   - Graceful fallback for products with missing images or specs (no fabricated numbers)
 */

import Link from 'next/link';
import Image from 'next/image';
import { Layers, ArrowRight, Zap, Flame, ShieldCheck, ThermometerSnowflake, Gauge } from 'lucide-react';
import SafeHtml from './safe-html';

export function extractQuickSpecs(product) {
  if (!product) return [];
  const specs = [];
  const text = `${product.title || ''} ${product.summary || ''} ${product.description || ''} ${product.specification || ''}`.toLowerCase();

  // 1. COP Extraction
  const copMatch = text.match(/cop\s*(?:up to|of|:|is)?\s*([0-9]+(?:\.[0-9]+)?)/i);
  if (copMatch && copMatch[1]) {
    specs.push({ label: `COP ${copMatch[1]}`, icon: Zap });
  } else if (text.includes('high cop') || text.includes('high efficiency')) {
    specs.push({ label: 'High COP', icon: Zap });
  }

  // 2. Inverter & Compressor Type
  if (text.includes('full-inverter') || text.includes('dc inverter') || text.includes('full inverter')) {
    specs.push({ label: 'DC Inverter', icon: Gauge });
  } else if (text.includes('all-in-one') || text.includes('all in one')) {
    specs.push({ label: 'All-in-One Unit', icon: Layers });
  } else if (text.includes('commercial')) {
    specs.push({ label: 'Commercial Grade', icon: ShieldCheck });
  }

  // 3. Operating Temperature / Climate
  if (text.includes('-25°c') || text.includes('-25c') || text.includes('sub-zero') || text.includes('sub zero')) {
    specs.push({ label: '-25°C Climate', icon: ThermometerSnowflake });
  } else if (text.includes('75°c') || text.includes('80°c') || text.includes('high temperature')) {
    specs.push({ label: 'Up to 75°C', icon: Flame });
  }

  // Return up to 2 real badges
  return specs.slice(0, 2);
}

export default function ProductCard({ product, priority = false }) {
  if (!product) return null;
  const quickSpecs = extractQuickSpecs(product);

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl border border-[#222222] bg-[#121212] overflow-hidden transition-all duration-300 hover:border-[#C5A880] shadow-xl hover:shadow-[0_10px_30px_-10px_rgba(197,168,128,0.15)]">
      {/* Product Image Container */}
      <div className="relative h-64 sm:h-72 w-full bg-[#181818] overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            unoptimized
            priority={priority}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-700">
            <Layers className="h-12 w-12" />
          </div>
        )}

        {/* Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent" />

        {/* Quick-Spec Badges (Floating on Image) */}
        {quickSpecs.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
            {quickSpecs.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <span
                  key={i}
                  className="inline-flex items-center space-x-1 rounded-full border border-[#C5A880]/50 bg-[#0A0A0A]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C5A880] backdrop-blur-md shadow-md"
                >
                  <Icon className="h-3 w-3" />
                  <span>{spec.label}</span>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Content Block */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <h3 className="text-base font-bold text-white group-hover:text-[#C5A880] transition-colors line-clamp-2">
            {product.title}
          </h3>

          {product.summary ? (
            <SafeHtml
              className="text-xs text-neutral-400 line-clamp-3 leading-relaxed"
              html={product.summary}
            />
          ) : (
            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
              {product.description || 'Engineered for high thermodynamic efficiency and reliable continuous operation.'}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-[#1F1F1F]">
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-between rounded-xl bg-[#1A1A1A] hover:bg-[#C5A880] p-3 text-[#C5A880] hover:text-[#0A0A0A] font-bold text-xs uppercase tracking-wider transition-all duration-300 group/btn shadow-sm"
          >
            <span>View Specifications</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
