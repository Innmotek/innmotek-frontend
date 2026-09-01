/**
 * Innmotek Frontend - Thermal Solar Collector Showcase (/thermal-solar-collector)
 * 
 * Replaces legacy CRA page: Innmotek-frontend-OLD/src/frontend/SolarCollector/index.js
 * Source Data: Verified qualitative content from Innmotek-frontend-OLD legacy source.
 */

import { getCategoryProducts } from '@/lib/api';
import ProductShowcaseTemplate from '@/components/showcase/product-showcase-template';

export const revalidate = 30;

export default async function ThermalSolarCollectorPage() {
  const data = await getCategoryProducts('thermal-solar-collector');
  const categoryProducts = data?.products || [];

  return (
    <ProductShowcaseTemplate
      badge="Clean Energy Harvesting"
      title="Thermal Solar Water Collectors"
      subtitle="High-Efficiency Solar Collectors for Domestic & Commercial Water Heating"
      description="Harvest renewable solar energy for clean hot water. Engineered for closed-loop solar water heating systems, domestic hot water pre-heating, and hybrid heat pump integration."
      heroImage="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/f036cb72-3d2a-4855-a400-ebb17328d4a8.webp"
      stats={[
        { value: 'Solar', label: 'Renewable Thermal Energy' },
        { value: 'High Absorb', label: 'Selective Surface Coating' },
        { value: 'Tempered', label: 'Toughened Solar Glazing' },
        { value: 'Zero Carbon', label: 'Direct Sunlight Heating' }
      ]}
      highlights={[
        {
          title: 'High-Absorption Solar Absorbers',
          description: 'Engineered selective absorber surface captures maximum solar irradiance for rapid water heating.'
        },
        {
          title: 'Impact-Resistant Solar Glazing',
          description: 'High-transmission tempered solar glass engineered to withstand weather extremes and hail.'
        },
        {
          title: 'Corrosion-Resistant Enclosure',
          description: 'Weather-sealed aluminum alloy collector frame with high-density thermal back insulation.'
        }
      ]}
      deepDives={[
        {
          tag: 'Clean Solar Energy',
          title: 'Direct Solar Thermal Water Heating',
          content: 'Solar thermal collectors convert sunlight directly into heated water, significantly reducing reliance on fossil fuels or electricity for domestic and commercial hot water needs.',
          bullets: [
            'Ideal for rooftop solar arrays supplying central hot water systems',
            'Can be paired with storage tanks and auxiliary heat pumps for all-weather supply',
            'Durable construction designed for long-term outdoor rooftop exposure'
          ],
          image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/f036cb72-3d2a-4855-a400-ebb17328d4a8.webp'
        }
      ]}
      specifications={[]} // Zero fabricated specs - custom solar array sizing handled by engineering
      applications={[
        { title: 'Residential Rooftop Systems', description: 'Zero-fuel daytime water heating for private homes.' },
        { title: 'Commercial Hotels & Resorts', description: 'Centralized pre-heating arrays cutting boiler energy bills.' },
        { title: 'Hybrid Heat Pump Systems', description: 'Solar auxiliary assistance boosting heat pump efficiency.' }
      ]}
      categoryProducts={categoryProducts}
      categorySlug="thermal-solar-collector"
      ctaText="Request Solar Array Sizing"
    />
  );
}
