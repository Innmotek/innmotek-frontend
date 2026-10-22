/**
 * Innmotek Frontend - Robots.txt Generator
 * 
 * Configures search crawler directives for Google Search Console (GSC),
 * Bing, and other web crawlers.
 */

export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innmotek.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin',
          '/admin/',
          '/preview',
          '/_next/',
          '/temp/'
        ],
      },
    ],
    sitemap: `${baseUrl.replace(/\/+$/, '')}/sitemap.xml`,
  };
}
