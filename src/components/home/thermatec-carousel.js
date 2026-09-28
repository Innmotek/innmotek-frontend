'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react';

export default function ThermatecCarousel({ categories = [] }) {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll boundary
  const updateScrollButtons = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  const scroll = useCallback((direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth > 768 ? 380 : 300;
    scrollRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  }, []);

  // Auto-scroll effect: advances every 4 seconds, loops back to start when reaching end
  useEffect(() => {
    if (isPaused || categories.length <= 1) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      // If at or near end, loop back smoothly to start
      if (scrollLeft >= scrollWidth - clientWidth - 20) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const scrollAmount = clientWidth > 768 ? 380 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, categories.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    updateScrollButtons();
    return () => el.removeEventListener('scroll', updateScrollButtons);
  }, [updateScrollButtons]);

  if (!categories || categories.length === 0) return null;

  return (
    <div
      className="space-y-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Horizontal Carousel Track with Subtle Dark Blend Edges */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-4 w-6 sm:w-12 z-20 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-6 sm:w-12 z-20 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />

        <div
          ref={scrollRef}
          className="flex space-x-5 overflow-x-auto scroll-smooth scrollbar-none pb-4 pt-1 px-2 sm:px-4 snap-x snap-mandatory"
        >
          {categories.map((cat) => {
            const catImage = cat.image || 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/9a01b0f1-4db5-45cf-a3fe-8924b1a45749.webp';
            const catHref = `/category/${cat.slug || cat.id}`;

            return (
              <Link
                key={cat.id || cat.slug}
                href={catHref}
                className="group relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] h-[380px] sm:h-[420px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1E1E1E] to-[#141414] border border-[#2B2B2B] hover:border-[#C5A880] transition-all duration-500 shadow-2xl hover:shadow-[0_15px_35px_rgba(197,168,128,0.2)] flex flex-col justify-between snap-start cursor-pointer"
              >
                {/* Top Studio Background Image */}
                <div className="relative w-full flex-1 min-h-[290px] sm:min-h-[320px] bg-[#141414] overflow-hidden">
                  {catImage ? (
                    <Image
                      src={catImage}
                      alt={cat.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-600">
                      <Layers className="h-16 w-16" />
                    </div>
                  )}
                  {/* Elegant bottom vignette fading smoothly above the gold bar */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 via-transparent to-black/15 pointer-events-none" />
                </div>

                {/* Signature Thermatec Gold/Sand Bottom Banner */}
                <div className="relative z-10 bg-[#C5A880] group-hover:bg-[#D4B890] px-5 py-4 transition-colors duration-300 flex items-center justify-between shadow-lg">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0A0A0A] line-clamp-1">
                    {cat.title}
                  </span>
                  <div className="h-7 w-7 rounded-full bg-[#0A0A0A]/90 text-[#C5A880] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Thermatec-Style Navigation Controls (PREVIOUS & NEXT) */}
      <div className="flex items-center justify-between pt-2 border-t border-[#222222]">
        <button
          onClick={() => scroll('prev')}
          disabled={!canScrollLeft}
          className={`inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
            canScrollLeft
              ? 'text-neutral-300 hover:text-[#C5A880] hover:bg-[#1A1A1A] cursor-pointer'
              : 'text-neutral-600 cursor-not-allowed opacity-40'
          }`}
          aria-label="Previous Products"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>PREVIOUS</span>
        </button>

        {/* Subtle Status Dots / Counter */}
        <div className="hidden sm:flex items-center space-x-1.5">
          {categories.map((c, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-neutral-700"
            />
          ))}
        </div>

        <button
          onClick={() => scroll('next')}
          disabled={!canScrollRight}
          className={`inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
            canScrollRight
              ? 'text-neutral-300 hover:text-[#C5A880] hover:bg-[#1A1A1A] cursor-pointer'
              : 'text-neutral-600 cursor-not-allowed opacity-40'
          }`}
          aria-label="Next Products"
        >
          <span>NEXT</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
