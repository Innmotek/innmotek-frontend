/**
 * Innmotek Frontend - Radiator & Fan Coil Units Showcase Landing Page (/radiator-and-fancoil)
 * 
 * Replaces legacy CRA page: Innmotek-frontend-OLD/src/frontend/radiators/index.js
 * Source Data: Verified from Innmotek-frontend-OLD legacy source & database.
 */

import { getCategoryProducts } from '@/lib/api';
import ProductShowcaseTemplate from '@/components/showcase/product-showcase-template';

export const revalidate = 30;

export default async function RadiatorAndFancoilPage() {
  const data = await getCategoryProducts('radiator-and-fancoil');
  const categoryProducts = data?.products || [];

  return (
    <ProductShowcaseTemplate
      badge="Hydronic Emission & Space Conditioning"
      title="Advanced Radiators & Fan Coil Units"
      subtitle="Ultra-Efficient Low-Temperature Heat Emitters for Modern Living"
      description="Innmotek high-performance radiators and ultra-slim fan coil units are engineered to deliver whisper-quiet, responsive heating and cooling in seamless coordination with heat pump thermal systems."
      heroImage="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/radiators-banner.webp"
      stats={[
        { value: '35°C-45°C', label: 'Low Flow Water Temp' },
        { value: '< 25 dB(A)', label: 'Ultra-Quiet Operation' },
        { value: 'DC Inverter', label: 'Modulating Fan Motor' },
        { value: 'Dual Mode', label: 'Heating & Active Cooling' }
      ]}
      highlights={[
        {
          title: 'Low-Temperature Compatibility',
          description: 'Optimized for modern heat pump water loops operating at 35°C to 45°C for maximum COP seasonal performance.'
        },
        {
          title: 'Ultra-Slim Architectural Profile',
          description: 'Contemporary casing aesthetics that blend seamlessly into luxury residential and commercial interiors.'
        },
        {
          title: 'Rapid Thermal Response',
          description: 'Low-water-content aluminum and copper heat exchangers provide quick room warm-up and precise zone regulation.'
        }
      ]}
      deepDives={[
        {
          tag: 'Hydronic Innovation',
          title: 'Whisper-Quiet Fan Coil Terminal Units',
          content: 'Engineered with brushless DC inverter fan motors and aerodynamically optimized cross-flow impellers to ensure acoustic comfort in bedrooms, executive offices, and luxury hotel suites.',
          bullets: [
            'Dynamic multi-speed fan control with smart thermostat integration',
            'Integrated condensation drip tray and drainage for chilled water cooling mode',
            'Washable high-efficiency air filters for enhanced indoor air quality'
          ]
        }
      ]}
      specifications={[]}
      applications={[
        { title: 'Luxury Residences & Villas', description: 'Even thermal distribution with concealed or decorative wall mounts.' },
        { title: 'Commercial Offices & Hospitality', description: 'Independent zone climate control with high energy efficiency.' }
      ]}
      relatedProducts={categoryProducts}
    />
  );
}
