'use client';

/**
 * Innmotek Frontend - Hero Media Slider Engine
 * 
 * Dynamic Control via Live Hero Config:
 * - Media Mode: 'image' (Images only) | 'video' (Videos only) | 'both' (Combo)
 * - Layout Mode: 'single' (Single visual/video) | 'carousel' (Multi-slide slideshow)
 * - Transition Engine: 'default' (Simple crossfade) | 'animation' (Cinematic animations)
 * - Animation Styles: 'ken_burns' | 'slide' | 'zoom' | 'parallax'
 * - Auto-Play Interval: Configurable (4s, 6s, 8s, 10s)
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';

const DEFAULT_SLIDES = [
  {
    id: 1,
    title: 'Sustainable Thermal Engineering',
    description: 'Pioneering ultra-low energy heat pumps and clean thermal storage engineered for extreme climates.',
    image: '/images/banners/hero-slide-1.webp',
    media_type: 'image',
    animation_type: 'ken_burns'
  },
  {
    id: 2,
    title: 'Aerothermal Heating & Cooling',
    description: 'Advanced thermodynamic efficiency delivering 4.2+ COP coefficients for residential & commercial spaces.',
    image: '/images/banners/hero-slide-2.webp',
    media_type: 'image',
    animation_type: 'ken_burns'
  },
  {
    id: 3,
    title: 'Precision Climate Control',
    description: 'Intelligent multi-zone thermal management designed with quiet variable-inverter technology.',
    image: '/images/banners/hero-slide-3.webp',
    media_type: 'image',
    animation_type: 'ken_burns'
  },
  {
    id: 4,
    title: 'Next-Gen Thermal Performance',
    description: 'Architectural heating innovation built for durability, efficiency, and zero direct fossil emissions.',
    image: '/images/banners/hero-slide-4.webp',
    media_type: 'image',
    animation_type: 'ken_burns'
  }
];

export default function HeroSlider({ banners = [], config = {} }) {
  // Read live hero config settings
  const mediaMode = config.media_mode || 'image'; // 'image' | 'video' | 'both'
  const layoutMode = config.layout_mode || 'carousel'; // 'single' | 'carousel'
  const transitionEngine = config.transition_engine || 'animation'; // 'default' | 'animation'
  const globalAnimationType = (transitionEngine === 'default') ? 'default' : (config.animation_type || 'ken_burns');
  const slideDuration = (Number(config.interval_seconds) || 6) * 1000;

  // Filter slides based on mediaMode
  const rawList = (banners && banners.length > 0)
    ? banners.map((b, idx) => ({
        id: b.id || idx + 1,
        title: b.title || 'Advanced Thermal Engineering',
        description: b.description || 'Pioneering ultra-low energy heat pumps and clean thermal systems.',
        url: b.url || b.link_url || '',
        image: b.image || `/images/banners/hero-slide-${(idx % 4) + 1}.webp`,
        media_type: b.media_type || (b.video_url ? 'video' : 'image'),
        video_url: b.video_url || null,
        animation_type: b.animation_type || globalAnimationType
      }))
    : DEFAULT_SLIDES;

  let filteredSlides = rawList.filter(slide => {
    const isVideo = slide.media_type === 'video' || !!slide.video_url;
    if (mediaMode === 'image') return !isVideo;
    if (mediaMode === 'video') return isVideo;
    return true; // 'both'
  });

  if (filteredSlides.length === 0) filteredSlides = rawList;

  // If single presentation mode is selected, render only the first item
  const slides = (layoutMode === 'single') ? [filteredSlides[0]] : filteredSlides;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'
  const isMultiple = slides.length > 1;

  // Reset index if slides array shrinks
  useEffect(() => {
    if (currentIndex >= slides.length) {
      setCurrentIndex(0);
    }
  }, [slides.length, currentIndex]);

  const nextSlide = useCallback(() => {
    if (!isMultiple) return;
    setDirection('next');
    setCurrentIndex(prev => (prev + 1) % slides.length);
  }, [isMultiple, slides.length]);

  const prevSlide = useCallback(() => {
    if (!isMultiple) return;
    setDirection('prev');
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
  }, [isMultiple, slides.length]);

  const goToSlide = (idx) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 'next' : 'prev');
    setCurrentIndex(idx);
  };

  // Auto-play interval
  useEffect(() => {
    if (!isMultiple || isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, slideDuration);

    return () => clearInterval(timer);
  }, [isMultiple, isPaused, nextSlide, slideDuration]);

  // Current active slide
  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <section
      className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden select-none group/hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Innmotek Hero Showcase"
    >
      {/* =========================================================================
          BACKGROUND MEDIA SLIDES ENGINE
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0A0A0A]">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          const slideAnim = globalAnimationType;

          // Animation style class mapping
          let transitionClass = '';
          if (slideAnim === 'slide') {
            transitionClass = isActive
              ? 'translate-x-0 opacity-100 transition-all duration-1000 ease-out z-10'
              : direction === 'next'
                ? '-translate-x-full opacity-0 transition-all duration-1000 ease-in z-0'
                : 'translate-x-full opacity-0 transition-all duration-1000 ease-in z-0';
          } else if (slideAnim === 'zoom') {
            transitionClass = isActive
              ? 'scale-100 opacity-100 transition-all duration-1200 cubic-bezier(0.16, 1, 0.3, 1) z-10'
              : 'scale-90 opacity-0 transition-all duration-1200 ease-in-out z-0 pointer-events-none';
          } else if (slideAnim === 'parallax') {
            transitionClass = isActive
              ? 'translate-y-0 opacity-100 transition-all duration-1000 ease-out z-10'
              : 'translate-y-8 opacity-0 transition-all duration-1000 ease-in z-0';
          } else if (slideAnim === 'default') {
            // Clean fade slideshow
            transitionClass = isActive
              ? 'opacity-100 transition-opacity duration-700 ease-in-out z-10'
              : 'opacity-0 transition-opacity duration-700 ease-in-out z-0 pointer-events-none';
          } else {
            // Default: 'ken_burns'
            transitionClass = isActive
              ? 'opacity-100 transition-opacity duration-1000 ease-in-out z-10'
              : 'opacity-0 transition-opacity duration-1000 ease-in-out z-0 pointer-events-none';
          }

          return (
            <div
              key={slide.id || idx}
              className={`absolute inset-0 w-full h-full will-change-transform ${transitionClass}`}
            >
              {slide.media_type === 'video' && (slide.video_url || slide.image) ? (
                <video
                  src={slide.video_url || slide.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className={`relative w-full h-full overflow-hidden ${
                  isActive && (slideAnim === 'ken_burns' || slideAnim === 'cinematic_zoom') ? 'animate-kenBurns' : ''
                }`}>
                  <Image
                    src={slide.image}
                    alt={slide.title || 'Innmotek Thermal Engineering'}
                    fill
                    className="object-cover object-center"
                    priority={idx === 0}
                    unoptimized
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Cinematic Vignette Layers */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #0A0A0A 8%, rgba(10, 10, 10, 0.45) 55%, rgba(10, 10, 10, 0.85) 100%)'
          }}
        />
        <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0A0A]/40 to-[#0A0A0A]/95" />
      </div>

      {/* =========================================================================
          FOREGROUND CONTENT & TYPOGRAPHY
          ========================================================================= */}
      <div className="relative z-30 max-w-5xl mx-auto text-center space-y-8 animate-fadeIn pt-4 sm:pt-8">
        {/* Display Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-display drop-shadow-md">
          ADVANCING INTO NEW <br />
          <span className="gold-gradient-text">WAY OF HEATING</span>
        </h1>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href={currentSlide?.url || '/#categories'}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-[#C5A880] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:bg-[#D4B890] transition-all shadow-xl shadow-[#C5A880]/20 group"
          >
            <span>Explore Products</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-[#333333] bg-[#0A0A0A]/80 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md hover:border-[#C5A880] transition-all"
          >
            <span>Request Sizing Assessment</span>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          SLIDESHOW CONTROLS & PROGRESS INDICATORS (If multiple slides)
          ========================================================================= */}
      {isMultiple && (
        <>
          {/* Subtle Arrow Controls (Fade in on hover) */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full border border-[#2E2E2E] bg-[#0A0A0A]/60 text-white/70 backdrop-blur-md transition-all opacity-0 group-hover/hero:opacity-100 hover:bg-[#C5A880] hover:text-[#0A0A0A] hover:border-[#C5A880]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full border border-[#2E2E2E] bg-[#0A0A0A]/60 text-white/70 backdrop-blur-md transition-all opacity-0 group-hover/hero:opacity-100 hover:bg-[#C5A880] hover:text-[#0A0A0A] hover:border-[#C5A880]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Bottom Progress Bars & Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3">
            {slides.map((_, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="group py-2 focus:outline-none"
                >
                  <div
                    className={`h-1 rounded-full transition-all duration-500 overflow-hidden ${
                      active
                        ? 'w-10 bg-[#C5A880] shadow-[0_0_8px_rgba(197,168,128,0.5)]'
                        : 'w-3 bg-neutral-600/60 group-hover:bg-neutral-400 group-hover:w-6'
                    }`}
                  >
                    {active && !isPaused && (
                      <div
                        className="h-full bg-white/40 animate-slideProgress"
                        style={{ animationDuration: `${slideDuration}ms` }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
