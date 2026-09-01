/**
 * Innmotek Frontend - Root Layout
 * 
 * Sets up global architectural fonts, meta tags, Header (Pattern 3),
 * Fixed Side Rail (Pattern 2), and Footer (Pattern 7).
 */

import './globals.css';
import Header from '@/components/layout/header';
import SideRail from '@/components/layout/side-rail';
import Footer from '@/components/layout/footer';
import { getCategories } from '@/lib/api';

export const metadata = {
  title: 'Innmotek | Advanced Thermal Technology & Heat Pump Systems',
  description: 'Pioneering sustainable heating solutions, aerothermal heat pumps, and hot water thermal systems engineered for maximum COP efficiency.',
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

export default async function RootLayout({ children }) {
  const categories = await getCategories();

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body className="bg-[#0A0A0A] text-white min-h-screen flex flex-col antialiased selection:bg-[#C5A880] selection:text-[#0A0A0A]">
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
