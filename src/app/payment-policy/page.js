/**
 * Innmotek Frontend - Payment Policy Page (/payment-policy)
 */

import { getPageBySlug } from '@/lib/api';
import LegalPageTemplate from '@/components/legal/legal-page-template';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innmotek.com';

export const metadata = {
  title: 'Commercial Payment Terms & Billing Policy | Innmotek LLP',
  description: 'Payment terms, commercial milestones, GST compliance, and accepted transactional methods for Innmotek thermal systems.',
  alternates: {
    canonical: `${siteUrl}/payment-policy`,
  },
};

export const revalidate = 30;

export default async function PaymentPolicyPage() {
  const page = await getPageBySlug('payment-policy');
  return <LegalPageTemplate page={page} activeSlug="payment-policy" />;
}

