/**
 * Innmotek Frontend - Dehumidifier Showcase Landing Page (/dehumidifier)
 * 
 * Replaces legacy CRA page: Innmotek-frontend-OLD/src/frontend/dehumidifier/index.js
 * Source Data: Verified from Innmotek-frontend-OLD legacy source (2x Energy Saving, 10x Quieter, DER4.3, R32).
 */

import { getCategoryProducts } from '@/lib/api';
import ProductShowcaseTemplate from '@/components/showcase/product-showcase-template';

export const revalidate = 30;

export default async function DehumidifierPage() {
  const data = await getCategoryProducts('dehumidifier');
  const categoryProducts = data?.products || [];

  return (
    <ProductShowcaseTemplate
      badge="Indoor Pool & Spa Climate Control"
      title="Full-Inverter® Dehumidifier 360"
      subtitle="Precision Humidity Management for Luxury Pools & Wellness Facilities"
      description="Innmotek's advanced full-inverter technology enables the dehumidifier to operate intelligently, adjusting performance according to real-time humidity levels for optimal energy savings and whisper-quiet operation."
      heroImage="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/3088e34a-aaf7-4cee-9d9a-3fe385de88c4.webp"
      stats={[
        { value: '2x', label: 'Energy Savings' },
        { value: '10x', label: 'Quieter Operation' },
        { value: 'DER 4.3', label: 'Average (30°C / 80% RH)' },
        { value: 'R32', label: 'Eco-Friendly Refrigerant' }
      ]}
      highlights={[
        {
          title: '2 Times Energy Saving',
          description: 'Average DER 4.3 at Air 30°C / RH 80% with intelligent inverter compressor modulation.'
        },
        {
          title: '2 Options for Easy Installation',
          description: 'Compact patented chassis engineered for either floor-standing or wall-mounted installation.'
        },
        {
          title: 'Strong Anti-Rust Casing',
          description: 'Heavy-duty metal and aluminum alloy casing resistant to humid, chlorinated indoor atmospheres.'
        }
      ]}
      deepDives={[
        {
          tag: 'Full-Inverter Technology',
          title: 'Intelligent Humidity Regulation & Quiet Comfort',
          content: 'Operates intelligently by adjusting performance according to ambient pool hall humidity levels, delivering consistent air moisture control with substantial energy reduction.',
          bullets: [
            'Patented compact design for versatile floor-standing or wall-mounted mounting',
            'Integrated remote control interface for scheduled operation',
            'Optional auxiliary electric heating support for cold season comfort'
          ],
          image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/3088e34a-aaf7-4cee-9d9a-3fe385de88c4.webp'
        }
      ]}
      specifications={[]} // Zero fabricated specs - custom sizing handled by engineering consultation
      applications={[
        { title: 'Indoor Swimming Pools', description: 'Eliminating condensation and protecting structural finishes.' },
        { title: 'Luxury Spas & Jacuzzis', description: 'Quiet humidity balance for wellness and hydrotherapy spaces.' },
        { title: 'Commercial Basements', description: 'Moisture extraction protecting electrical equipment and interiors.' }
      ]}
      categoryProducts={categoryProducts}
      categorySlug="dehumidifier"
      ctaText="Request Dehumidifier Sizing"
    />
  );
}
