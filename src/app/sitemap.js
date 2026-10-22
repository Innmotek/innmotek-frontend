/**
 * Innmotek Frontend - Dynamic Sitemap Generator (/sitemap.xml)
 * 
 * Generates dynamic, SEO-compliant sitemap index covering:
 * - Core static & legal pages
 * - Dedicated product showcase landing pages
 * - Dynamic product categories (queried from DB)
 * - Dynamic product detail pages (queried from DB)
 * - Dynamic technical blog articles (queried from DB)
 * 
 * Features:
 * - Next.js App Router metadata route convention
 * - 1-hour ISR cache revalidation (updates automatically when products/categories are added in DB)
 * - URL encoding and entity sanitization to prevent xmlParseEntityRef parse errors
 */

import { getAllCategoriesFlat, getProducts, getBlogs } from '@/lib/api';

export const revalidate = 3600; // 1 hour ISR revalidation

/**
 * Safely format and encode URLs to ensure clean XML generation.
 * Handles Unicode en-dashes, spaces, and special symbols safely.
 */
function cleanUrl(baseUrl, path, slug = '') {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  if (!slug) {
    return cleanPath ? `${cleanBase}/${cleanPath}` : cleanBase;
  }
  // Sanitize slug while preserving valid URL safe characters
  const cleanSlug = String(slug)
    .trim()
    .replace(/^\/+|\/+$/g, '');
  
  return `${cleanBase}/${cleanPath}/${encodeURIComponent(cleanSlug)}`;
}

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innmotek.com';
  const now = new Date().toISOString();

  // 1. Core Top-Level Routes
  const coreRoutes = [
    {
      url: cleanUrl(baseUrl, ''),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: cleanUrl(baseUrl, 'category'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: cleanUrl(baseUrl, 'about'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: cleanUrl(baseUrl, 'contact'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: cleanUrl(baseUrl, 'faqs'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: cleanUrl(baseUrl, 'blogs'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: cleanUrl(baseUrl, 'projects'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: cleanUrl(baseUrl, 'services'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // 2. Specialized High-Conversion Equipment Showcase Pages
  const showcaseSlugs = [
    'dehumidifier',
    'glass-lined-tanks',
    'heat-pump-air-dryer',
    'hot-water-storage-tank',
    'modular-panel-tank',
    'pool-and-spa-cover',
    'pool-pumps',
    'pressurized-thermosiphon',
    'radiator-and-fancoil',
    'robotic-pool-cleaner',
    'thermal-solar-collector'
  ];

  const showcaseRoutes = showcaseSlugs.map(slug => ({
    url: cleanUrl(baseUrl, slug),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 3. Legal & Corporate Policy Pages
  const legalRoutes = [
    {
      url: cleanUrl(baseUrl, 'privacy-policy'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: cleanUrl(baseUrl, 'terms-and-conditions'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: cleanUrl(baseUrl, 'dealer-policy'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: cleanUrl(baseUrl, 'payment-policy'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // 4. Fetch Dynamic Database Entities in Parallel
  const [categories, products, blogs] = await Promise.all([
    getAllCategoriesFlat().catch(() => []),
    getProducts().catch(() => []),
    getBlogs().catch(() => [])
  ]);

  // 5. Dynamic Category Routes
  const seenCatSlugs = new Set();
  const categoryRoutes = (categories || [])
    .filter(cat => cat && cat.slug && !seenCatSlugs.has(cat.slug))
    .map(cat => {
      seenCatSlugs.add(cat.slug);
      return {
        url: cleanUrl(baseUrl, 'category', cat.slug),
        lastModified: cat.updated_at ? new Date(cat.updated_at).toISOString() : now,
        changeFrequency: 'daily',
        priority: 0.85,
      };
    });

  // 6. Dynamic Product Detail Routes
  const seenProdSlugs = new Set();
  const productRoutes = (products || [])
    .filter(prod => prod && prod.slug && !seenProdSlugs.has(prod.slug))
    .map(prod => {
      seenProdSlugs.add(prod.slug);
      return {
        url: cleanUrl(baseUrl, 'products', prod.slug),
        lastModified: prod.updated_at ? new Date(prod.updated_at).toISOString() : now,
        changeFrequency: 'daily',
        priority: 0.95,
      };
    });

  // 7. Dynamic Blog Article Routes
  const seenBlogSlugs = new Set();
  const blogRoutes = (blogs || [])
    .filter(blog => blog && blog.slug && !seenBlogSlugs.has(blog.slug))
    .map(blog => {
      seenBlogSlugs.add(blog.slug);
      return {
        url: cleanUrl(baseUrl, 'blogs', blog.slug),
        lastModified: blog.updated_at ? new Date(blog.updated_at).toISOString() : now,
        changeFrequency: 'weekly',
        priority: 0.75,
      };
    });

  return [
    ...coreRoutes,
    ...showcaseRoutes,
    ...legalRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...blogRoutes
  ];
}
