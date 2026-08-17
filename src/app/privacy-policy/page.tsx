import type { Metadata } from 'next';
import Link from 'next/link';
import { person } from '@/lib/resume-data';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${person.name}'s portfolio website. Learn how your data is collected, used, and protected.`,
  alternates: { canonical: `${siteUrl}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'July 14, 2026';

  return (
    <div className="bg-white dark:bg-slate-950 section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <header className="mb-12">
          <p className="text-sm font-semibold text-brand-green dark:text-emerald-400">
            Legal
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Last updated: {lastUpdated}
          </p>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              1. Introduction
            </h2>
            <p>
              This Privacy Policy describes how {person.name} (&quot;I&quot;,
              &quot;me&quot;, or &quot;my&quot;) collects, uses, and protects
              your personal information when you visit {siteUrl} (the
              &quot;Website&quot;). By using this Website, you agree to the
              practices described in this policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              2. Information I Collect
            </h2>
            <p>When you visit or interact with this Website, I may collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> Name, email address, and
                message content submitted through the contact form.
              </li>
              <li>
                <strong>Usage Data:</strong> IP address, browser type, pages
                visited, time spent, and other analytics data collected
                automatically.
              </li>
              <li>
                <strong>Cookies:</strong> This Website uses minimal cookies for
                theme preferences (dark/light mode) stored locally in your
                browser.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3. How I Use Your Information
            </h2>
            <p>I use the collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your contact form inquiries and messages.</li>
              <li>Improve the Website and user experience.</li>
              <li>Analyze website traffic and usage patterns.</li>
              <li>
                Ensure the security and proper functioning of the Website.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              4. Third-Party Services
            </h2>
            <p>
              This Website may use the following third-party services that
              collect data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Vercel:</strong> Hosting and analytics platform. See
                Vercel&apos;s{' '}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green dark:text-emerald-400 underline"
                >
                  Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Google Analytics (optional):</strong> If enabled, used
                for website traffic analysis. See Google&apos;s{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green dark:text-emerald-400 underline"
                >
                  Privacy Policy
                </a>
                .
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              5. Data Retention
            </h2>
            <p>
              Contact form submissions are retained only as long as necessary to
              respond to your inquiry. Usage analytics data is retained per the
              third-party service&apos;s standard retention periods.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              6. Data Security
            </h2>
            <p>
              I implement reasonable security measures to protect your personal
              information. However, no method of electronic transmission or
              storage is 100% secure, and I cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              7. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to the personal data I hold about you.</li>
              <li>Request correction or deletion of your personal data.</li>
              <li>Opt out of analytics tracking.</li>
              <li>Withdraw consent for data processing at any time.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              8. Children&apos;s Privacy
            </h2>
            <p>
              This Website is not intended for children under 13. I do not
              knowingly collect personal information from children.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              9. Changes to This Policy
            </h2>
            <p>
              I may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated &quot;Last updated&quot;
              date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              10. Contact
            </h2>
            <p>
              If you have questions about this Privacy Policy, contact me at{' '}
              <a
                href={`mailto:${person.email}`}
                className="text-brand-green dark:text-emerald-400 underline"
              >
                {person.email}
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/"
            className="text-sm font-semibold text-brand-green dark:text-emerald-400 hover:underline"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
