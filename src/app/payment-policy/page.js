/**
 * Innmotek Frontend - Payment Policy Page (/payment-policy)
 */

import { getPageBySlug } from '@/lib/api';
import LegalPageTemplate from '@/components/legal/legal-page-template';

export const revalidate = 30;

export default async function PaymentPolicyPage() {
  const page = await getPageBySlug('payment-policy');
  return <LegalPageTemplate page={page} activeSlug="payment-policy" />;
}
