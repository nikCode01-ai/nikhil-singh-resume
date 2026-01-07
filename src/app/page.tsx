import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
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
        <div className="container mx-auto px-4 py-20">
          <div className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-slate-900/5">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Services</h2>
                <p className="mt-3 text-base text-slate-600">
                  End-to-end engineering support: product delivery, APIs, real-time systems, and cloud infrastructure.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-greenDark"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-24">
        <div className="container mx-auto px-4 py-20">
          <div className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-slate-900/5">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">About</h2>
                <p className="mt-3 text-base text-slate-600">
                  Background, achievements, and how I approach building reliable systems.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-greenDark"
              >
                Read About Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-24">
        <div className="container mx-auto px-4 py-20">
          <div className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-slate-900/5">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Skills</h2>
                <p className="mt-3 text-base text-slate-600">
                  Tools, frameworks, and systems I use across frontend, backend, and infrastructure.
                </p>
              </div>
              <Link
                href="/skills"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-greenDark"
              >
                View Skills
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-24">
        <div className="container mx-auto px-4 py-20">
          <div className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-slate-900/5">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Projects</h2>
                <p className="mt-3 text-base text-slate-600">
                  Portfolio of production work across aviation, travel, real-time booking, and platforms.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-greenDark"
              >
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="scroll-mt-24">
        <div className="container mx-auto px-4 py-20">
          <div className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-slate-900/5">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Testimonials</h2>
                <p className="mt-3 text-base text-slate-600">
                  Feedback and outcomes from clients and teams.
                </p>
              </div>
              <Link
                href="/testimonials"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-greenDark"
              >
                View Testimonials
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="scroll-mt-24">
        <div className="container mx-auto px-4 py-20">
          <div className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-slate-900/5">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Blogs</h2>
                <p className="mt-3 text-base text-slate-600">
                  Highlights and learnings from recent builds.
                </p>
              </div>
              <Link
                href="/blogs"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-greenDark"
              >
                View Blogs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="scroll-mt-24">
        <div className="container mx-auto px-4 py-20">
          <div className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-slate-900/5">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">FAQs</h2>
                <p className="mt-3 text-base text-slate-600">
                  Common questions about engagement, timelines, and process.
                </p>
              </div>
              <Link
                href="/faqs"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-greenDark"
              >
                Read FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24">
        <div className="container mx-auto px-4 py-20">
          <div className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-slate-900/5">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Contact</h2>
                <p className="mt-3 text-base text-slate-600">
                  Share your goals and constraints. I’ll recommend a practical plan and execute it with production-ready quality.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-greenDark"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
