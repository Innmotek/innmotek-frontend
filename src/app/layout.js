/**
 * Innmotek Frontend - Root Layout
 * 
 * Sets up global architectural fonts, meta tags, Header (Pattern 3),
 * Fixed Side Rail (Pattern 2), and Footer (Pattern 7).
 */

import './globals.css';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import Header from '@/components/layout/header';
import SideRail from '@/components/layout/side-rail';
import Footer from '@/components/layout/footer';
import { getCategories } from '@/lib/api';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innmotek.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Innmotek | Advanced Thermal Technology & Heat Pump Systems',
    template: '%s | Innmotek'
  },
  description: 'Pioneering sustainable heating solutions, aerothermal heat pumps, and hot water thermal systems engineered for maximum COP efficiency.',
  alternates: {
    canonical: './',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Innmotek',
    title: 'Innmotek | Advanced Thermal Technology & Heat Pump Systems',
    description: 'Pioneering sustainable heating solutions, aerothermal heat pumps, and hot water thermal systems engineered for maximum COP efficiency.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' }
    ],
    shortcut: ['/favicon.ico']
  }
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'HVACBusiness', 'LocalBusiness'],
      '@id': `${siteUrl}/#organization`,
      name: 'Innmotek LLP',
      legalName: 'Innmotek LLP',
      alternateName: 'Innmotek',
      url: siteUrl,
      logo: `${siteUrl}/images/logo-white.png`,
      image: `${siteUrl}/images/logo-white.png`,
      description: 'Pioneering sustainable heating solutions, aerothermal heat pumps, and hot water thermal systems engineered for maximum COP efficiency.',
      telephone: '+91 808 1741031',
      email: 'info@innmotek.com',
      priceRange: '$$$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'GIDA',
        addressLocality: 'Gorakhpur',
        addressRegion: 'Uttar Pradesh',
        postalCode: '273209',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 26.7398709,
        longitude: 83.2307286
      },
      hasMap: 'https://www.google.com/maps/dir/?api=1&destination=26.7398709,83.2307286',
      areaServed: [
        {
          '@type': 'Country',
          name: 'India'
        },
        {
          '@type': 'Country',
          name: 'United Arab Emirates'
        },
        {
          '@type': 'Country',
          name: 'Nepal'
        }
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '18:00'
        }
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91 808 1741031',
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi']
        },
        {
          '@type': 'ContactPoint',
          telephone: '+971 554398350',
          contactType: 'sales',
          areaServed: 'AE',
          availableLanguage: ['English', 'Arabic']
        }
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Innmotek',
      description: 'Advanced Thermal Technology & Aerothermal Heat Pump Systems',
      publisher: {
        '@id': `${siteUrl}/#organization`
      }
    }
  ]
};

export default async function RootLayout({ children }) {
  const categories = await getCategories();

  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-[#0A0A0A] text-white font-sans min-h-screen flex flex-col antialiased selection:bg-[#C5A880] selection:text-[#0A0A0A]">
        {/* Navigation Bar */}
        <Header categories={categories} />

        {/* Fixed Brand Side Rail */}
        <SideRail />

        {/* Main Content Area */}
        <main className="flex-1 xl:mr-14">
          {children}
        </main>

        {/* Footer */}
        <div className="xl:mr-14">
          <Footer categories={categories} />
        </div>
      </body>
    </html>
  );
}
