/**
 * Innmotek Frontend - Terms & Conditions Page (/terms-and-conditions)
 */

import { getPageBySlug } from '@/lib/api';
import LegalPageTemplate from '@/components/legal/legal-page-template';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innmotek.com';

export const metadata = {
  title: 'Terms & Conditions | Innmotek LLP',
  description: 'Commercial terms of supply, installation parameters, thermodynamic performance guarantees, and warranties.',
  alternates: {
    canonical: `${siteUrl}/terms-and-conditions`,
  },
};

export const revalidate = 30;

export default async function TermsPage() {
  const page = await getPageBySlug('terms-and-conditions');
  return <LegalPageTemplate page={page} activeSlug="terms-and-conditions" />;
}

