/**
 * Innmotek Frontend - Pressurized Thermosiphon Showcase (/pressurized-thermosiphon)
 * 
 * Replaces legacy CRA page: Innmotek-frontend-OLD/src/frontend/SolarThermosyphon/index.js
 * Source Data: Verified qualitative content from Innmotek-frontend-OLD legacy source.
 */

import { getCategoryProducts } from '@/lib/api';
import ProductShowcaseTemplate from '@/components/showcase/product-showcase-template';

export const revalidate = 30;

export default async function PressurizedThermosiphonPage() {
  const data = await getCategoryProducts('pressurized-thermosiphon');
  const categoryProducts = data?.products || [];

  return (
    <ProductShowcaseTemplate
      badge="Compact Solar Heating"
      title="Pressurized Thermosiphon Solar Water Heaters"
      subtitle="Direct High-Pressure Rooftop Solar Water Heating with Natural Circulation"
      description="Reliable natural circulation thermosiphon solar systems delivering mains-pressure hot water directly to showers and taps without the complexity of circulation pumps or external electrical controllers."
      heroImage="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/ed6f2e15-aea1-4e50-9a03-07700b9fc626.webp"
      stats={[
        { value: 'Natural', label: 'Thermosiphon Circulation' },
        { value: 'Pressurized', label: 'Direct Mains Supply' },
        { value: 'Zero Pump', label: 'No Pumping Electricity' },
        { value: 'All-Weather', label: 'Auxiliary Backup Compatible' }
      ]}
      highlights={[
        {
          title: 'Direct Mains Pressure Delivery',
          description: 'Delivers full city mains water pressure to showers and fixtures without requiring external pressure booster pumps.'
        },
        {
          title: 'Zero Electrical Pumping Energy',
          description: 'Uses thermodynamic density differences between hot and cold water for 100% natural, silent circulation.'
        },
        {
          title: 'Auxiliary Heating Support',
          description: 'Compatible with auxiliary heating elements to ensure reliable hot water during prolonged overcast periods.'
        }
      ]}
      deepDives={[
        {
          tag: 'Thermosiphon Dynamics',
          title: 'Natural, Pump-Free Solar Circulation',
          content: 'Heated water naturally rises from the collector into the storage cylinder while cooler water flows downward, creating a continuous self-sustaining circulation loop without electrical pumps.',
          bullets: [
            'Compact integrated tank-and-collector rooftop footprint',
            'Pressurized inner tank construction providing reliable flow to all taps',
            'Minimal maintenance with no moving mechanical pump parts'
          ],
          image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/ed6f2e15-aea1-4e50-9a03-07700b9fc626.webp'
        }
      ]}
      specifications={[]} // Zero fabricated specs - family sizing handled by engineering consultation
      applications={[
        { title: 'Residential Villas & Homes', description: 'Zero-operating-cost solar hot water for daily family living.' },
        { title: 'Eco-Lodges & Resorts', description: 'Sustainable off-grid solar water heating in remote sunny locations.' },
        { title: 'Decentralized Rooftops', description: 'Independent rooftop units per household or apartment.' }
      ]}
      categoryProducts={categoryProducts}
      categorySlug="pressurized-thermosiphon"
      ctaText="Request Thermosiphon System Quote"
    />
  );
}
