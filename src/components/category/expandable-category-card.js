'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Layers, ChevronDown, ChevronUp } from 'lucide-react';

export default function ExpandableCategoryCard({ cat }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const subcats = cat.subCategory || [];
  const catUrl = `/category/${cat.slug || cat.id}`;

  const displayedSubs = expanded ? subcats : subcats.slice(0, 3);
  const hiddenCount = subcats.length - 3;

  function handleCardClick(e) {
    // If user clicked an inner link or toggle button, let that handle it
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    router.push(catUrl);
  }

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col justify-end h-[400px] sm:h-[440px] rounded-3xl border border-[#222222] overflow-hidden bg-[#121212] transition-all duration-300 hover:border-[#C5A880] shadow-2xl hover:shadow-[0_15px_40px_-10px_rgba(197,168,128,0.25)] cursor-pointer"
    >
      {/* Category Background Photograph */}
      <div className="absolute inset-0 z-0">
        {cat.image ? (
          <Image
            src={cat.image}
            alt={cat.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-95"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#161616] text-neutral-700">
            <Layers className="h-12 w-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/45 to-transparent" />
      </div>

      {/* Top Meta Badges */}
      <div className="relative z-10 p-6 self-start flex items-center space-x-2">
        <span className="inline-flex items-center rounded-full bg-black/70 backdrop-blur-md px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-200 border border-white/10">
          {subcats.length > 0 ? `${subcats.length} Sub-Specialties` : 'Equipment Line'}
        </span>
      </div>

      {/* Subcategories Chip Strip with Expandable +N */}
      {subcats.length > 0 && (
        <div className="relative z-10 px-6 pb-4 flex flex-wrap gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          {displayedSubs.map((sub) => (
            <Link
              key={sub.slug || sub.title}
              href={`/category/${sub.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] font-medium bg-black/75 hover:bg-[#C5A880] hover:text-[#0A0A0A] text-neutral-200 px-3 py-1 rounded-lg border border-white/15 transition-all backdrop-blur-md shadow-sm"
            >
              {sub.title}
            </Link>
          ))}

          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="inline-flex items-center space-x-1 text-[10px] font-bold bg-[#C5A880]/20 hover:bg-[#C5A880] text-[#C5A880] hover:text-[#0A0A0A] px-2.5 py-1 rounded-lg border border-[#C5A880]/40 transition-all backdrop-blur-md cursor-pointer"
            >
              <span>{expanded ? 'Show Less' : `+${hiddenCount} More`}</span>
              {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
          )}
        </div>
      )}

      {/* Thermatec Signature Pinned Gold Bar (Clean - Removed Clutter Subtitle) */}
      <div className="relative z-10 bg-[#C5A880] p-4.5 transition-all duration-300 group-hover:bg-[#D4B890] flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-sm font-extrabold text-[#0A0A0A] uppercase tracking-wider line-clamp-1">
            {cat.title}
          </h2>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0A0A0A] text-[#C5A880] transition-transform duration-300 group-hover:translate-x-1 shadow-md shrink-0">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
