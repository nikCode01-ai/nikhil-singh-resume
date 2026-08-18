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
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/Button';
import { FadeIn } from '@/components/FadeIn';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'web-development',
    budget: '$5,000 - $10,000',
    country: 'United States',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyToClipboard = (text: string, field: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Interest: ${formData.interest}\nBudget: ${formData.budget}\nCountry: ${formData.country}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || 'Failed to send message. Please try again.'
        );
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: 'web-development',
        budget: '$5,000 - $10,000',
        country: 'United States',
        message: '',
      });
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const services = [
    { id: 'web-development', label: 'Full-Stack Web' },
    { id: 'cloud-devops', label: 'Cloud & DevOps' },
    { id: 'ai-integrations', label: 'AI & Automation' },
    { id: 'architecture', label: 'System Design' },
    { id: 'consulting', label: 'Tech Advisory' },
  ];

  return (
    <section
      className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 section-padding"
      aria-labelledby="contact-heading"
      id="contact"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-5xl bg-gradient-to-b from-brand-green/10 via-emerald-500/5 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 text-brand-green dark:text-emerald-400" />
            Direct Communication Channel
          </div>
          <h2
            id="contact-heading"
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Let&apos;s Build Something{' '}
            <span className="text-brand-green dark:text-brand-greenLight">
              Great
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Have a project, freelance inquiry, or engineering role? Send a
            message directly or connect across the channels below.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 max-w-6xl mx-auto items-start">
            {/* Left Column: Direct Info & Availability (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Live Availability Status Card */}
              <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-white dark:bg-slate-900 p-6 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Available for Work
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    Q3/Q4 2026
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Currently accepting select freelance client contracts,
                  consulting roles, and full-time senior engineering
                  opportunities.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                    <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>&lt; 2h Avg Response</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                    <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>Direct Communication</span>
                  </div>
                </div>
              </div>

              {/* Direct Connect Items */}
              <div className="space-y-3">
                {/* Email Card */}
                <div className="group flex items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:border-emerald-500/40">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 bg-brand-green/10 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-green dark:text-emerald-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Email Address
                      </p>
                      <a
                        href={`mailto:${person.email}`}
                        className="text-sm font-semibold text-slate-900 dark:text-white hover:text-brand-green dark:hover:text-emerald-400 transition-colors truncate block"
                      >
                        {person.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(person.email, 'email')}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex-shrink-0"
                    title="Copy email"
                    aria-label="Copy email address"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone Card */}
                <div className="group flex items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:border-emerald-500/40">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 bg-brand-green/10 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-green dark:text-emerald-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Phone & WhatsApp
                      </p>
                      <a
                        href={`tel:${person.phone}`}
                        className="text-sm font-semibold text-slate-900 dark:text-white hover:text-brand-green dark:hover:text-emerald-400 transition-colors truncate block"
                      >
                        {person.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(person.phone, 'phone')}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex-shrink-0"
                    title="Copy phone"
                    aria-label="Copy phone number"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location Card */}
                <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                  <div className="w-11 h-11 bg-brand-green/10 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-green dark:text-emerald-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Location & Timezone
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {person.location} ({person.timezone})
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Action Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-500/40 hover:bg-brand-green hover:text-white transition-all shadow-xs"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href={person.gitlabUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-500/40 hover:bg-brand-green hover:text-white transition-all shadow-xs"
                >
                  <Gitlab className="w-4 h-4" />
                  GitLab
                </a>
                <a
                  href={`https://wa.me/${person.phone?.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Right Column: Modern Interactive Form (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xl backdrop-blur-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Your message has been received
                    and I will get back to you within 24 hours.
                  </p>
                  <div className="pt-4">
                    <Button
                      type="button"
                      variant="secondary"
                      size="md"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Banner */}
                  {errorMessage && (
                    <div className="p-4 rounded-xl border border-red-500/20 bg-red-50 dark:bg-red-950/40 text-sm text-red-600 dark:text-red-400">
                      {errorMessage}
                    </div>
                  )}

                  {/* Service Interest Chips */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      What are you looking for?
                    </label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {services.map((s) => {
                        const isSelected = formData.interest === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, interest: s.id })
                            }
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                              isSelected
                                ? 'bg-brand-green text-white shadow-sm ring-2 ring-brand-green/20'
                                : 'border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {s.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                        Your Name <span className="text-emerald-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Alex Morgan"
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                        Email Address{' '}
                        <span className="text-emerald-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="alex@company.com"
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                      />
                    </div>
                  </div>

                  {/* Phone & Budget Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                      />
                    </div>

                    <div className="space-y-1.5 relative">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                        Expected Budget
                      </label>
                      <div className="relative">
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 pr-10 text-sm text-slate-900 dark:text-white outline-none transition-all focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                        >
                          <option value="<$5,000">
                            &lt; $5,000 (Small Project)
                          </option>
                          <option value="$5,000 - $10,000">
                            $5,000 - $10,000 (Standard)
                          </option>
                          <option value="$10,000 - $25,000">
                            $10,000 - $25,000 (Growth)
                          </option>
                          <option value="$25,000+">
                            $25,000+ (Enterprise)
                          </option>
                          <option value="Full-Time / Contract">
                            Full-Time / Contract Role
                          </option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Project Details & Scope{' '}
                      <span className="text-emerald-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Tell me about your goals, stack preferences, timeline, and expectations..."
                      className="w-full resize-none rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    />
                  </div>

                  {/* Submit & Guarantee */}
                  <div className="pt-2 space-y-3">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={loading}
                      className="shadow-lg shadow-brand-green/20 py-3.5"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Sending Message...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Your data is protected. No spam guaranteed.</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
