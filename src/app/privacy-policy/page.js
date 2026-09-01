/**
 * Innmotek Frontend - Privacy Policy Page (/privacy-policy)
 */

import { getPageBySlug } from '@/lib/api';
import LegalPageTemplate from '@/components/legal/legal-page-template';

export const revalidate = 30;

export default async function PrivacyPolicyPage() {
  const page = await getPageBySlug('privacy-policy');
  return <LegalPageTemplate page={page} activeSlug="privacy-policy" />;
}
