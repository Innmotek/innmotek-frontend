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
  Info,
  ExternalLink
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

  // Parse downloadable documents / brochures / catalogues
  let downloadList = [];
  if (Array.isArray(product.downloads)) {
    downloadList = product.downloads;
  } else if (Array.isArray(product.catalogues)) {
    downloadList = product.catalogues;
  } else if (product.download && typeof product.download === 'string' && product.download.trim() !== '' && product.download !== '<p><br></p>') {
    try {
      const parsed = JSON.parse(product.download);
      downloadList = Array.isArray(parsed) ? parsed : [{ title: `${product.title} - Technical Document`, file: product.download }];
    } catch {
      downloadList = [{ title: `${product.title} - Technical Document`, file: product.download }];
    }
  }

  // Always append Downloads tab so customers can view documents or clean fallback
  availableTabs.push({
    id: 'downloads',
    label: 'Downloads',
    icon: Download,
    isCustom: true
  });

  const [activeTab, setActiveTab] = useState(availableTabs[0]?.id || 'downloads');

  return (
    <div className="space-y-16">
      {/* =========================================================================
          SECTION 1: PATTERN 5 GALLERY & INFO SPLIT
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left: Interactive Media Gallery (7 cols) */}
        <div className="lg:col-span-7 h-full flex flex-col justify-between space-y-4">
          {/* Main Visual Display */}
          <div className="relative flex-1 min-h-[380px] sm:min-h-[440px] w-full rounded-3xl border border-[#222222] bg-[#121212] overflow-hidden shadow-2xl flex items-center justify-center p-6">
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
          </div>

          {/* Thumbnail Strip (Rendered only if multiple images exist) */}
          {allImages.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none shrink-0">
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
        <div className="lg:col-span-5 h-full rounded-3xl border border-[#222222] bg-[#121212] p-8 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
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
                  className="product-cms-summary max-w-none [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-1"
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
            className="product-cms-description text-neutral-300 leading-relaxed max-w-none"
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

                if (tab.id === 'downloads') {
                  return (
                    <div key={tab.id} className="space-y-6 animate-fadeIn">
                      {downloadList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {downloadList.map((item, idx) => {
                            const fileUrl = typeof item === 'string' ? item : (item.file || item.url || item.path || '');
                            const title = (typeof item === 'object' && item.title)
                              ? item.title
                              : `${product.title} - Document ${idx + 1}`;

                            return (
                              <div
                                key={idx}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-[#222222] bg-[#161616] hover:border-[#C5A880]/50 transition-all gap-4"
                              >
                                <div className="flex items-start space-x-3.5">
                                  <div className="h-10 w-10 rounded-xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880] shrink-0 mt-0.5">
                                    <FileText className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-bold text-white leading-snug">
                                      {title}
                                    </h4>
                                    <span className="inline-block mt-1 text-[10px] font-mono uppercase tracking-wider text-[#C5A880] bg-[#C5A880]/10 px-2 py-0.5 rounded">
                                      PDF Document
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-2 shrink-0">
                                  {fileUrl && (
                                    <>
                                      <a
                                        href={fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-[#333333] hover:border-[#C5A880] text-xs font-bold text-neutral-300 hover:text-white transition-all cursor-pointer"
                                      >
                                        <span>View</span>
                                        <ExternalLink className="h-3.5 w-3.5" />
                                      </a>
                                      <a
                                        href={fileUrl}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#C5A880] hover:bg-[#D4B890] text-xs font-bold text-[#0A0A0A] transition-all cursor-pointer"
                                      >
                                        <Download className="h-3.5 w-3.5" />
                                        <span>Download</span>
                                      </a>
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-10 px-4 max-w-md mx-auto space-y-4">
                          <div className="h-12 w-12 rounded-full bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880] mx-auto">
                            <Download className="h-6 w-6" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-base font-bold text-white">No Downloads Found</h3>
                            <p className="text-xs text-neutral-400 leading-relaxed">
                              No digital brochures or specification sheets have been attached to this model yet. Contact our team to receive custom engineering drawings and submittals.
                            </p>
                          </div>
                          <div className="pt-2">
                            <Link
                              href="/contact"
                              className="inline-flex items-center space-x-2 rounded-xl bg-[#C5A880] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:bg-[#D4B890] transition-colors"
                            >
                              <span>Request Technical Package</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

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
            {relatedProducts.slice(0, 4).map((rel) => {
              const relRawSlug = (rel.slug || rel.id || '').toString().trim();
              const relCleanSlug = relRawSlug.replace(/^\/+products\/+/, '').replace(/^\/+/, '');
              const relHref = `/products/${relCleanSlug}`;

              return (
                <Link
                  key={rel.slug || rel.id}
                  href={relHref}
                  className="group rounded-2xl border border-[#222222] bg-[#121212] overflow-hidden flex flex-col justify-between hover:border-[#C5A880] transition-all duration-300 shadow-lg cursor-pointer hover:shadow-[0_10px_30px_rgba(197,168,128,0.15)]"
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
                    <div className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#C5A880] uppercase tracking-wider pt-2 group-hover:underline">
                      <span>Specifications</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
