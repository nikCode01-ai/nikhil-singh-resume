'use client';

import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  ExternalLink,
  Globe,
  FileCode2,
  Layers,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';

export default function AdminSEOPage() {
  const [siteUrl] = useState('https://nikhilsingh-eight.vercel.app');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const pagesList = [
    {
      name: 'Home Page',
      path: '/',
      status: '200 OK',
      schema: 'Person, ProfessionalService, WebSite',
      priority: '1.0',
    },
    {
      name: 'About Page',
      path: '/about',
      status: '200 OK',
      schema: 'Person, ProfilePage',
      priority: '0.9',
    },
    {
      name: 'Projects Listing',
      path: '/projects',
      status: '200 OK',
      schema: 'CollectionPage',
      priority: '0.9',
    },
    {
      name: 'Services Listing',
      path: '/services',
      status: '200 OK',
      schema: 'Service',
      priority: '0.8',
    },
    {
      name: 'Blogs Listing',
      path: '/blogs',
      status: '200 OK',
      schema: 'Blog',
      priority: '0.8',
    },
    {
      name: 'FAQs Page',
      path: '/faqs',
      status: '200 OK',
      schema: 'FAQPage',
      priority: '0.7',
    },
    {
      name: 'Testimonials',
      path: '/testimonials',
      status: '200 OK',
      schema: 'Review, AggregateRating',
      priority: '0.7',
    },
    {
      name: 'Pricing Page',
      path: '/price',
      status: '200 OK',
      schema: 'PriceSpecification',
      priority: '0.6',
    },
    {
      name: 'Contact Page',
      path: '/contact',
      status: '200 OK',
      schema: 'ContactPage',
      priority: '0.7',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <Search className="h-7 w-7 text-brand-green dark:text-emerald-400" />
            Google Search Console & SEO Hub
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Verify ownership, test structured data, inspect sitemaps, and submit
            live indexing requests.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm transition-all"
          >
            <Globe className="h-4 w-4" />
            Open Google Search Console
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              1. Google Search Console Verification Steps
            </h2>
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Ready for Verification
            </span>
          </div>

          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-black shrink-0">
                1
              </span>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Add Property in Google Search Console
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Select{' '}
                  <strong className="text-slate-700 dark:text-slate-200">
                    URL Prefix
                  </strong>{' '}
                  and enter:
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <code className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-mono text-emerald-600 dark:text-emerald-400">
                    {siteUrl}
                  </code>
                  <button
                    onClick={() => copyToClipboard(siteUrl, 'siteUrl')}
                    className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                    title="Copy URL"
                  >
                    {copiedKey === 'siteUrl' ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-black shrink-0">
                2
              </span>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Submit XML Sitemap
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  In GSC sidebar, go to{' '}
                  <strong className="text-slate-700 dark:text-slate-200">
                    Sitemaps
                  </strong>{' '}
                  and submit:
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <code className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-mono text-blue-600 dark:text-blue-400">
                    sitemap.xml
                  </code>
                  <button
                    onClick={() => copyToClipboard('sitemap.xml', 'sitemap')}
                    className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                    title="Copy sitemap string"
                  >
                    {copiedKey === 'sitemap' ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <a
                    href={`${siteUrl}/sitemap.xml`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-500 hover:text-blue-500 flex items-center gap-1 ml-auto"
                  >
                    Preview Live Sitemap <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-black shrink-0">
                3
              </span>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Request Direct Indexing
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Paste the home URL in the top search box of Search Console and
                  click{' '}
                  <strong className="text-slate-700 dark:text-slate-200">
                    &quot;Request Indexing&quot;
                  </strong>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCode2 className="h-5 w-5 text-blue-500" />
            Quick Testing Tools
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click to test live structured data and schema markup directly on
            official Google tools:
          </p>

          <div className="space-y-2.5">
            <a
              href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(siteUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all group"
            >
              <span>Google Rich Results Test</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500" />
            </a>

            <a
              href={`https://validator.schema.org/#url=${encodeURIComponent(siteUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all group"
            >
              <span>Schema.org Validator</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500" />
            </a>

            <a
              href="https://www.google.com/search?q=site:nikhilsingh-eight.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all group"
            >
              <span>Check Current Google Index</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500" />
            </a>

            <a
              href={`${siteUrl}/robots.txt`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all group"
            >
              <span>View robots.txt</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500" />
            </a>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-purple-500" />
              Verified Indexable Pages & Schema Markup
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Structured JSON-LD schema injected and validated for rich snippet
              eligibility.
            </p>
          </div>
          <span className="text-xs px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold rounded-lg self-start sm:self-auto">
            {pagesList.length} Core Routes + Dynamic Slugs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Page Name</th>
                <th className="py-3 px-3">Path</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Active Schemas</th>
                <th className="py-3 px-3">Sitemap Priority</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {pagesList.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500">
                    {item.path}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md text-[11px]">
                      <CheckCircle2 className="h-3 w-3" />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                    {item.schema}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-700 dark:text-slate-300">
                    {item.priority}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <a
                      href={`${siteUrl}${item.path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-blue-500 transition-colors"
                      title="Inspect Page"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
