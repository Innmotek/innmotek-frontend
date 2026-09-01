/**
 * Innmotek Frontend - Storage CDN Resolver
 * 
 * Generates CDN asset URLs from process.env.NEXT_PUBLIC_STORAGE_URL (Supabase CDN)
 * with graceful fallback.
 */

const STORAGE_BASE = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public';

export function getCdnImageUrl(bucket, filename) {
  if (!filename) return '/placeholder.webp';
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    if (filename.includes('supabase.co')) return filename;
    const parts = filename.split('/frontend/images/');
    if (parts.length === 2) {
      return `${STORAGE_BASE}/${parts[1]}`;
    }
    return filename;
  }
  return `${STORAGE_BASE}/${bucket}/${filename}`;
}

export { STORAGE_BASE };
