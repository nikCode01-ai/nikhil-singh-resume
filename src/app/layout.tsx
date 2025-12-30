import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nikhil Singh | Senior Full Stack Developer",
    template: "%s | Nikhil Singh",
  },
  description:
    "Senior Full Stack Developer & Cloud Infrastructure Specialist. Next.js, React, Node.js, Fastify, Laravel, Strapi, WebSockets, SSE, NDC APIs.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "Nikhil Singh | Senior Full Stack Developer",
    description:
      "Senior Full Stack Developer & Cloud Infrastructure Specialist. Next.js, React, Node.js, Fastify, Laravel, Strapi, WebSockets, SSE, NDC APIs.",
  },
  twitter: {
    card: "summary",
    title: "Nikhil Singh | Senior Full Stack Developer",
    description:
      "Senior Full Stack Developer & Cloud Infrastructure Specialist. Next.js, React, Node.js, Fastify, Laravel, Strapi, WebSockets, SSE, NDC APIs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50 text-slate-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
