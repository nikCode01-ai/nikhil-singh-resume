import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';
import './globals.css';
import { HomeHeader } from '@/components/HomeHeader';
import { LazyChatbot } from '@/components/LazyChatbot';
import { Footer } from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app'
  ),
  title: {
    default:
      'Nikhil Singh | Senior Full Stack Developer | Next.js, React, Node.js Expert',
    template: '%s | Nikhil Singh - Senior Full Stack Developer',
  },
  description:
    'Senior Full Stack Developer & Cloud Infrastructure Specialist with 4+ years experience. Expert in Next.js, React, Node.js, Fastify, NDC API Integration, GenAI/LLM, WebSockets, AWS. Available for freelance projects.',
  keywords: [
    'Senior Full Stack Developer',
    'Full Stack Developer India',
    'Next.js Developer',
    'React Developer',
    'Node.js Developer',
    'NDC API Integration',
    'Airline Booking System Developer',
    'GenAI Developer',
    'LLM Integration Expert',
    'RAG Chatbot Developer',
    'WebSocket Developer',
    'Real-time Systems Developer',
    'AWS Developer',
    'Full Stack Developer Agra',
    'Freelance Web Developer',
    'Travel Technology Developer',
  ],
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
    url:
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://nikhilsingh-eight.vercel.app',
    siteName: 'Nikhil Singh Portfolio',
    title:
      'Nikhil Singh | Senior Full Stack Developer | Next.js, React, Node.js Expert',
    description:
      'Senior Full Stack Developer & Cloud Infrastructure Specialist with 4+ years experience. Expert in Next.js, React, Node.js, Fastify, NDC API Integration, GenAI/LLM, WebSockets, AWS.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Nikhil Singh - Senior Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nikhil Singh | Senior Full Stack Developer',
    description:
      'Senior Full Stack Developer & Cloud Infrastructure Specialist. Expert in Next.js, React, Node.js, NDC APIs, GenAI/LLM.',
    creator: '@nikhilcool974',
    images: ['/og-image.svg'],
  },
  verification: {
    google: 'google965e9543cc274a9b', // Replace with actual Google Search Console verification code
    yandex: 'yandex-verification-code',
  },
  category: 'technology',
  classification: 'Portfolio',
  authors: [
    {
      name: 'Nikhil Singh',
      url:
        process.env.NEXT_PUBLIC_SITE_URL ||
        'https://nikhilsingh-eight.vercel.app',
    },
  ],
  creator: 'Nikhil Singh',
  publisher: 'Nikhil Singh',
  other: {
    'geo.region': 'IN-UP',
    'geo.placename': 'Agra',
    'geo.position': '27.1767;78.0081',
    ICBM: '27.1767, 78.0081',
    'og:see_also': [
      'https://linkedin.com/in/nikhil-code05',
      'https://github.com/nikCode01-ai',
      'https://gitlab.com/nikhilcool974',
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${geistMono.variable} min-h-screen bg-brand-cream font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100`}
      >
        <Script id="theme-init" strategy="beforeInteractive">{`(() => {
    try {
      const saved = localStorage.getItem('theme');
      const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = (saved === 'dark' || saved === 'light') ? saved : (preferredDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch (_) {}
  })();`}</Script>
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga4-init" strategy="lazyOnload">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
            `}</Script>
          </>
        )}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Nikhil Singh',
                url:
                  process.env.NEXT_PUBLIC_SITE_URL ||
                  'https://nikhilsingh-eight.vercel.app',
                image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app'}/og-image.svg`,
                jobTitle: 'Senior Full Stack Developer',
                description:
                  'Senior Full Stack Developer & Cloud Infrastructure Specialist with 4+ years experience in Next.js, React, Node.js, NDC API Integration, GenAI/LLM.',
                knowsAbout: [
                  'Next.js',
                  'React',
                  'Node.js',
                  'Fastify',
                  'TypeScript',
                  'WebSockets',
                  'Server-Sent Events',
                  'NDC APIs',
                  'AWS',
                  'GenAI',
                  'LLM Integration',
                  'RAG',
                  'PostgreSQL',
                  'MongoDB',
                ],
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Agra',
                  addressRegion: 'Uttar Pradesh',
                  addressCountry: 'IN',
                },
                email: 'nikhilcool974@gmail.com',
                telephone: '+91 8532856980',
                sameAs: [
                  'https://github.com/nikhilcool974',
                  'https://linkedin.com/in/nikhil-code05',
                  'https://gitlab.com/nikhilcool974',
                  'https://twitter.com/nikhilcool974',
                ],
                worksFor: {
                  '@type': 'Organization',
                  name: 'Aalpha Media',
                  url: 'https://aalpha.net',
                },
                alumniOf: {
                  '@type': 'EducationalOrganization',
                  name: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
                },
                hasCredential: [
                  'AWS Certified Developer – Associate',
                  'Advanced React Patterns (Epic React)',
                  'MongoDB Developer Certification',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'ProfessionalService',
                name: 'Nikhil Singh - Full Stack Developer',
                description:
                  'Professional full-stack development services including Next.js, React, Node.js, NDC API integration, GenAI/LLM solutions, and cloud infrastructure.',
                url:
                  process.env.NEXT_PUBLIC_SITE_URL ||
                  'https://nikhilsingh-eight.vercel.app',
                image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app'}/og-image.svg`,
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Agra',
                  addressRegion: 'Uttar Pradesh',
                  addressCountry: 'IN',
                },
                priceRange: '$$',
                serviceType: [
                  'Full Stack Web Development',
                  'NDC API Integration',
                  'GenAI/LLM Solutions',
                  'Cloud Infrastructure',
                  'Real-time Systems',
                ],
                areaServed: 'Worldwide',
                availableLanguage: ['English', 'Hindi', 'Punjabi'],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Nikhil Singh Portfolio',
                url:
                  process.env.NEXT_PUBLIC_SITE_URL ||
                  'https://nikhilsingh-eight.vercel.app',
                description:
                  'Portfolio of Nikhil Singh - Senior Full Stack Developer specializing in Next.js, React, Node.js, NDC APIs, GenAI/LLM.',
                inLanguage: 'en-US',
                publisher: {
                  '@type': 'Person',
                  name: 'Nikhil Singh',
                },
              },
            ]),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-2.5 focus:bg-brand-green focus:text-white focus:rounded-xl focus:font-bold focus:text-sm focus:shadow-elevated"
        >
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <HomeHeader />
          <div className="h-20 lg:h-24" aria-hidden="true" />
          <main id="main-content" className="flex-1" role="main">
            {children}
          </main>
          <Footer />
          <LazyChatbot />
          <ScrollToTopButton />
        </div>
      </body>
    </html>
  );
}
