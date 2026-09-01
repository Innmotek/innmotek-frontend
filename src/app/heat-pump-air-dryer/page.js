/**
 * Innmotek Frontend - Heat Pump Air Dryer Showcase (/heat-pump-air-dryer)
 * 
 * Replaces legacy CRA page: Innmotek-frontend-OLD/src/frontend/CategoryDetail/index.js
 * Source Data: Verified from Innmotek-frontend-OLD legacy source (75% electricity saving, 18°C–80°C, SS304, 10+ yrs, 400% COP).
 */

import { getCategoryProducts } from '@/lib/api';
import ProductShowcaseTemplate from '@/components/showcase/product-showcase-template';

export const revalidate = 30;

export default async function HeatPumpAirDryerPage() {
  const data = await getCategoryProducts('heat-pump-air-dryer');
  const categoryProducts = data?.products || [];

  return (
    <ProductShowcaseTemplate
      badge="Industrial Dehydration & Drying"
      title="Industrial Heat Pump Air Dryers"
      subtitle="Closed-Loop Thermodynamic Dehydration for Agricultural & Industrial Processing"
      description="Cut commercial drying electricity costs by up to 75% compared to traditional electric heating dryers. Innmotek thermodynamic heat pump dryers recover latent heat while delivering precision temperature and humidity chamber control."
      heroImage="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/6bb7a92d-9d67-4518-99b1-37d7adb0df0b.webp"
      stats={[
        { value: '75%', label: 'Electricity Savings' },
        { value: '18°C – 80°C', label: 'Adjustable Temp Range' },
        { value: '400%', label: 'Heat Energy Efficiency' },
        { value: '10+ Years', label: 'Design Lifespan' }
      ]}
      highlights={[
        {
          title: '75% Energy Saving Efficiency',
          description: 'Input 1 kW electricity, absorb 3 kW ambient energy, output 4 kW heat energy (400% thermal efficiency).'
        },
        {
          title: 'Wide Temperature Regulation (18°C to 80°C)',
          description: 'Adjustable drying temperature range suitable for delicate low-temp curing or high-temperature drying.'
        },
        {
          title: 'Food-Grade Stainless Steel 304',
          description: 'Drying chamber and trays built with high-durability SUS304 stainless steel with a lifespan exceeding 10 years.'
        }
      ]}
      deepDives={[
        {
          tag: 'Thermodynamic Cycle',
          title: 'Open and Closed Loop Heat Pump Technology',
          content: 'No interchange with ambient air ensures high drying efficiency even in sub-zero winter temperatures, while sealed dehumidification prevents loss of volatile aromatic compounds and nutritional value.',
          bullets: [
            'Closed-loop moisture extraction preserving natural product color and aroma',
            'Integrated intelligent control panel with multi-stage temperature curves',
            'Substantial operating cost reduction compared to conventional diesel or resistance dryers'
          ],
          image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/6bb7a92d-9d67-4518-99b1-37d7adb0df0b.webp'
        }
      ]}
      specifications={[]} // Zero fabricated specs - custom chamber sizing handled by engineering proposal
      applications={[
        { title: 'Herbs, Spices & Cardamom', description: 'Preserves essential oils and natural green coloration.' },
        { title: 'Fruits & Vegetables', description: 'Even, sanitary dehydration for export-standard dried produce.' },
        { title: 'Timber & Industrial Goods', description: 'Controlled moisture extraction avoiding surface cracking.' }
      ]}
      categoryProducts={categoryProducts}
      categorySlug="heat-pump-air-dryer"
      ctaText="Request Air Dryer Sizing & ROI Analysis"
    />
  );
}
