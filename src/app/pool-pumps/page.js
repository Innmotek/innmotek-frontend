/**
 * Innmotek Frontend - Pool Pumps Showcase Landing Page (/pool-pumps)
 * 
 * Replaces legacy CRA page: Innmotek-frontend-OLD/src/frontend/PoolPump/index.js
 * Source Data: Verified qualitative content from Innmotek-frontend-OLD legacy source.
 */

import { getCategoryProducts } from '@/lib/api';
import ProductShowcaseTemplate from '@/components/showcase/product-showcase-template';

export const revalidate = 30;

export default async function PoolPumpsPage() {
  const data = await getCategoryProducts('pool-pumps');
  const categoryProducts = data?.products || [];

  return (
    <ProductShowcaseTemplate
      badge="Hydraulic Water Circulation"
      title="Inverter Pool Circulation Pumps"
      subtitle="Energy-Efficient, Quiet Hydraulic Filtration for Swimming Pools"
      description="Engineered for high-efficiency continuous water circulation, whisper-quiet flow, and extended pool equipment filtration lifespan."
      heroImage="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/ecf26899-fc4f-43e2-9930-eeba637cbc6a.webp"
      stats={[
        { value: 'Inverter', label: 'Variable Flow Control' },
        { value: 'Quiet', label: 'Whisper Operation' },
        { value: 'High Head', label: 'Hydraulic Efficiency' },
        { value: 'Continuous', label: 'Heavy-Duty Duty Cycle' }
      ]}
      highlights={[
        {
          title: 'Variable Speed Inverter Drive',
          description: 'Adjustable operational speeds to match filtration, backwash, or water feature heating requirements.'
        },
        {
          title: 'Whisper-Quiet Performance',
          description: 'Hydraulic sound dampening providing serene poolside environments without mechanical motor hum.'
        },
        {
          title: 'Corrosion-Resistant Thermoplastic Housing',
          description: 'Durable construction resisting chemical corrosion from chlorine and saline pool water.'
        }
      ]}
      deepDives={[
        {
          tag: 'Hydraulic Circulation',
          title: 'Continuous Filtration & Water Turnover',
          content: 'Delivers reliable water circulation through filtration media and heat exchangers while minimizing electricity consumption through variable speed operation.',
          bullets: [
            'Easy-clean transparent strainer basket for fast debris inspection',
            'Compatible with automated pool controllers and heat pumps',
            'Self-priming design for above or below water-level plant rooms'
          ],
          image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/ecf26899-fc4f-43e2-9930-eeba637cbc6a.webp'
        }
      ]}
      specifications={[]} // Zero fabricated specs - pump head sizing quoted via engineering team
      applications={[
        { title: 'Residential Swimming Pools', description: 'Quiet 24-hour continuous turnover and filtration.' },
        { title: 'Commercial Pools & Water Features', description: 'High-volume circulation meeting health regulations.' },
        { title: 'Saltwater Sanitized Basins', description: 'Corrosion-proof hydraulic components.' }
      ]}
      categoryProducts={categoryProducts}
      categorySlug="pool-pumps"
      ctaText="Request Pump Sizing Proposal"
    />
  );
}
