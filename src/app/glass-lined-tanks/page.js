/**
 * Innmotek Frontend - Glass Lined Tanks Showcase (/glass-lined-tanks)
 * 
 * Replaces legacy CRA page: Innmotek-frontend-OLD/src/frontend/GlassTank/index.js
 * Source Data: Verified from Innmotek-frontend-OLD legacy source & Product ID 34 in database.
 */

import { getCategoryProducts } from '@/lib/api';
import ProductShowcaseTemplate from '@/components/showcase/product-showcase-template';

export const revalidate = 30;

export default async function GlassLinedTanksPage() {
  const data = await getCategoryProducts('glass-lined-tanks');
  const categoryProducts = data?.products || [];

  return (
    <ProductShowcaseTemplate
      badge="Vitreous Enamel Vessel Technology"
      title="Glass Lined Hot Water Storage Tanks"
      subtitle="Corrosion-Resistant Vitreous Enamel Coated Cylinders for Pure Water Storage"
      description="Specialized hot water storage vessels with interior glass lining preventing corrosion, ensuring exceptional tank longevity, and maintaining pristine stored water purity in domestic and commercial applications."
      heroImage="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/1b644d42-8909-4eb1-8c60-84c9d5a1716b.webp"
      stats={[
        { value: 'Glass Lined', label: 'Anti-Corrosion Interior' },
        { value: 'Hygienic', label: 'Inhibits Bacteria & Algae' },
        { value: 'Insulated', label: 'Minimized Heat Loss' },
        { value: 'High Temp', label: 'Temperature Resistant' }
      ]}
      highlights={[
        {
          title: 'Corrosion Resistance',
          description: 'The interior glass lining provides excellent protection against corrosion, ensuring tank durability even in harsh water conditions.'
        },
        {
          title: 'Hygienic Water Storage',
          description: 'Glass lining inhibits the growth of bacteria, algae, and microorganisms, ensuring stored water remains clean and safe.'
        },
        {
          title: 'Easy Maintenance Surface',
          description: 'Smooth, non-porous glass lining prevents scaling and sediment accumulation, making long-term maintenance hassle-free.'
        }
      ]}
      deepDives={[
        {
          tag: 'Ceramic Enamel Coating',
          title: 'Temperature Resistance & Thermal Insulation',
          content: 'Withstands high temperatures without compromising structural integrity, combined with high-density insulation layers to minimize standby heat loss and enhance energy efficiency.',
          bullets: [
            'Suitable for storing hot water generated from solar, heat pump, or boiler sources',
            'Smooth non-porous interior reducing scale and mineral build-up',
            'Proven durability across residential and commercial water heating installations'
          ],
          image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/1b644d42-8909-4eb1-8c60-84c9d5a1716b.webp'
        }
      ]}
      specifications={[]} // Zero fabricated specs - real product specifications linked below from database
      applications={[
        { title: 'Residential Hot Water Systems', description: 'Safe, clean potable water heating for daily domestic demand.' },
        { title: 'Commercial Hospitality Facilities', description: 'Durable storage tanks for hotels, resorts, and wellness clubs.' },
        { title: 'Hard Water Environments', description: 'Corrosion protection against aggressive minerals and chemicals.' }
      ]}
      categoryProducts={categoryProducts}
      categorySlug="glass-lined-tanks"
      ctaText="Request Glass Lined Tank Proposal"
    />
  );
}
