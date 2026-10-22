/**
 * Innmotek Frontend - Dealer Policy Page (/dealer-policy)
 */

import { getPageBySlug } from '@/lib/api';
import LegalPageTemplate from '@/components/legal/legal-page-template';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innmotek.com';

export const metadata = {
  title: 'Authorized Dealer & Partner Policy | Innmotek LLP',
  description: 'Guidelines, technical criteria, margin structure, and authorized territory representations for Innmotek channel partners.',
  alternates: {
    canonical: `${siteUrl}/dealer-policy`,
  },
};

export const revalidate = 30;

export default async function DealerPolicyPage() {
  const page = await getPageBySlug('dealer-policy');
  return <LegalPageTemplate page={page} activeSlug="dealer-policy" />;
}

