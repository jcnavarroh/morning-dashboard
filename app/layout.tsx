import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Morning Dashboard | Personalized Daily Insights',
  description:
    'A beautiful morning dashboard with personalized weather, location, and inspirational quotes to start your day right.',
  keywords: ['dashboard', 'weather', 'quotes', 'morning', 'personalized'],
  authors: [{ name: 'Juan Camilo' }],
  creator: 'Juan Camilo',
  openGraph: {
    title: 'Morning Dashboard | Personalized Daily Insights',
    description:
      'Start your day with personalized weather, location, and inspirational quotes.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Morning Dashboard | Personalized Daily Insights',
    description:
      'Start your day with personalized weather, location, and inspirational quotes.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#000000' },
    { media: '(prefers-color-scheme: dark)', color: '#00ff88' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} antialiased aurora-bg`}>
        <div className='min-h-screen relative overflow-hidden'>
          {/* Aurora Borealis Background Effect */}
          <div className='fixed inset-0 aurora-overlay pointer-events-none'></div>
          <div className='relative z-10'>{children}</div>
        </div>
      </body>
    </html>
  );
}
