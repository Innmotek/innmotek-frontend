/**
 * Innmotek Frontend API Client
 * 
 * Centralized data fetching layer connecting to the Node.js backend (localhost:5000)
 * Uses NEXT_PUBLIC_API_URL environment variable.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchFromApi(endpoint, options = {}) {
  try {
    const isDev = process.env.NODE_ENV !== 'production';
    const fetchOptions = {
      cache: isDev ? 'no-store' : 'default',
      ...(isDev ? {} : { next: { revalidate: 30 } }),
      ...options
    };

    const res = await fetch(`${API_BASE}${endpoint}`, fetchOptions);

    if (!res.ok) {
      console.warn(`[API] Fetch failed for ${endpoint}: ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error(`[API Error] ${endpoint}:`, err);
    return null;
  }
}

export async function getBanners() {
  const data = await fetchFromApi('/banners');
  return data?.banners || [];
}

export async function getCategories() {
  const data = await fetchFromApi('/categories');
  return data?.categories || [];
}

export async function getCategoryDetail(slug) {
  const data = await fetchFromApi(`/category/${slug}`);
  return data || null;
}

export async function getCategoryProducts(slug) {
  const data = await fetchFromApi(`/products/${slug}`);
  return data || null;
}

export async function getProductDetail(slug) {
  const data = await fetchFromApi(`/products/${slug}/show`);
  return data || null;
}

export async function getFeaturedProducts() {
  const data = await fetchFromApi('/featured/products');
  return data?.products || [];
}

export async function getProducts(categoryId = null) {
  const endpoint = categoryId ? `/products/${categoryId}` : '/products';
  const data = await fetchFromApi(endpoint);
  return data?.products || [];
}

export async function getTestimonials() {
  const data = await fetchFromApi('/testimonials');
  return data?.testimonials || [];
}

export async function getBrands() {
  const data = await fetchFromApi('/brands');
  return data?.brands || [];
}

export async function getFaqs() {
  const data = await fetchFromApi('/faqs');
  if (!data) return [];
  if (data.faqs) return data.faqs;
  if (data.types && Array.isArray(data.types)) {
    return data.types.flatMap(t => (t.faqs || []).map(f => ({ ...f, category: t.title })));
  }
  return [];
}

export async function getPageBySlug(slug) {
  const data = await fetchFromApi(`/pages/${slug}`);
  return data?.page || null;
}

export async function getBlogs() {
  const data = await fetchFromApi('/blogs');
  return data?.blogs || [];
}

export async function getBlogDetail(slug) {
  const data = await fetchFromApi(`/blogs/${slug}`);
  return data || null;
}

export async function getProjects() {
  const data = await fetchFromApi('/projects');
  return data?.projects || [];
}

export async function getProjectDetail(slug) {
  const data = await fetchFromApi(`/projects/${slug}`);
  return data?.project || null;
}

export async function getServices() {
  const data = await fetchFromApi('/services');
  return data?.services || [];
}

export async function getServiceDetail(slug) {
  const data = await fetchFromApi(`/services/${slug}`);
  return data?.service || null;
}

export { API_BASE };
