 import { ButtonLink } from "@/components/Button";

import { person, professionalSummary } from "@/lib/resume-data";
import { MapPin, Phone, Mail, Linkedin, ArrowRight } from "lucide-react";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-brand-cream pt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-brand-green/25 bg-white px-4 py-2 text-sm font-semibold text-brand-green shadow-sm">
              Hello There!
            </div>
            
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
              I’m{" "}
              <span className="text-brand-yellow">{person.name}</span>,
              <br />
              {person.role}
              <br />
              <span className="text-slate-900">{person.location}.</span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              {professionalSummary}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href="/projects" variant="primary" size="md">
                View My Portfolio
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ResumeDownloadButton variant="hero" label="Download Resume" />
              <ButtonLink href="/contact" variant="secondary" size="md">
                Hire Me
              </ButtonLink>
            </div>
            
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-slate-700">
                <MapPin className="w-5 h-5 text-brand-green" />
                <span>{person.location}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Phone className="w-5 h-5 text-brand-green" />
                <span>{person.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Mail className="w-5 h-5 text-brand-green" />
                <span>{person.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Linkedin className="w-5 h-5 text-brand-green" />
                <a href={person.linkedinUrl} className="hover:text-brand-greenDark transition-colors">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Content - Profile Image */}
          <div className="relative">
            <div className="relative mx-auto flex min-h-[420px] w-full max-w-md items-center justify-center">
              <div className="absolute -right-10 top-10 h-72 w-72 rounded-full bg-brand-yellow"></div>
              <div className="relative w-full rounded-[2rem] bg-white p-8 shadow-2xl">
                <div className="relative">
                  <div className="mx-auto flex h-72 w-72 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                    <span className="text-6xl font-extrabold text-brand-green">
                      {person.name
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>

                  <div className="absolute -bottom-4 left-4 rounded-full bg-brand-green px-4 py-2 text-xs font-semibold text-white shadow">
                    {person.role.split(" ")[0]}
                  </div>
                  <div className="absolute -right-2 bottom-8 rounded-full bg-brand-yellow px-4 py-2 text-xs font-semibold text-brand-green shadow">
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
