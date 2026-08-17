'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { person } from '@/lib/resume-data';
import { Button, ButtonLink } from '@/components/Button';
import { ResumeDownloadButton } from '@/components/ResumeDownloadButton';
import {
  Linkedin,
  Twitter,
  Github,
  Gitlab,
  Phone,
  Mail,
  MapPin,
  Send,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  const exploreLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Tools & Stack', href: '/tools' },
    { name: 'About Me', href: '/about' },
  ];

  const resourceLinks = [
    { name: 'Technical Blogs', href: '/blogs' },
    { name: 'Client Testimonials', href: '/testimonials' },
    { name: 'Pricing & Plans', href: '/price' },
    { name: 'Job Board', href: '/jobs' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: person.linkedinUrl, label: 'LinkedIn' },
    { icon: Github, href: person.githubUrl, label: 'GitHub' },
    { icon: Gitlab, href: person.gitlabUrl, label: 'GitLab' },
    { icon: Twitter, href: person.twitterUrl, label: 'Twitter' },
  ];

  return (
    <footer
      className="relative overflow-hidden bg-slate-950 text-slate-200 border-t border-slate-800/80"
      role="contentinfo"
    >
      {/* Background ambient glowing gradient */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-3/4 max-w-4xl bg-gradient-to-b from-brand-green/20 via-emerald-600/5 to-transparent blur-3xl opacity-60"
        aria-hidden="true"
      />

      {/* Top CTA Banner */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-brand-green/30 via-slate-900/90 to-slate-900 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          {/* Inner subtle glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-green/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                Let&apos;s Build Together
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Have a project or opportunity in mind?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                I help startups and enterprises build scalable web platforms,
                high-speed backend systems, and modern AI-driven solutions.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 flex-shrink-0">
              <ButtonLink
                href="/contact"
                variant="primary"
                size="lg"
                className="shadow-lg shadow-brand-green/20"
              >
                Start a Conversation
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
              <ResumeDownloadButton variant="about" label="Download Resume" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info Grid */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="space-y-2">
              <Link href="/" className="inline-block">
                <span className="text-2xl font-black tracking-tight text-white hover:opacity-90 transition-opacity">
                  {person.name}
                  <span className="text-brand-greenLight">.</span>
                </span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Full Stack Developer & Cloud Infrastructure Specialist crafting
                high-performance real-time applications and robust backend
                architectures.
              </p>
            </div>

            {/* Live Availability Status */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs font-medium text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for full-time & consulting
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 transition-all duration-200 hover:border-emerald-500/40 hover:bg-brand-green hover:text-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    <span className="transition-transform group-hover:translate-x-1">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    <span className="transition-transform group-hover:translate-x-1">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Direct Contact
              </h3>
              <div className="space-y-2.5 text-sm text-slate-400">
                <a
                  href={`mailto:${person.email}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors group"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 group-hover:border-emerald-500/40 text-brand-greenLight">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <span>{person.email}</span>
                </a>
                <a
                  href={`tel:${person.phone}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors group"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 group-hover:border-emerald-500/40 text-brand-greenLight">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <span>{person.phone}</span>
                </a>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-brand-greenLight">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <span>{person.location}</span>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription Box */}
            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white">
                  Subscribe to Newsletter
                </h4>
                <p className="text-xs text-slate-400">
                  Tech insights on Next.js, Cloud, and full-stack systems.
                </p>
              </div>

              {isSubscribed ? (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 p-2.5 text-xs font-medium text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    aria-label="Email address for newsletter"
                    className="w-full min-w-0 rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="flex-shrink-0 h-auto py-2 px-3.5 text-xs rounded-xl"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-slate-800/80 bg-slate-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()}{' '}
              <span className="font-semibold text-slate-300">
                {person.name}
              </span>
              . All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/terms-and-conditions"
                className="hover:text-slate-300 transition-colors"
              >
                Terms & Conditions
              </Link>
              <span className="text-slate-700" aria-hidden="true">
                &bull;
              </span>
              <Link
                href="/privacy-policy"
                className="hover:text-slate-300 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
