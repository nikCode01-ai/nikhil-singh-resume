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
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Tools', href: '/tools' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: person.linkedinUrl, label: 'LinkedIn' },
    { icon: Twitter, href: person.twitterUrl, label: 'Twitter' },
    { icon: Github, href: person.githubUrl, label: 'GitHub' },
    { icon: Gitlab, href: person.gitlabUrl, label: 'GitLab' },
  ];

  return (
    <footer
      className="bg-slate-900 dark:bg-slate-950 text-white"
      role="contentinfo"
    >
      {/* Connect Section */}
      <section className="bg-gradient-to-r from-brand-green to-brand-greenDark py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Let&apos;s Connect
            </h2>
            <p className="text-sm sm:text-base mb-6 text-white/80 max-w-xl mx-auto">
              Ready to start your next project? Let&apos;s discuss how I can
              help bring your ideas to life.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact" variant="accent" size="lg">
              Start a Project
            </ButtonLink>
            <ResumeDownloadButton variant="about" label="Download Resume" />
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand & Social */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-brand-yellow">
              {person.name}
            </h3>
            <p className="max-w-xs text-sm text-slate-400 leading-relaxed">
              Full Stack Developer & Cloud Infrastructure Specialist, building
              scalable web applications and real-time systems.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8 text-slate-300 transition-all duration-200 hover:bg-brand-yellow hover:text-brand-green hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-1">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex w-full items-center rounded-lg px-3 py-1.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <a
                  className="text-sm text-slate-400 transition-colors hover:text-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  href={`tel:${person.phone}`}
                >
                  {person.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <a
                  className="text-sm text-slate-400 transition-colors hover:text-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  href={`mailto:${person.email}`}
                >
                  {person.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">
                  {person.location}
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-slate-400 mb-3">
              Get the latest updates about projects and tech insights.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow/20 transition-colors"
                required
                aria-label="Email for newsletter"
              />
              <Button
                type="submit"
                variant="accent"
                size="md"
                className="w-full"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 mt-10 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} {person.name}. All rights
              reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href="#"
                className="text-sm text-slate-500 hover:text-brand-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Terms & Conditions
              </a>
              <span className="text-slate-700" aria-hidden="true">
                &bull;
              </span>
              <a
                href="#"
                className="text-sm text-slate-500 hover:text-brand-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
