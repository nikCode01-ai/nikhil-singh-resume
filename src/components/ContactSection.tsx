'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { person } from '@/lib/resume-data';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Linkedin,
  Gitlab,
  Clock,
  MessageCircle,
  Globe,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/Button';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    budget: '',
    country: '',
    message: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: person.phone,
      href: `tel:${person.phone}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: person.email,
      href: `mailto:${person.email}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: person.linkedinUrl,
      href: person.linkedinUrl,
    },
    {
      icon: Gitlab,
      label: 'GitLab',
      value: person.gitlabHandle,
      href: person.gitlabUrl,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: person.location,
      href: undefined,
    },
  ];

  const quickLinks = [
    { icon: Globe, label: 'LinkedIn', href: person.linkedinUrl },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: `https://wa.me/${person.phone?.replace(/[^0-9]/g, '')}`,
    },
  ];

  return (
    <section
      className="bg-white dark:bg-slate-950 section-padding"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <span className="h-px w-8 bg-brand-green/20 dark:bg-brand-yellow/20" />
            <span className="text-brand-green dark:text-brand-yellow">
              Contact
            </span>
            <span className="h-px w-8 bg-brand-green/20 dark:bg-brand-yellow/20" />
          </p>
          <h2
            id="contact-heading"
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Let&apos;s Talk
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Have a project in mind? I&apos;d love to hear about it. Fill out the
            form and I&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Information - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">
                Get in Touch
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/3 transition-colors"
                  >
                    <div className="w-11 h-11 bg-brand-green/8 dark:bg-brand-yellow/8 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-brand-green dark:text-brand-yellow" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          className="text-sm font-semibold text-slate-900 dark:text-white hover:text-brand-green dark:hover:text-brand-yellow transition-colors truncate block"
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="card-premium p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full bg-green-500 animate-pulse"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Available for Work
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-slate-400" />
                  Response time: Within 24 hours
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Zap className="w-4 h-4 text-slate-400" />
                  Currently accepting new projects
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-brand-green/8 hover:text-brand-green dark:hover:bg-brand-yellow/8 dark:hover:text-brand-yellow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green dark:focus-visible:ring-brand-yellow focus-visible:ring-offset-2"
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div className="lg:col-span-3 card-premium p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="space-y-1.5">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Your Name *
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/3 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all focus:border-brand-green dark:focus:border-brand-yellow focus:ring-2 focus:ring-brand-green/10 dark:focus:ring-brand-yellow/10"
                    placeholder="John Doe"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Email *
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/3 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all focus:border-brand-green dark:focus:border-brand-yellow focus:ring-2 focus:ring-brand-green/10 dark:focus:ring-brand-yellow/10"
                    placeholder="john@example.com"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="space-y-1.5">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Phone *
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/3 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all focus:border-brand-green dark:focus:border-brand-yellow focus:ring-2 focus:ring-brand-green/10 dark:focus:ring-brand-yellow/10"
                    placeholder="+1 234 567 8900"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    I&apos;m Interested in *
                  </span>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/3 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition-all focus:border-brand-green dark:focus:border-brand-yellow focus:ring-2 focus:ring-brand-green/10 dark:focus:ring-brand-yellow/10 appearance-none"
                  >
                    <option value="">Select a service</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App Development</option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="cloud-services">Cloud Services</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="space-y-1.5">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Budget Range (USD) *
                  </span>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/3 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition-all focus:border-brand-green dark:focus:border-brand-yellow focus:ring-2 focus:ring-brand-green/10 dark:focus:ring-brand-yellow/10 appearance-none"
                  >
                    <option value="">Select budget range</option>
                    <option value="1000-5000">$1,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000-25000">$10,000 - $25,000</option>
                    <option value="25000-50000">$25,000 - $50,000</option>
                    <option value="50000+">$50,000+</option>
                  </select>
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Country *
                  </span>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/3 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition-all focus:border-brand-green dark:focus:border-brand-yellow focus:ring-2 focus:ring-brand-green/10 dark:focus:ring-brand-yellow/10 appearance-none"
                  >
                    <option value="">Select country</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="ca">Canada</option>
                    <option value="au">Australia</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <label className="space-y-1.5 block">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Your Message *
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/3 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all focus:border-brand-green dark:focus:border-brand-yellow focus:ring-2 focus:ring-brand-green/10 dark:focus:ring-brand-yellow/10"
                  placeholder="Tell me about your project, timeline, and any specific requirements..."
                />
              </label>

              <Button type="submit" variant="primary" size="lg" fullWidth>
                <Send className="h-4 w-4" aria-hidden="true" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
