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
    default: 'Nikhil Singh | Senior Full Stack Developer',
    template: '%s | Nikhil Singh',
  },
  description:
    'Senior Full Stack Developer & Cloud Infrastructure Specialist. Next.js, React, Node.js, Fastify, Laravel, Strapi, WebSockets, SSE, NDC APIs.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    title: 'Nikhil Singh | Senior Full Stack Developer',
    description:
      'Senior Full Stack Developer & Cloud Infrastructure Specialist. Next.js, React, Node.js, Fastify, Laravel, Strapi, WebSockets, SSE, NDC APIs.',
  },
  twitter: {
    card: 'summary',
    title: 'Nikhil Singh | Senior Full Stack Developer',
    description:
      'Senior Full Stack Developer & Cloud Infrastructure Specialist. Next.js, React, Node.js, Fastify, Laravel, Strapi, WebSockets, SSE, NDC APIs.',
  },
  verification: {
    kro: 'your-kro-verification-code',
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
