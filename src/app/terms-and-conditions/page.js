/**
 * Innmotek Frontend - Terms & Conditions Page (/terms-and-conditions)
 */

import { getPageBySlug } from '@/lib/api';
import LegalPageTemplate from '@/components/legal/legal-page-template';

export const revalidate = 30;

export default async function TermsPage() {
  const page = await getPageBySlug('terms-and-conditions');
  return <LegalPageTemplate page={page} activeSlug="terms-and-conditions" />;
}
