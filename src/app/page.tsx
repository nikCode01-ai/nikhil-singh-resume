import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { Blogs } from "@/components/Blogs";
import { FAQ } from "@/components/FAQ";
import { ContactSection } from "@/components/ContactSection";
import { person } from "@/lib/resume-data";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto w-full max-w-6xl px-4 pt-4">
          <div className="rounded-full bg-brand-green px-4 py-3 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow text-brand-green font-bold">
                  {person.name
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="text-base font-semibold tracking-tight text-white">
                  {person.name.split(" ")[0]}.
                </div>
              </div>

              <nav className="hidden items-center gap-6 text-sm font-medium text-white/90 md:flex">
                <Link href="/" className="transition-colors hover:text-brand-yellow">Home</Link>
                <Link href="/services" className="transition-colors hover:text-brand-yellow">Services</Link>
                <Link href="/about" className="transition-colors hover:text-brand-yellow">About</Link>
                <Link href="/skills" className="transition-colors hover:text-brand-yellow">Tools</Link>
                <Link href="/projects" className="transition-colors hover:text-brand-yellow">Projects</Link>
                <Link href="/blogs" className="transition-colors hover:text-brand-yellow">Blogs</Link>
                <Link href="/testimonials" className="transition-colors hover:text-brand-yellow">Testimonials</Link>
                <Link href="/faqs" className="transition-colors hover:text-brand-yellow">FAQs</Link>
              </nav>

              <Link
                href="/contact"
                className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-green shadow-sm transition-colors hover:bg-brand-cream md:inline-flex"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="scroll-mt-24">
        <Hero />
      </section>

      {/* Skills Categories Bar */}
      <section className="bg-brand-yellow py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm font-medium">
            <span>App Design</span>
            <span className="text-gray-600">*</span>
            <span>Website Design</span>
            <span className="text-gray-600">*</span>
            <span>Dashboard</span>
            <span className="text-gray-600">*</span>
            <span>Wireframe</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="scroll-mt-24">
        <Services />
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-24">
        <About />
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-24">
        <Skills />
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-24">
        <Projects />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="scroll-mt-24">
        <Testimonials />
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="scroll-mt-24">
        <Blogs />
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="scroll-mt-24">
        <FAQ />
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24">
        <ContactSection />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
