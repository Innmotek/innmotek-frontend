/**
 * Innmotek Frontend - Radiators & Fan Coils Showcase (/radiators & /radiator-and-fancoil)
 * 
 * Replaces legacy CRA page: Innmotek-frontend-OLD/src/frontend/radiator/index.js
 * Source Data: Verified from Innmotek-frontend-OLD legacy source (10 Years Warranty, hydronic heating/cooling).
 */

import { getCategoryProducts } from '@/lib/api';
import ProductShowcaseTemplate from '@/components/showcase/product-showcase-template';

export const revalidate = 30;

export default async function RadiatorsPage() {
  const data = await getCategoryProducts('radiator-and-fancoil');
  const categoryProducts = data?.products || [];

  return (
    <ProductShowcaseTemplate
      badge="Space Heating & Hydronics"
      title="Hydronic Radiators & Fan Coil Systems"
      subtitle="Architectural Space Heating & Energy-Efficient Hydronic Climate Devices"
      description="Modern hydronic radiators and fan-supported climate units maintain a comfortable room temperature while making a significant contribution toward lowering overall energy consumption."
      heroImage="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/1cfc7b9b-b9f3-4015-be9b-79067eb710e1.webp"
      stats={[
        { value: '10 Years', label: 'Warranty Coverage' },
        { value: 'Hydronic', label: 'Radiant & Convective' },
        { value: 'Quiet', label: 'Fan Supported Options' },
        { value: 'Energy', label: 'Efficient Heating' }
      ]}
      highlights={[
        {
          title: 'Comfortable Radiant Warmth',
          description: 'Gentle, even thermal distribution maintaining consistent indoor temperatures without drying the air.'
        },
        {
          title: 'Versatile Model Types',
          description: 'Panel radiators, decorative towel warmers, and fan-assisted convectors providing both heating and cooling.'
        },
        {
          title: '10-Year Long-Term Warranty',
          description: 'High-durability manufacturing backed by full 10-year factory warranty coverage.'
        }
      ]}
      deepDives={[
        {
          tag: 'Hydronic Comfort',
          title: 'Lower Energy Consumption with Modern Radiator Designs',
          content: 'Modern radiators pair effectively with renewable heat pump and boiler systems, providing fast thermal response and individual room temperature regulation.',
          bullets: [
            'Suitable for both residential homes and commercial hospitality spaces',
            'Towel rail and decorative designer radiator variants available',
            'Low-noise fan coil options providing seasonal cooling support'
          ],
          image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/banners/1cfc7b9b-b9f3-4015-be9b-79067eb710e1.webp'
        }
      ]}
      specifications={[]} // Zero fabricated specs - custom room sizing handled by engineering
      applications={[
        { title: 'Residential Living Rooms & Bedrooms', description: 'Even, dust-free radiant warmth for family comfort.' },
        { title: 'Bathrooms & Washrooms', description: 'Decorative towel warmer radiators for luxury drying and warmth.' },
        { title: 'Hotels & Commercial Suites', description: 'Zoned hydronic heating with individual room controls.' }
      ]}
      categoryProducts={categoryProducts}
      categorySlug="radiator-and-fancoil"
      ctaText="Request Radiator Sizing & Catalogue"
    />
  );
}
