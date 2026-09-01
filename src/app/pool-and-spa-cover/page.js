/**
 * Innmotek Frontend - Pool & Spa Cover Showcase Landing Page (/pool-and-spa-cover)
 * 
 * Replaces legacy CRA page: Innmotek-frontend-OLD/src/frontend/PoolSpaCover/index.js
 * Source Data: Verified qualitative content from Innmotek-frontend-OLD (Zero fabricated numbers).
 */

import { getCategoryProducts } from '@/lib/api';
import ProductShowcaseTemplate from '@/components/showcase/product-showcase-template';

export const revalidate = 30;

export default async function PoolSpaCoverPage() {
  const data = await getCategoryProducts('pool-and-spa-cover');
  const categoryProducts = data?.products || [];

  return (
    <ProductShowcaseTemplate
      badge="Thermal Basin Management"
      title="Automated Pool & Spa Covers"
      subtitle="Thermal Energy Retention, Debris Shielding & Child Safety Protection"
      description="Engineered to dramatically reduce water evaporation and nocturnal heat loss while providing structural safety protection and automated motorized convenience."
      heroImage="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/522ebccc-3fde-43f5-8142-7d3f8a6ec07e.webp"
      stats={[
        { value: 'Thermal', label: 'Evaporation Shield' },
        { value: 'Safety', label: 'Accidental Fall Protection' },
        { value: 'Motorized', label: 'Automated Deployment' },
        { value: 'All-Season', label: 'Basin Protection' }
      ]}
      highlights={[
        {
          title: 'Thermal Insulation Slat Profiles',
          description: 'Hollow chamber profiles trap thermal heat to prevent surface water cooling when pool is not in active use.'
        },
        {
          title: 'Child & Pet Basin Safety',
          description: 'Rigid interlocked structural profiles engineered to prevent accidental submersion across domestic pools.'
        },
        {
          title: 'Concealed Motorized Roller Systems',
          description: 'Custom motorized reel integration for in-basin sub-surface or exterior deck mounting.'
        }
      ]}
      deepDives={[
        {
          tag: 'Energy Conservation',
          title: 'Thermal Heat Retention & Reduced Water Loss',
          content: 'Uncovered heated pools lose the vast majority of their energy through surface evaporation. Innmotek automated covers seal the surface to maintain water temperature and reduce chemical consumption.',
          bullets: [
            'Minimizes heat pump operational duty cycles overnight',
            'Prevents leaf, debris, and atmospheric dirt accumulation',
            'Protects chlorine and sanitize chemistry from direct UV degradation'
          ],
          image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/522ebccc-3fde-43f5-8142-7d3f8a6ec07e.webp'
        }
      ]}
      specifications={[]} // Zero fabricated numbers - handled by honest technical submittal fallback
      applications={[
        { title: 'Outdoor Heated Basins', description: 'Cutting heat pump energy demand during colder nights.' },
        { title: 'Indoor Private Pools', description: 'Preventing indoor humidity and structural condensation when idle.' },
        { title: 'Luxury Hotel & Spa Basins', description: 'Automated push-button operation for hotel facility staff.' }
      ]}
      categoryProducts={categoryProducts}
      categorySlug="pool-and-spa-cover"
      ctaText="Request Cover Sizing Proposal"
    />
  );
}
