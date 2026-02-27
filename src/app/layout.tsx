import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';
import './globals.css';
import { HomeHeader } from '@/components/HomeHeader';
import { Chatbot } from '@/components/Chatbot';
import { Footer } from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
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
    url: 'https://nikhilsingh-eight.vercel.app',
    siteName: 'Nikhil Singh Portfolio',
    title:
      'Nikhil Singh | Senior Full Stack Developer | Next.js, React, Node.js Expert',
    description:
      'Senior Full Stack Developer & Cloud Infrastructure Specialist with 4+ years experience. Expert in Next.js, React, Node.js, Fastify, NDC API Integration, GenAI/LLM, WebSockets, AWS.',
    images: [
      {
        url: '/og-image.png',
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
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google965e9543cc274a9b', // Replace with actual Google Search Console verification code
    yandex: 'yandex-verification-code',
  },
  alternates: {
    canonical: 'https://nikhilsingh-eight.vercel.app',
    languages: {
      'en-US': 'https://nikhilsingh-eight.vercel.app',
    },
  },
  category: 'technology',
  classification: 'Portfolio',
  other: {
    'geo.region': 'IN',
    'geo.placename': 'Agra, Uttar Pradesh, India',
    'og:see_also': 'https://linkedin.com/in/nikhil-code05',
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
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Nikhil Singh',
                url: 'https://nikhilsingh-eight.vercel.app',
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
                telephone: '+918532856980',
                sameAs: [
                  'https://github.com/nikCode01-ai',
                  'https://linkedin.com/in/nikhil-singh',
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
                credential: [
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
                url: 'https://nikhilsingh-eight.vercel.app',
                image: 'https://nikhilsingh-eight.vercel.app/og-image.png',
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
                '@type': 'Website',
                name: 'Nikhil Singh Portfolio',
                url: 'https://nikhilsingh-eight.vercel.app',
                description:
                  'Portfolio of Nikhil Singh - Senior Full Stack Developer specializing in Next.js, React, Node.js, NDC APIs, GenAI/LLM.',
                publisher: {
                  '@type': 'Person',
                  name: 'Nikhil Singh',
                },
              },
            ]),
          }}
        />
        <div className="flex min-h-screen flex-col">
          <HomeHeader />
          <div className="h-24" aria-hidden="true" />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
          <Chatbot />
          <ScrollToTopButton />
        </div>
      </body>
    </html>
  );
}
