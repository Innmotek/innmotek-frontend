/**
 * Innmotek Frontend - Dealer Policy Page (/dealer-policy)
 */

import { getPageBySlug } from '@/lib/api';
import LegalPageTemplate from '@/components/legal/legal-page-template';

export const revalidate = 30;

export default async function DealerPolicyPage() {
  const page = await getPageBySlug('dealer-policy');
  return <LegalPageTemplate page={page} activeSlug="dealer-policy" />;
}
