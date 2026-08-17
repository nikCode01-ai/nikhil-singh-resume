'use client';

import { ButtonLink } from '@/components/Button';
import { person, professionalSummary } from '@/lib/resume-data';
import { ResumeDownloadButton } from '@/components/ResumeDownloadButton';
import { ApiUiIcon } from '@/components/ApiUiIcon';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const summaryLines =
  professionalSummary
    .split('.')
    .filter((s) => s.trim())
    .slice(0, 3)
    .join('.') + '.';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/90 to-brand-cream/60 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-900" />

      {/* Ambient Lighting Circles */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-brand-green/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-emerald-500/10 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-slate-200/40 dark:border-white/[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-slate-200/20 dark:border-white/[0.02]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:gap-16 items-center lg:grid-cols-12">
          {/* Left Hero Content (7 cols) */}
          <div className="space-y-6 order-2 lg:order-1 lg:col-span-7">
            {/* Live Availability Badge */}
            <div
              className={cn(
                'inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/40 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 transition-all duration-700',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              )}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for high-impact projects</span>
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            </div>

            {/* Headline */}
            <h1
              className={cn(
                'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white transition-all duration-700 delay-100',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              )}
            >
              <span className="block text-slate-700 dark:text-slate-300 text-2xl sm:text-3xl lg:text-4xl font-semibold mb-1">
                Hi, I&apos;m
              </span>
              <span className="block bg-gradient-to-r from-brand-green via-emerald-600 to-teal-500 dark:from-emerald-400 dark:via-emerald-300 dark:to-teal-300 bg-clip-text text-transparent pb-1">
                {person.name}
              </span>
              <span className="block mt-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-600 dark:text-slate-400 tracking-normal">
                {person.role}
              </span>
              {person.tagline && (
                <span className="block mt-1.5 text-sm sm:text-base lg:text-lg font-medium text-slate-500 dark:text-slate-400 tracking-normal">
                  {person.tagline}
                </span>
              )}
            </h1>

            {/* Bio Summary */}
            <p
              className={cn(
                'text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl transition-all duration-700 delay-200',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              )}
            >
              {summaryLines}
            </p>

            {/* Dual Actions CTA */}
            <div
              className={cn(
                'flex flex-wrap items-center gap-3 pt-2 transition-all duration-700 delay-300',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              )}
            >
              <ButtonLink
                href="/contact"
                variant="primary"
                size="lg"
                className="shadow-lg shadow-brand-green/20 gap-2"
              >
                Hire Me
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/projects" variant="secondary" size="lg">
                View Projects
              </ButtonLink>
              <ResumeDownloadButton variant="hero" label="Download Resume" />
            </div>

            {/* Quick Contact Micro-Cards */}
            <div
              className={cn(
                'grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 transition-all duration-700 delay-[400ms]',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              )}
            >
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800 transition-all hover:border-emerald-500/40 shadow-xs">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                  <ApiUiIcon name="Mail" size={16} />
                </div>
                <a
                  href={`mailto:${person.email}`}
                  className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate hover:text-brand-green dark:hover:text-emerald-400 transition-colors"
                >
                  {person.email}
                </a>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800 transition-all hover:border-emerald-500/40 shadow-xs">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                  <ApiUiIcon name="Phone" size={16} />
                </div>
                <a
                  href={`tel:${person.phone.replace(/\s/g, '')}`}
                  className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate hover:text-brand-green dark:hover:text-emerald-400 transition-colors"
                >
                  {person.phone}
                </a>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800 transition-all hover:border-emerald-500/40 shadow-xs">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                  <ApiUiIcon name="Linkedin" size={16} />
                </div>
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-brand-green dark:hover:text-emerald-400 transition-colors truncate"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>

          {/* Right Hero Image & Stats (5 cols) */}
          <div
            className={cn(
              'relative order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end transition-all duration-700 delay-200',
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            )}
          >
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              {/* Radial glow background */}
              <div
                className="absolute inset-0 -m-6 rounded-full bg-gradient-to-br from-brand-green/15 to-emerald-500/10 blur-3xl"
                aria-hidden="true"
              />

              {/* Profile Image with Ring */}
              <div className="relative mx-auto w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[380px] lg:h-[380px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-green via-emerald-500 to-teal-500 p-1.5 shadow-2xl animate-glow">
                  <div className="h-full w-full rounded-full overflow-hidden bg-white dark:bg-slate-900 p-1">
                    <Image
                      src="/images/nik_profile.jpeg"
                      width={380}
                      height={380}
                      className="h-full w-full rounded-full object-cover"
                      alt={`${person.name} - ${person.role}`}
                      priority
                    />
                  </div>
                </div>

                {/* Floating Badge: Available for Work */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2 shadow-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-2 animate-float">
                  <span
                    className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Open for Opportunities
                  </span>
                </div>

                {/* Floating Badge: Senior Full Stack */}
                <div
                  className="absolute -right-2 top-1/4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-2 shadow-xl border border-slate-200/80 dark:border-slate-800 animate-float"
                  style={{ animationDelay: '1s' }}
                >
                  <span className="text-xs font-extrabold text-brand-green dark:text-brand-greenLight">
                    Full Stack Architect
                  </span>
                </div>

                {/* Floating Badge: 4+ Years Experience */}
                <div
                  className="absolute -left-2 bottom-1/3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-2 shadow-xl border border-slate-200/80 dark:border-slate-800 animate-float"
                  style={{ animationDelay: '2s' }}
                >
                  <span className="text-xs font-extrabold text-brand-green dark:text-brand-greenLight">
                    4+ Years Exp
                  </span>
                </div>
              </div>

              {/* Metric Stats Cards */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { value: '30+', label: 'Projects Built' },
                  { value: '25+', label: 'Global Clients' },
                  { value: '99.9%', label: 'Uptime SLA' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-0.5 shadow-xs"
                  >
                    <div className="text-xl sm:text-2xl font-black text-brand-green dark:text-brand-greenLight">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
