import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'El Manssouri Anas - Portfolio Développeur',
  description: 'Portfolio d\'Anas El Manssouri, développeur passionné de 17 ans. Découvrez mes projets GitHub et réalisations personnelles.',
  keywords: [
    'portfolio',
    'développeur',
    'full stack',
    'React',
    'Next.js',
    'TypeScript',
    'GitHub',
    'projets',
    'web development'
  ],
  authors: [{ name: 'El Manssouri Anas' }],
  creator: 'El Manssouri Anas',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://votre-domaine.com',
    title: 'El Manssouri Anas - Portfolio Développeur',
    description: 'Portfolio d\'Anas El Manssouri, développeur passionné de 17 ans. Découvrez mes projets GitHub et réalisations personnelles.',
    siteName: 'El Manssouri Anas Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio Moderne',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Manssouri Anas - Portfolio Développeur',
    description: 'Portfolio d\'Anas El Manssouri, développeur passionné de 17 ans.',
    images: ['/og-image.jpg'],
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#A087FF" />
      </head>
      <body className={cn(
        inter.className,
        'min-h-screen bg-background font-sans antialiased'
      )}>
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
} 