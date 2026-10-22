/**
 * Innmotek Frontend - Contact Route Layout (Metadata Wrapper)
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innmotek.com';

export const metadata = {
  title: 'Contact Engineering & Sizing Desk | Innmotek',
  description: 'Connect with Innmotek thermal engineers for heat pump sizing, custom thermodynamics quotation, and HVAC equipment inquiries across India and UAE.',
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact Engineering & Sizing Desk | Innmotek',
    description: 'Connect with Innmotek thermal engineers for heat pump sizing, custom thermodynamics quotation, and HVAC equipment inquiries across India and UAE.',
    url: `${siteUrl}/contact`,
  }
};

export default function ContactLayout({ children }) {
  return children;
}
