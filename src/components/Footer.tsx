"use client";

import Link from "next/link";

import { useState, type FormEvent } from "react";
import { person } from "@/lib/resume-data";
import { Button, ButtonLink } from "@/components/Button";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";
import { 
  Facebook, 
  Youtube, 
  Twitter, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin,
  Send
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Tools", href: "/tools" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blogs" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "FAQs", href: "/faqs" },
    { name: "Contact", href: "/contact" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  return (
    <footer className="bg-brand-green text-white">
      {/* Connect Section */}
      <section className="bg-gradient-to-r from-brand-green to-brand-greenDark py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Let&apos;s Connect there</h2>
            <p className="text-sm md:text-base mb-5 text-white/80">
              Ready to start your next project? Let&apos;s discuss how I can help bring your ideas to life.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ButtonLink
              href="/contact"
              variant="accent"
              size="lg"
              className="focus-visible:!ring-offset-brand-green"
            >
              Get Started
            </ButtonLink>
            <ResumeDownloadButton variant="about" label="Download Resume" />
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {/* Brand & Social */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-brand-yellow">{person.name}</h3>
            <p className="max-w-xs text-white/80 leading-snug">
              Full Stack Developer & Cloud Infrastructure Specialist, 
              building scalable web applications and real-time systems.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-yellow hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-2">Quick Links</h4>
            <div className="h-px bg-white/10 mb-3" aria-hidden="true" />
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex w-full items-center rounded-md px-2 py-1 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-3">Contact</h4>
            <div className="h-px bg-white/10 mb-3" aria-hidden="true" />
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                <a
                  className="text-sm text-white/75 transition-colors hover:text-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
                  href={`tel:${person.phone}`}
                >
                  {person.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                <a
                  className="text-sm text-white/75 transition-colors hover:text-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
                  href={`mailto:${person.email}`}
                >
                  {person.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-1" />
                <span className="text-sm text-white/75">{person.location}</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-3">Newsletter</h4>
            <div className="h-px bg-white/10 mb-3" aria-hidden="true" />
            <p className="text-sm text-white/75 mb-3">
              Get the latest information about my projects and tech insights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full flex-1 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/60 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow/30 transition-colors"
                required
              />
              <Button
                type="submit"
                variant="accent"
                size="md"
                className="sm:w-auto focus-visible:!ring-offset-brand-green"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/15 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} {person.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href="#"
                className="text-sm text-white/70 hover:text-brand-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
              >
                User Terms & Conditions
              </a>
              <span className="text-white/30" aria-hidden="true">•</span>
              <a
                href="#"
                className="text-sm text-white/70 hover:text-brand-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
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
