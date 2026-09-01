/**
 * Innmotek Frontend - Blog Article Reader (/blogs/:id)
 * 
 * Replaces old CRA Blog Detail:
 *   Innmotek-frontend-OLD/src/frontend/blogs/blogDetail.js
 * 
 * Design Reference:
 *   - Pattern 1: Subpage Hero with metadata & breadcrumbs
 *   - Editorial Typography: High-readability dark mode prose
 *   - Related articles & category sidebar
 */

import Link from 'next/link';
import Image from 'next/image';
import SafeHtml from '@/components/common/safe-html';
import { getBlogDetail } from '@/lib/api';
import { ChevronRight, Calendar, User, Clock, ArrowRight, Share2, Tag, BookOpen, Sparkles } from 'lucide-react';
import { notFound } from 'next/navigation';

export const revalidate = 30;

export default async function BlogDetailPage({ params }) {
  const blogSlug = params.id;
  const data = await getBlogDetail(blogSlug);

  if (!data || !data.blog) {
    notFound();
  }

  const blog = data.blog;
  const relatedBlogs = data.blogs || [];
  const categories = data.categories || [];

  return (
    <div className="space-y-16 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Pattern 1: Editorial Subpage Hero */}
      <div className="rounded-3xl border border-[#222222] bg-gradient-to-b from-[#161616] to-[#0E0E0E] p-8 sm:p-14 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-neutral-600" />
          <Link href="/blogs" className="hover:text-white transition-colors">Technical Journal</Link>
          <ChevronRight className="h-3 w-3 text-neutral-600" />
          <span className="text-[#C5A880] font-bold truncate max-w-xs">{blog.title}</span>
        </nav>

        <div className="max-w-4xl space-y-5 relative z-10">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center rounded-full bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              {blog.category || 'Thermal Engineering'}
            </span>
            <div className="flex items-center space-x-1.5 text-[11px] text-neutral-400 font-mono">
              <Calendar className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>{blog.date || 'Recent'}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display leading-[1.15]">
            {blog.title}
          </h1>

          {blog.summary && (
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl">
              {blog.summary.replace(/<[^>]*>?/gm, '')}
            </p>
          )}
        </div>
      </div>

      {/* Main Reading Grid: Article Body (8 cols) + Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Article Body */}
        <article className="lg:col-span-8 space-y-10">
          {/* Featured Image */}
          {blog.image && (
            <div className="relative h-[340px] sm:h-[480px] w-full rounded-3xl border border-[#222222] overflow-hidden bg-[#141414] shadow-2xl">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          )}

          {/* Article Text Content */}
          <SafeHtml
            className="rounded-3xl border border-[#222222] bg-[#121212] p-8 sm:p-12 prose prose-invert lg:prose-lg max-w-none text-neutral-300 leading-relaxed [&>p]:mb-5 [&>p]:text-sm [&>p]:sm:text-base [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-6 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>strong]:text-white [&>a]:text-[#C5A880] [&>a]:underline"
            html={blog.description || '<p>Detailed article content coming soon.</p>'}
          />

          {/* Consultation Banner */}
          <div className="rounded-3xl border border-[#C5A880]/30 bg-gradient-to-r from-[#141414] via-[#1A1815] to-[#141414] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white">
                Interested in this Thermal Solution?
              </h3>
              <p className="text-xs text-neutral-400">
                Contact our engineering desk for technical application reviews and feasibility reports.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 rounded-xl bg-[#C5A880] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:bg-[#D4B890] transition-colors shrink-0 shadow-lg"
            >
              <span>Speak with an Engineer</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>

        {/* Right Column: Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="rounded-3xl border border-[#222222] bg-[#121212] p-6 space-y-5 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-[#222222] pb-3">
                <BookOpen className="h-4 w-4 text-[#C5A880]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Related Insights
                </h3>
              </div>

              <div className="space-y-4 divide-y divide-[#1C1C1C]">
                {relatedBlogs.map((rel) => (
                  <div key={rel.slug} className="pt-3 first:pt-0 space-y-1">
                    <Link
                      href={`/blogs/${rel.slug}`}
                      className="text-xs font-bold text-neutral-200 hover:text-[#C5A880] transition-colors line-clamp-2"
                    >
                      {rel.title}
                    </Link>
                    <p className="text-[10px] text-neutral-500 font-mono">
                      {rel.date || 'Recent Article'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Topics & Categories */}
          {categories.length > 0 && (
            <div className="rounded-3xl border border-[#222222] bg-[#121212] p-6 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-[#222222] pb-3">
                <Tag className="h-4 w-4 text-[#C5A880]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Topics
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span
                    key={cat.slug || cat.title}
                    className="text-xs rounded-xl border border-[#2B2B2B] bg-[#181818] px-3.5 py-1.5 text-neutral-300"
                  >
                    {cat.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
