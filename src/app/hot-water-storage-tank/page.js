/**
 * Innmotek Frontend - Hot Water Storage Tank Showcase (/hot-water-storage-tank)
 * 
 * Replaces legacy CRA page: Innmotek-frontend-OLD/src/frontend/stainlesswatertank/index.js
 * Source Data: Verified from Innmotek-frontend-OLD legacy source (confirmed up to 9 bar, pressurized & non-pressurized).
 */

import { getCategoryProducts } from '@/lib/api';
import ProductShowcaseTemplate from '@/components/showcase/product-showcase-template';

export const revalidate = 30;

export default async function StainlessWaterTankPage() {
  const data = await getCategoryProducts('hot-water-storage-tank');
  const categoryProducts = data?.products || [];

  return (
    <ProductShowcaseTemplate
      badge="Thermal Buffer & Storage"
      title="Stainless Steel Hot Water Storage Tanks"
      subtitle="High-Pressure Buffer Vessels & Pressurized Water Cylinders"
      description="Engineered for domestic, commercial, and industrial water heating systems with durable stainless steel construction, consistent pressure delivery, and long-term hygienic storage."
      heroImage="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/4e9c2e73-aa78-44cb-a50b-4a85af5b366f.webp"
      stats={[
        { value: '9 Bar', label: 'Confirmed Test Pressure' },
        { value: 'Dual', label: 'Pressurized & Non-Pressurized' },
        { value: 'Hygienic', label: 'Corrosion-Resistant Interior' },
        { value: 'Economic', label: 'Thermal Insulation' }
      ]}
      highlights={[
        {
          title: 'High Pressure Durability',
          description: 'Sealed pressurized design confirmed up to 9 bar test pressure for consistent water delivery across all outlets.'
        },
        {
          title: 'Hygienic Potable Storage',
          description: 'Corrosion-resistant vessel interior prevents microbial growth and maintains water purity for daily use.'
        },
        {
          title: 'Economic Thermal Retention',
          description: 'High-efficiency thermal insulation minimizes standby heat loss to reduce auxiliary heating electricity costs.'
        }
      ]}
      deepDives={[
        {
          tag: 'System Configurations',
          title: 'Pressurized & Non-Pressurized Vessel Designs',
          content: 'Available in pressurized configurations for direct mains water supply to fixtures and showers, or atmospheric non-pressurized options for bulk rainwater harvesting and agricultural storage.',
          bullets: [
            'Pressurized hot water tanks maintaining elevated supply pressure to all fixtures',
            'Non-pressurized atmospheric tanks for open-loop water storage applications',
            'Compatible with heat pumps, solar thermal loops, and electric backup elements'
          ],
          image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/4e9c2e73-aa78-44cb-a50b-4a85af5b366f.webp'
        }
      ]}
      specifications={[]} // Zero fabricated specs - custom volume & coil schematics quoted via engineering
      applications={[
        { title: 'Residential Homes & Villas', description: 'Centralized continuous hot water supply under mains pressure.' },
        { title: 'Hotels & Commercial Buildings', description: 'Heavy-duty buffer volume matching high morning peak demands.' },
        { title: 'Solar & Heat Pump Integration', description: 'Buffer cylinder for renewable hydronic heating loops.' }
      ]}
      categoryProducts={categoryProducts}
      categorySlug="hot-water-storage-tank"
      ctaText="Request Tank Sizing Proposal"
    />
  );
}
