/**
 * Innmotek Frontend - Modular Panel Tank Showcase (/modular-panel-tank)
 * 
 * Replaces legacy CRA page: Innmotek-frontend-OLD/src/frontend/stainlesspaneltank/index.js
 * Source Data: Verified from Innmotek-frontend-OLD legacy source (1/30 weight of concrete, 1/3 installation time).
 */

import { getCategoryProducts } from '@/lib/api';
import ProductShowcaseTemplate from '@/components/showcase/product-showcase-template';

export const revalidate = 30;

export default async function ModularPanelTankPage() {
  const data = await getCategoryProducts('modular-panel-tank');
  const categoryProducts = data?.products || [];

  return (
    <ProductShowcaseTemplate
      badge="Bulk Commercial Storage"
      title="Modular Stainless Steel Panel Tanks"
      subtitle="Engineered Sectional Water Storage for Infrastructure & Large Facilities"
      description="Flexible sectional panel construction assembled on-site, accommodating irregular plant-room footprints and high-volume commercial storage."
      heroImage="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/96789150-aa56-49f2-9567-66afb1f41590.webp"
      stats={[
        { value: '1/30th', label: 'Weight vs Concrete Tank' },
        { value: '1/3rd', label: 'Installation Time' },
        { value: 'Modular', label: 'Sectional Assembly' },
        { value: 'Stainless', label: 'Hygienic Storage' }
      ]}
      highlights={[
        {
          title: 'Lightweight Construction',
          description: 'Approximately 1/30 the weight of a concrete tank, reducing roof and foundation structural load requirements.'
        },
        {
          title: 'Fast On-Site Installation',
          description: 'Installs in about 1/3 the time of a traditional concrete reservoir through precision modular sectional panels.'
        },
        {
          title: 'Superior Water Hygiene',
          description: 'Smooth stainless steel panels inhibit algae and bacterial growth, maintaining clean water quality.'
        }
      ]}
      deepDives={[
        {
          tag: 'Sectional Architecture',
          title: 'Flexible On-Site Assembly for Complex Spaces',
          content: 'Modular panel components can be transported through standard doorways and assembled on-site inside basements or rooftop plant rooms where pre-formed tanks cannot fit.',
          bullets: [
            'Assembled via precision bolting and specialized hygienic gaskets',
            'Completely light-proof enclosure preventing photosynthetic algae formation',
            'Easy capacity expansion by adding additional modular panel courses'
          ],
          image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/96789150-aa56-49f2-9567-66afb1f41590.webp'
        }
      ]}
      specifications={[]} // Zero fabricated specs - custom panel layouts quoted via engineering team
      applications={[
        { title: 'Commercial Buildings & Malls', description: 'Potable water storage and emergency fire suppression reserves.' },
        { title: 'Hospitals & Medical Centers', description: 'Hygienic potable water meeting strict sanitary standards.' },
        { title: 'Industrial Facilities', description: 'Process water loops and high-volume buffering.' }
      ]}
      categoryProducts={categoryProducts}
      categorySlug="modular-panel-tank"
      ctaText="Request Panel Tank Sizing"
    />
  );
}
