/**
 * Innmotek Frontend - Technical Journal & Blogs Index (/blogs)
 * 
 * Replaces old CRA Blogs:
 *   Innmotek-frontend-OLD/src/frontend/blogs/index.js
 * 
 * Design Reference:
 *   - Pattern 4: Photo-First Editorial Grid with gold accents (DESIGN_SPEC.md)
 *   - Live data dynamically loaded from /api/blogs
 */

import Link from 'next/link';
import Image from 'next/image';
import { getBlogs } from '@/lib/api';
import { ArrowRight, Calendar, User, Sparkles, BookOpen, Clock } from 'lucide-react';

export const revalidate = 30;

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-16 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/40 bg-[#0A0A0A]/80 px-3.5 py-1 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
            Engineering Journal & Research
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
          Thermal Insights & Clean Tech
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          In-depth engineering articles on heat pump COP optimization, sub-zero cold climate heating, CFD simulations, and sustainable HVAC architecture.
        </p>
      </div>

      {/* Pattern 4 Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <article
            key={blog.slug || blog.id}
            className="group rounded-3xl border border-[#222222] bg-[#121212] overflow-hidden flex flex-col justify-between hover:border-[#C5A880] transition-all duration-300 shadow-xl"
          >
            {/* Article Image Container */}
            <div className="relative h-56 sm:h-64 w-full bg-[#181818] overflow-hidden">
              {blog.image ? (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-neutral-700 bg-[#161616]">
                  <BookOpen className="h-10 w-10" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center rounded-full bg-black/75 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C5A880] border border-white/10">
                  {blog.category || 'Thermal Engineering'}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2.5">
                {/* Meta Bar */}
                <div className="flex items-center space-x-4 text-[11px] font-mono text-neutral-400">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#C5A880]" />
                    <span>{blog.date || 'Published'}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="h-3.5 w-3.5 text-neutral-500" />
                    <span>5 min read</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-2">
                  <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                </h2>

                {/* Summary */}
                {blog.summary && (
                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                    {blog.summary.replace(/<[^>]*>?/gm, '')}
                  </p>
                )}
              </div>

              {/* Pinned Read Article CTA */}
              <div className="pt-4 border-t border-[#1C1C1C]">
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#C5A880] group-hover:text-[#D4B890] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
