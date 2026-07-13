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

      <section
        className="bg-gradient-to-r from-brand-green to-brand-greenDark py-4"
        aria-label="Services offered"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-1 text-sm font-medium text-white/90">
            <span className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand-yellow"
                aria-hidden="true"
              />
              App Design
            </span>
            <span className="hidden sm:block text-white/30" aria-hidden="true">
              |
            </span>
            <span className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand-yellow"
                aria-hidden="true"
              />
              Website Design
            </span>
            <span className="hidden sm:block text-white/30" aria-hidden="true">
              |
            </span>
            <span className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand-yellow"
                aria-hidden="true"
              />
              Dashboard
            </span>
            <span className="hidden sm:block text-white/30" aria-hidden="true">
              |
            </span>
            <span className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand-yellow"
                aria-hidden="true"
              />
              Wireframe
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
