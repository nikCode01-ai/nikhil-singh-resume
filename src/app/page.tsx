import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { LazySkills } from '@/components/LazySkills';
import { LazyProjects } from '@/components/LazyProjects';
import { Testimonials } from '@/components/Testimonials';
import { Blogs } from '@/components/Blogs';
import { FAQ } from '@/components/FAQ';
import { ContactSection } from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Senior Full Stack Developer - Nikhil Singh',
  description:
    'Nikhil Singh - Senior Full Stack Developer specializing in Next.js, React, Node.js, NDC API Integration for airlines, GenAI/LLM solutions, and real-time systems. 4+ years experience, 30+ production systems, 99.9% uptime. Available for freelance projects worldwide.',
  keywords: [
    'Senior Full Stack Developer',
    'Next.js Developer',
    'React Developer',
    'Node.js Developer',
    'NDC API Integration',
    'Airline Booking System',
    'GenAI LLM Developer',
    'Full Stack Developer India',
    'Freelance Web Developer',
    'Real-time Systems Developer',
  ],
  alternates: {
    canonical:
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://nikhilsingh-eight.vercel.app',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <section id="home" className="scroll-mt-24">
        <Hero />
      </section>

      {/* Modern Feature Highlights Marquee / Strip */}
      <section
        className="relative border-y border-emerald-500/10 bg-slate-900/90 py-3.5 backdrop-blur-md"
        aria-label="Core Specializations"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-xs sm:text-sm font-semibold text-slate-200">
            <span className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                aria-hidden="true"
              />
              Airline NDC Integrations
            </span>
            <span className="hidden sm:block text-slate-700" aria-hidden="true">
              &bull;
            </span>
            <span className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                aria-hidden="true"
              />
              Full-Stack Next.js Platforms
            </span>
            <span className="hidden sm:block text-slate-700" aria-hidden="true">
              &bull;
            </span>
            <span className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                aria-hidden="true"
              />
              Real-Time WebSockets / SSE
            </span>
            <span className="hidden sm:block text-slate-700" aria-hidden="true">
              &bull;
            </span>
            <span className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                aria-hidden="true"
              />
              GenAI & Intelligent Systems
            </span>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24">
        <Services />
      </section>

      <section id="about" className="scroll-mt-24">
        <About />
      </section>

      <section id="skills" className="scroll-mt-24">
        <LazySkills />
      </section>

      <section id="projects" className="scroll-mt-24">
        <LazyProjects />
      </section>

      <section id="testimonials" className="scroll-mt-24">
        <Testimonials />
      </section>

      <section id="blogs" className="scroll-mt-24">
        <Blogs limit={3} />
      </section>

      <section id="faqs" className="scroll-mt-24">
        <FAQ />
      </section>

      <section id="contact" className="scroll-mt-24">
        <ContactSection />
      </section>
    </div>
  );
}
