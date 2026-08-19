import type { Metadata } from 'next';
import Link from 'next/link';
import { person } from '@/lib/resume-data';
import { SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `Terms and Conditions for using ${person.name}'s portfolio website and services.`,
  alternates: { canonical: `${SITE_URL}/terms-and-conditions` },
};

export default function TermsPage() {
  const lastUpdated = 'July 14, 2026';

  return (
    <div className="bg-white dark:bg-slate-950 section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <header className="mb-12">
          <p className="text-sm font-semibold text-brand-green dark:text-emerald-400">
            Legal
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Last updated: {lastUpdated}
          </p>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using {SITE_URL} (the &quot;Website&quot;), you
              agree to be bound by these Terms &amp; Conditions. If you do not
              agree to these terms, please do not use the Website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              2. Purpose of the Website
            </h2>
            <p>
              This Website serves as a professional portfolio for {person.name}{' '}
              to showcase work experience, projects, services, and skills. The
              information provided is for informational and business development
              purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3. Intellectual Property
            </h2>
            <p>
              All content on this Website, including text, images, code, design,
              logos, and graphics, is the intellectual property of {person.name}{' '}
              unless otherwise stated. You may not reproduce, distribute, or
              create derivative works without written permission.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Project screenshots and descriptions are shared for portfolio
                purposes with respect to client confidentiality.
              </li>
              <li>
                Code examples or snippets shown are for demonstration only and
                may not reflect production code.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              4. Accuracy of Information
            </h2>
            <p>
              I strive to keep all information on this Website accurate and
              up-to-date. However, I make no warranties about the completeness,
              reliability, or accuracy of this information. Any reliance you
              place on such information is strictly at your own risk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              5. Services &amp; Engagements
            </h2>
            <p>
              Any services described on this Website are subject to a separate
              written agreement. Displayed pricing is indicative and may vary
              based on project scope and complexity. Nothing on this Website
              constitutes a binding offer for services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              6. External Links
            </h2>
            <p>
              This Website may contain links to third-party websites (e.g.,
              project demos, social media profiles). I am not responsible for
              the content, privacy practices, or accuracy of external sites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              7. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, {person.name} shall not be
              liable for any indirect, incidental, special, or consequential
              damages arising from your use of or inability to use this Website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              8. Contact Form Usage
            </h2>
            <p>
              When you submit a message through the contact form, you agree
              that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The information you provide is accurate and truthful.</li>
              <li>
                Your message will be used solely to respond to your inquiry.
              </li>
              <li>
                Spam, automated submissions, or abuse of the form is prohibited.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              9. Changes to These Terms
            </h2>
            <p>
              I reserve the right to update these Terms &amp; Conditions at any
              time. Changes will be effective upon posting to this page with an
              updated &quot;Last updated&quot; date. Your continued use of the
              Website after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              10. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of India. Any disputes shall be subject to the exclusive
              jurisdiction of the courts in Agra, Uttar Pradesh, India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              11. Contact
            </h2>
            <p>
              For questions about these Terms &amp; Conditions, contact me at{' '}
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
