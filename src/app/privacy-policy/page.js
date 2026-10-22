/**
 * Innmotek Frontend - Privacy Policy Page (/privacy-policy)
 */

import { getPageBySlug } from '@/lib/api';
import LegalPageTemplate from '@/components/legal/legal-page-template';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innmotek.com';

export const metadata = {
  title: 'Privacy Policy | Innmotek LLP',
  description: 'Innmotek LLP commitment to data privacy, confidentiality, and GDPR/IT Act data protection compliance.',
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
};

export const revalidate = 30;

export default async function PrivacyPolicyPage() {
  const page = await getPageBySlug('privacy-policy');
  return <LegalPageTemplate page={page} activeSlug="privacy-policy" />;
}

