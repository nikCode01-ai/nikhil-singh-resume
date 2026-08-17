'use client';

import { ButtonLink } from '@/components/Button';
import { person, professionalSummary } from '@/lib/resume-data';
import { ResumeDownloadButton } from '@/components/ResumeDownloadButton';
import { ApiUiIcon } from '@/components/ApiUiIcon';
import { ApiAvatar } from '@/components/ApiAvatar';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

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
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/80 to-brand-cream dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-900" />

      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-brand-green/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-brand-yellow/5 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-slate-200/30 dark:border-white/[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-slate-200/20 dark:border-white/[0.02]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 gap-8 lg:gap-16 items-center lg:grid-cols-2">
          <div className="space-y-6 order-2 lg:order-1">
            <div
              className={cn(
                'inline-flex items-center gap-2 rounded-full border border-brand-green/15 dark:border-brand-yellow/15 bg-white/80 dark:bg-white/5 backdrop-blur-sm px-4 py-2 text-sm font-medium text-brand-green dark:text-brand-yellow transition-all duration-700',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              )}
            >
              <span
                className="h-2 w-2 rounded-full bg-brand-green dark:bg-brand-yellow animate-pulse"
                aria-hidden="true"
              />
              Available for new projects
            </div>

            <h1
              className={cn(
                'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white transition-all duration-700 delay-100',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              )}
            >
              <span className="block">Hi, I&apos;m</span>
              <span className="block bg-gradient-to-r from-brand-green via-brand-greenDark to-brand-green dark:from-brand-yellow dark:via-brand-yellow dark:to-brand-yellow/70 bg-clip-text text-transparent">
                {person.name}
              </span>
              <span className="block mt-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-500 dark:text-slate-400 tracking-normal">
                {person.role}
              </span>
              {person.tagline && (
                <span className="block mt-2 text-base sm:text-lg lg:text-xl font-medium text-slate-400 dark:text-slate-500 tracking-normal">
                  {person.tagline}
                </span>
              )}
            </h1>

            <p
              className={cn(
                'text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl transition-all duration-700 delay-200',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              )}
            >
              {summaryLines}
            </p>

            <div
              className={cn(
                'flex flex-wrap gap-3 pt-3 transition-all duration-700 delay-300',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              )}
            >
              <ButtonLink href="/contact" variant="primary" size="lg">
                <ApiUiIcon name="Send" size={16} className="h-4 w-4" />
                Hire Me
              </ButtonLink>
              <ButtonLink href="/projects" variant="secondary" size="lg">
                <ApiUiIcon name="FolderOpen" size={16} className="h-4 w-4" />
                View Projects
              </ButtonLink>
              <ResumeDownloadButton variant="hero" label="Download Resume" />
            </div>

            <div
              className={cn(
                'grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 transition-all duration-700 delay-[400ms]',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              )}
            >
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-slate-200/50 dark:border-white/8 transition-all hover:bg-white dark:hover:bg-white/8">
                <ApiUiIcon
                  name="Mail"
                  size={18}
                  color="brand-green"
                  darkColor="brand-yellow"
                  className="h-[18px] w-[18px] flex-shrink-0"
                />
                <a
                  href={`mailto:${person.email}`}
                  className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate hover:text-brand-green dark:hover:text-brand-yellow transition-colors"
                >
                  {person.email}
                </a>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-slate-200/50 dark:border-white/8 transition-all hover:bg-white dark:hover:bg-white/8">
                <ApiUiIcon
                  name="Phone"
                  size={18}
                  color="brand-green"
                  darkColor="brand-yellow"
                  className="h-[18px] w-[18px] flex-shrink-0"
                />
                <a
                  href={`tel:${person.phone.replace(/\s/g, '')}`}
                  className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate hover:text-brand-green dark:hover:text-brand-yellow transition-colors"
                >
                  {person.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-slate-200/50 dark:border-white/8 transition-all hover:bg-white dark:hover:bg-white/8">
                <ApiUiIcon
                  name="Linkedin"
                  size={18}
                  color="brand-green"
                  darkColor="brand-yellow"
                  className="h-[18px] w-[18px] flex-shrink-0"
                />
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-green dark:hover:text-brand-yellow transition-colors truncate"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div
            className={cn(
              'relative order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-700 delay-200',
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            )}
          >
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              <div
                className="absolute inset-0 -m-6 rounded-3xl bg-gradient-to-br from-brand-green/8 to-brand-yellow/8 blur-2xl"
                aria-hidden="true"
              />

              <div className="relative mx-auto w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[380px] lg:h-[380px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-green to-brand-greenDark dark:from-brand-yellow dark:to-brand-yellow/70 p-1 animate-glow">
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

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white dark:bg-slate-800 px-4 py-2 shadow-elevated border border-slate-100 dark:border-white/10 flex items-center gap-2 animate-float">
                  <span
                    className="h-2 w-2 rounded-full bg-green-500"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Available for Work
                  </span>
                </div>

                <div
                  className="absolute -right-2 top-1/4 rounded-2xl bg-white dark:bg-slate-800 px-3 py-2 shadow-elevated border border-slate-100 dark:border-white/10 animate-float"
                  style={{ animationDelay: '1s' }}
                >
                  <span className="text-xs font-bold text-brand-green dark:text-brand-yellow">
                    Full Stack
                  </span>
                </div>

                <div
                  className="absolute -left-2 bottom-1/3 rounded-2xl bg-white dark:bg-slate-800 px-3 py-2 shadow-elevated border border-slate-100 dark:border-white/10 animate-float"
                  style={{ animationDelay: '2s' }}
                >
                  <span className="text-xs font-bold text-brand-green dark:text-brand-yellow">
                    4+ Years
                  </span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { value: '30+', label: 'Projects' },
                  { value: '25+', label: 'Industries' },
                  { value: '99.9%', label: 'Uptime' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-slate-200/50 dark:border-white/[0.08] transition-all duration-300 hover:bg-white dark:hover:bg-white/8 hover:shadow-sm"
                  >
                    <div className="text-xl sm:text-2xl font-extrabold text-brand-green dark:text-brand-yellow">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
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
