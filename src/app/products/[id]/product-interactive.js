/**
 * Innmotek Frontend - Product Interactive Client Component
 * 
 * Handles:
 * - Multi-image gallery with active thumbnail switcher
 * - Dynamic Technical Tabs (Specification, Installation, Warranty)
 * - Direct 1:1 schema mapping (specification, installation, warrenty normalized at DB level)
 * - Graceful fallback when spec fields are null
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Shield,
  Wrench,
  FileText,
  Layers,
  ChevronRight,
  ArrowRight,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  Download,
  Info
} from 'lucide-react';
import SafeHtml from '@/components/common/safe-html';

export default function ProductInteractive({ product, relatedProducts = [] }) {
  // Gallery setup: main image + gallery images
  const allImages = [];
  if (product.image) allImages.push(product.image);
  if (product.images && Array.isArray(product.images)) {
    product.images.forEach(img => {
      const url = typeof img === 'string' ? img : img.image;
      if (url && !allImages.includes(url)) {
        allImages.push(url);
      }
    });
  }

  const [activeImage, setActiveImage] = useState(allImages[0] || null);

  // Available technical tabs (Direct 1:1 mapping from normalized SQL dump)
  const availableTabs = [];

  const specContent = (product.specification && product.specification.trim() !== '' && product.specification !== '<p><br></p>')
    ? product.specification
    : null;

  const installContent = (product.installation && product.installation.trim() !== '' && product.installation !== '<p><br></p>')
    ? product.installation
    : null;

  const warrantyContent = (product.warrenty && product.warrenty.trim() !== '' && product.warrenty !== '<p><br></p>')
    ? product.warrenty
    : null;

  if (specContent) {
    availableTabs.push({ id: 'spec', label: 'Technical Specifications', icon: FileText, content: specContent });
  }
  if (installContent) {
    availableTabs.push({ id: 'install', label: 'Installation Guidelines', icon: Wrench, content: installContent });
  }
  if (warrantyContent) {
    availableTabs.push({ id: 'warranty', label: 'Warranty Policy', icon: Shield, content: warrantyContent });
  }

  const [activeTab, setActiveTab] = useState(availableTabs[0]?.id || null);

  return (
    <div className="space-y-16">
      {/* =========================================================================
          SECTION 1: PATTERN 5 GALLERY & INFO SPLIT
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Interactive Media Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Display */}
          <div className="relative h-[380px] sm:h-[480px] w-full rounded-3xl border border-[#222222] bg-[#121212] overflow-hidden shadow-2xl flex items-center justify-center">
            {activeImage ? (
              <Image
                src={activeImage}
                alt={product.title}
                fill
                className="object-contain p-6 transition-all duration-300"
                priority
                unoptimized
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-neutral-600 space-y-2">
                <Layers className="h-16 w-16" />
                <span className="text-xs uppercase tracking-wider">Product Visual</span>
              </div>
            )}
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C5A880] border border-[#C5A880]/30">
                Innmotek Certified
              </span>
            </div>
          </div>

          {/* Thumbnail Strip (Rendered only if multiple images exist) */}
          {allImages.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative h-20 w-20 shrink-0 rounded-2xl border overflow-hidden transition-all duration-200 bg-[#141414] ${
                    activeImage === img
                      ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30 scale-95'
                      : 'border-[#262626] opacity-70 hover:opacity-100 hover:border-neutral-500'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Equipment Specifications & Inquiry (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-[#222222] bg-[#121212] p-8 space-y-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                <Sparkles className="h-3 w-3" />
                <span>Thermal Engineering</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
              {product.title}
            </h1>
          </div>

          {/* Summary / Highlights */}
          {product.summary && (
            <div className="rounded-2xl border border-[#222222] bg-[#171717] p-4 text-xs text-neutral-300 leading-relaxed">
              <SafeHtml
                className="prose prose-invert prose-xs max-w-none [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-1"
                html={product.summary}
              />
            </div>
          )}

          {/* Key Value Proposition Badges */}
          <div className="space-y-2.5 pt-1 text-xs">
            {[
              'Direct factory warranty and genuine parts guarantee',
              'High COP thermodynamic performance across extreme temperatures',
              'Comprehensive sizing, CFD analysis & installation support'
            ].map((text, i) => (
              <div key={i} className="flex items-start space-x-2.5 text-neutral-300">
                <CheckCircle2 className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-[#1F1F1F]">
            <Link
              href="/contact"
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-[#C5A880] py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:bg-[#D4B890] transition-all shadow-md shadow-[#C5A880]/15"
            >
              <span>Request System Sizing & Price</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="tel:+918081741031"
              className="w-full flex items-center justify-center space-x-2 rounded-xl border border-[#333333] bg-[#181818] py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:border-[#C5A880] transition-colors"
            >
              <PhoneCall className="h-4 w-4 text-[#C5A880]" />
              <span>Direct Line: +91 808 1741031</span>
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: FULL DESCRIPTION
          ========================================================================= */}
      {product.description && (
        <div className="rounded-3xl border border-[#222222] bg-[#121212] p-8 sm:p-12 space-y-6 shadow-xl">
          <div className="flex items-center space-x-2 border-b border-[#222222] pb-4">
            <h2 className="text-xl font-bold text-white font-display">Product Overview & Features</h2>
          </div>
          <SafeHtml
            className="text-xs sm:text-sm text-neutral-300 leading-relaxed prose prose-invert max-w-none [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul>li]:mb-1 [&>strong]:text-white [&>h3]:text-white [&>h4]:text-white"
            html={product.description}
          />
        </div>
      )}

      {/* =========================================================================
          SECTION 3: PATTERN 6 SPECIFICATION MATRIX & TECHNICAL TABS
          ========================================================================= */}
      <div className="space-y-6">
        <div className="border-b border-[#222222] pb-4">
          <h2 className="text-xl font-bold text-white font-display">
            Technical Matrix & Engineering Documents
          </h2>
        </div>

        {availableTabs.length > 0 ? (
          <div className="rounded-3xl border border-[#222222] bg-[#121212] overflow-hidden shadow-xl">
            {/* Tab Headers */}
            <div className="flex border-b border-[#222222] bg-[#161616] overflow-x-auto scrollbar-none">
              {availableTabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2.5 px-6 py-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                      isActive
                        ? 'border-[#C5A880] text-[#C5A880] bg-[#121212]'
                        : 'border-transparent text-neutral-400 hover:text-white hover:bg-[#1A1A1A]'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content Area */}
            <div className="p-8 sm:p-12">
              {availableTabs.map((tab) => {
                if (tab.id !== activeTab) return null;
                return (
                  <SafeHtml
                    key={tab.id}
                    className="text-xs sm:text-sm text-neutral-300 leading-relaxed prose prose-invert max-w-none [&>table]:w-full [&>table]:border [&>table]:border-[#262626] [&>table_th]:border [&>table_th]:border-[#262626] [&>table_th]:p-3 [&>table_th]:bg-[#181818] [&>table_td]:border [&>table_td]:border-[#262626] [&>table_td]:p-3"
                    html={tab.content}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          /* Graceful Fallback Card when specification / installation / warranty are null */
          <div className="rounded-3xl border border-[#222222] bg-[#121212] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-2xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880] shrink-0 mt-1">
                <Info className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Technical Data Sheet & Sizing Available
                </h3>
                <p className="text-xs text-neutral-400 max-w-xl">
                  Detailed dimensional drawings, CFD diagrams, electrical hookup schematics, and performance curves for this model are provided with our engineering sizing proposal.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 rounded-xl bg-[#1F1F1F] hover:bg-[#C5A880] border border-[#333333] hover:border-[#C5A880] px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-[#0A0A0A] transition-all shrink-0"
            >
              <span>Request Technical Specs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      {/* =========================================================================
          SECTION 4: RELATED PRODUCTS CAROUSEL / GRID
          ========================================================================= */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-[#222222] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                Related Equipment
              </span>
              <h2 className="text-xl font-bold text-white font-display">
                Complementary Systems in this Category
              </h2>
            </div>
            <Link
              href="/category"
              className="text-xs font-bold uppercase tracking-wider text-[#C5A880] hover:text-[#D4B890] flex items-center space-x-1"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <div
                key={rel.slug}
                className="group rounded-2xl border border-[#222222] bg-[#121212] overflow-hidden flex flex-col justify-between hover:border-[#C5A880] transition-all shadow-lg"
              >
                <div className="relative h-48 w-full bg-[#181818] overflow-hidden">
                  {rel.image ? (
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-700">
                      <Layers className="h-8 w-8" />
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <h3 className="text-xs font-bold text-white group-hover:text-[#C5A880] transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                  <Link
                    href={`/products/${rel.slug}`}
                    className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#C5A880] uppercase tracking-wider pt-2 hover:underline"
                  >
                    <span>Specifications</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
