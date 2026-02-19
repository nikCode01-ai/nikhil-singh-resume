'use client';

import { ButtonLink } from "@/components/Button";
import { person, professionalSummary } from "@/lib/resume-data";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";
import { ApiUiIcon } from "@/components/ApiUiIcon";
import { ApiAvatar } from "@/components/ApiAvatar";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 to-brand-cream dark:from-slate-950 dark:to-slate-900">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px at 20% 50%, transparent 0), radial-gradient(circle at 80% 50%, transparent 0)' }} />
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-brand-green/30 bg-white px-4 py-2 text-sm font-bold text-brand-green shadow-lg dark:border-brand-yellow/30 dark:bg-slate-900 dark:text-brand-yellow">
              Hello There!
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-slate-100">
              I&apos;m{" "}
              <span className="bg-gradient-to-r from-brand-green to-brand-greenDark bg-clip-text text-transparent dark:from-brand-yellow dark:to-brand-yellow/70">
                {person.name}
              </span>
              <br className="hidden lg:inline-block" />
              ,{" "}
              <span className="text-slate-600 dark:text-slate-400 text-2xl lg:text-4xl font-normal">
                {person.role}
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {professionalSummary}
            </p>
             
            <div className="flex flex-wrap gap-4 pt-2">
              <ButtonLink href="/projects" variant="primary" size="lg" className="shadow-xl">
                View My Portfolio
              </ButtonLink>
              <ResumeDownloadButton variant="hero" label="Download Resume" />
              <ButtonLink href="/contact" variant="secondary" size="lg" className="shadow-lg">
                Hire Me
              </ButtonLink>
            </div>
             
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900/80 shadow-lg border border-slate-200 dark:border-slate-800">
                <ApiUiIcon name="Phone" size={20} color="brand-green" darkColor="brand-yellow" className="h-5 w-5 flex-shrink-0" />
                <span className="text-base font-semibold text-slate-900 dark:text-slate-100">{person.phone}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900/80 shadow-lg border border-slate-200 dark:border-slate-800">
                <ApiUiIcon name="Mail" size={20} color="brand-green" darkColor="brand-yellow" className="h-5 w-5 flex-shrink-0" />
                <span className="text-base font-semibold text-slate-900 dark:text-slate-100">{person.email}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900/80 shadow-lg border border-slate-200 dark:border-slate-800">
                <ApiUiIcon name="Linkedin" size={20} color="brand-green" darkColor="brand-yellow" className="h-5 w-5 flex-shrink-0" />
                <a 
                  href={person.linkedinUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-slate-900 dark:text-slate-100 hover:text-brand-green dark:hover:text-brand-yellow transition-colors"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative mx-auto flex min-h-[450px] w-full max-w-md items-center justify-center">
              <div className="absolute -right-10 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-brand-yellow/40 to-brand-yellow/20 blur-3xl" />
              <div className="absolute -left-10 bottom-10 h-64 w-64 rounded-full bg-gradient-to-tl from-brand-green/20 to-brand-green/10 blur-2xl" />
              
              <div className="relative w-full rounded-[2rem] bg-white p-8 shadow-2xl dark:bg-slate-900/60 dark:ring-1 dark:ring-white/10">
                <div className="relative">
                  <div className="mx-auto flex h-72 w-72 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 ring-4 ring-white dark:ring-slate-600">
                    <ApiAvatar name={person.name} size={288} className="h-72 w-72" alt={person.name} />
                  </div>
                  
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-green to-brand-greenDark px-4 py-2 text-xs font-bold text-white shadow-lg dark:from-brand-yellow dark:to-brand-yellow/70">
                    {person.role.split(" ")[0]}
                  </div>
                  
                  <div className="absolute -right-2 bottom-8 rounded-full bg-brand-yellow px-4 py-2 text-xs font-bold text-brand-green shadow-lg dark:bg-brand-yellow/20 dark:text-brand-yellow">
                    Full Stack
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}