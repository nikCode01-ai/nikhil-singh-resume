import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { Blogs } from "@/components/Blogs";
import { FAQ } from "@/components/FAQ";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      {/* Hero Section */}
      <section id="home" className="scroll-mt-24">
        <Hero />
      </section>

      {/* Skills Categories Bar */}
      <section className="bg-brand-yellow py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm font-medium text-brand-green">
            <span>App Design</span>
            <span className="text-brand-green/70">*</span>
            <span>Website Design</span>
            <span className="text-brand-green/70">*</span>
            <span>Dashboard</span>
            <span className="text-brand-green/70">*</span>
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
    </div>
  );
}
