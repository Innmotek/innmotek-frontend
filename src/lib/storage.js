/**
 * Innmotek Frontend - Storage CDN Resolver
 * 
 * Supports both local public asset serving (/frontend/images/...)
 * and Supabase Storage CDN (https://<ref>.supabase.co/storage/v1/object/public).
 * Default is local public assets to protect Supabase Free Egress quota.
 */

const USE_LOCAL = process.env.NEXT_PUBLIC_USE_LOCAL_IMAGES !== 'false';
const SUPABASE_STORAGE_BASE = 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public';
const STORAGE_BASE = USE_LOCAL
  ? '/frontend/images'
  : (process.env.NEXT_PUBLIC_STORAGE_URL || SUPABASE_STORAGE_BASE);

export function getCdnImageUrl(bucket, filename) {
  if (!filename) return '/placeholder.webp';

  if (USE_LOCAL) {
    if (filename.includes('/storage/v1/object/public/')) {
      const parts = filename.split('/storage/v1/object/public/');
      return `/frontend/images/${parts[1]}`;
    }
    if (filename.startsWith('/frontend/images/')) {
      return filename;
    }
    if (filename.startsWith('http://') || filename.startsWith('https://')) {
      const parts = filename.split('/frontend/images/');
      if (parts.length === 2) {
        return `/frontend/images/${parts[1]}`;
      }
      return filename;
    }
    return `/frontend/images/${bucket}/${filename}`;
  }

  // Supabase CDN mode
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

export { STORAGE_BASE, USE_LOCAL };
