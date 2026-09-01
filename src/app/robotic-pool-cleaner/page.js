/**
 * Innmotek Frontend - Robotic Pool Cleaner Showcase Landing Page (/robotic-pool-cleaner)
 * 
 * Replaces legacy CRA page: Innmotek-frontend-OLD/src/frontend/RoboticPoolCleaner/index.js
 * Source Data: Verified from Innmotek-frontend-OLD legacy source (AI Mode, floor/wall/waterline automation).
 */

import { getCategoryProducts } from '@/lib/api';
import ProductShowcaseTemplate from '@/components/showcase/product-showcase-template';

export const revalidate = 30;

export default async function RoboticPoolCleanerPage() {
  const data = await getCategoryProducts('robotic-pool-cleaner');
  const categoryProducts = data?.products || [];

  return (
    <ProductShowcaseTemplate
      badge="Autonomous Pool Automation"
      title="Intelligent Robotic Pool Cleaners"
      subtitle="AI Mode Automated Basin Filtration & Wall-Climbing Cleaning"
      description="Engineered for intelligent autonomous debris clearing across residential and commercial pool basins with intelligent surface scanning and complete floor, wall, and waterline coverage."
      heroImage="https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/bfbb4967-e626-48ea-ae3a-31fae09ae916.webp"
      stats={[
        { value: 'AI Mode', label: 'One-Click Automation' },
        { value: '3-Way', label: 'Floor, Wall & Waterline' },
        { value: 'Electric', label: 'Autonomous Drive' },
        { value: 'Smart', label: 'Algorithmic Pathing' }
      ]}
      highlights={[
        {
          title: 'AI Mode Smart Cleaning',
          description: 'One-click autonomous cleaning mode that maps the pool basin and scrubs surfaces automatically.'
        },
        {
          title: 'Complete 3-Way Basin Coverage',
          description: 'Cleans pool floor, climbs vertical walls, and scrubs the waterline for thorough basin hygiene.'
        },
        {
          title: 'Independent Electric Filtration',
          description: 'Operates independently from the main pool filtration system, capturing fine debris in its internal canister.'
        }
      ]}
      deepDives={[
        {
          tag: 'Autonomous Automation',
          title: 'Systematic Basin Coverage with Zero Manual Labor',
          content: 'Delivers crystal-clean water at pre-set cleaning times, handling leaves, sand, and fine particles without tying up main pump suction lines.',
          bullets: [
            'Systematic floor and wall traversal algorithms',
            'Easy-access top filter basket for quick rinsing',
            'Safe low-voltage operation across all common pool surface finishes'
          ],
          image: 'https://fqrmvgfbrcgyszgefzlp.supabase.co/storage/v1/object/public/categories/bfbb4967-e626-48ea-ae3a-31fae09ae916.webp'
        }
      ]}
      specifications={[]} // Zero fabricated specs - model recommendations handled by engineering team
      applications={[
        { title: 'Residential Inground Pools', description: 'Hands-free weekly basin cleaning and waterline polishing.' },
        { title: 'Hotels & Resort Basins', description: 'Overnight scheduled automated cycles ready for morning guests.' },
        { title: 'Commercial Aquatic Facilities', description: 'Supplementary floor vacuuming between operating hours.' }
      ]}
      categoryProducts={categoryProducts}
      categorySlug="robotic-pool-cleaner"
      ctaText="Request Robot Sizing & Quote"
    />
  );
}
