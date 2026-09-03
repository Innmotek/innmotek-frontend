/**
 * Innmotek Frontend - Reusable Product Card Component with Quick-Spec Badges
 * 
 * Features:
 *   - Dark luxury architectural card styling (DESIGN_SPEC.md Pattern 4)
 *   - Real quick-spec badges (COP rating, refrigerant, sub-zero climate, inverter, capacity)
 *   - Badges rendered both floating on thumbnail and inside card content header
 *   - Graceful fallback for products with missing data (no fabricated numbers)
 */

import Link from 'next/link';
import Image from 'next/image';
import { Layers, ArrowRight, Zap, Flame, ShieldCheck, ThermometerSnowflake, Gauge, Sparkles, Wind } from 'lucide-react';
import SafeHtml from './safe-html';

export function extractQuickSpecs(product) {
  if (!product) return [];
  const specs = [];
  const text = `${product.title || ''} ${product.summary || ''} ${product.description || ''} ${product.specification || ''}`.toLowerCase();

  // 1. Exact COP Extraction (e.g. "4.25 COP" or "COP 4.2")
  const copMatch = text.match(/([0-9]+(?:\.[0-9]+)?)\s*cop|cop\s*(?:up to|of|:|is)?\s*([0-9]+(?:\.[0-9]+)?)/i);
  if (copMatch) {
    const val = copMatch[1] || copMatch[2];
    if (val && Number(val) > 1 && Number(val) < 10) {
      specs.push({ label: `COP ${val}`, icon: Zap, color: 'text-amber-300 border-amber-500/40 bg-amber-950/40' });
    }
  } else if (text.includes('high cop') || text.includes('high efficiency') || text.includes('high-efficiency')) {
    specs.push({ label: 'High Efficiency', icon: Sparkles, color: 'text-[#C5A880] border-[#C5A880]/40 bg-[#C5A880]/10' });
  }

  // 2. Refrigerant & Inverter Type
  if (text.includes('r290')) {
    specs.push({ label: 'R290 Eco', icon: Wind, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40' });
  } else if (text.includes('r410a')) {
    specs.push({ label: 'R410A Eco Fluid', icon: Wind, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40' });
  } else if (text.includes('r32')) {
    specs.push({ label: 'R32 Inverter', icon: Gauge, color: 'text-blue-400 border-blue-500/40 bg-blue-950/40' });
  } else if (text.includes('all-inverter') || text.includes('dc inverter') || text.includes('full inverter')) {
    specs.push({ label: 'DC Inverter', icon: Gauge, color: 'text-sky-400 border-sky-500/40 bg-sky-950/40' });
  } else if (text.includes('split air-source') || text.includes('split heat pump')) {
    specs.push({ label: 'Split Air-Source', icon: Layers, color: 'text-neutral-300 border-neutral-700 bg-neutral-900' });
  }

  // 3. Operating Climate / Temperature / Power Specs
  if (text.includes('-25°c') || text.includes('-25c') || text.includes('down to -25')) {
    specs.push({ label: '-25°C Sub-Zero', icon: ThermometerSnowflake, color: 'text-sky-300 border-sky-500/40 bg-sky-950/40' });
  } else if (text.includes('85°c') || text.includes('75°c')) {
    const tempMatch = text.match(/([0-9]{2})°c/);
    specs.push({ label: `${tempMatch ? tempMatch[1] : '85'}°C High-Temp`, icon: Flame, color: 'text-orange-400 border-orange-500/40 bg-orange-950/40' });
  } else if (text.includes('wood-fired') || text.includes('wood fired') || text.includes('wood burning') || text.includes('wood fire')) {
    specs.push({ label: 'Wood-Fired Thermal', icon: Flame, color: 'text-amber-400 border-amber-500/40 bg-amber-950/40' });
  } else if (text.includes('infrared') || text.includes('patio heater')) {
    specs.push({ label: 'Infrared Radiant', icon: Zap, color: 'text-orange-300 border-orange-500/40 bg-orange-950/40' });
  } else if (text.includes('carbon steel') || text.includes('glass lined') || text.includes('stainless steel')) {
    specs.push({ label: 'Commercial Grade', icon: ShieldCheck, color: 'text-neutral-300 border-neutral-700 bg-neutral-900' });
  }

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

        {/* Floating Badges Overlay on Image */}
        {quickSpecs.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {quickSpecs.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <span
                  key={i}
                  className={`inline-flex items-center space-x-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg ${spec.color}`}
                >
                  <Icon className="h-3 w-3 shrink-0" />
                  <span>{spec.label}</span>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Content Block */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Quick-Spec Badges Row in Body Header */}
          {quickSpecs.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {quickSpecs.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <span
                    key={i}
                    className={`inline-flex items-center space-x-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wide ${spec.color}`}
                  >
                    <Icon className="h-2.5 w-2.5 shrink-0" />
                    <span>{spec.label}</span>
                  </span>
                );
              })}
            </div>
          )}

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
