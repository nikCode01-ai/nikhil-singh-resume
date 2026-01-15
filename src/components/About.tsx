import { person, professionalSummary, keyAchievements } from "@/lib/resume-data";
import { Award, Target, Users, Code } from "lucide-react";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";

const statistics = [
  {
    icon: Code,
    value: "30+",
    label: "Production Systems Delivered"
  },
  {
    icon: Users,
    value: "25+",
    label: "Industries Covered"
  },
  {
    icon: Target,
    value: "4+",
    label: "Years of Experience"
  },
  {
    icon: Award,
    value: "99.9%",
    label: "Server Uptime"
  }
];

const skills = [
  "UI/UX Design",
  "Mobile App Design", 
  "Website Design",
  "Design System",
  "Prototype",
  "Dashboard",
  "Wireframe Design",
  "Full Stack Development"
];

export function About() {
  return (
    <section className="bg-brand-green py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Content - About Text */}
          <div className="relative">
            <div className="relative mx-auto flex h-[420px] w-[420px] max-w-full items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-brand-yellow" />
              <div className="relative flex h-[360px] w-[360px] items-center justify-center rounded-full bg-white/10 backdrop-blur">
                <span className="text-6xl font-extrabold text-white">
                  {person.name
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>

              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-brand-greenDark px-4 py-2 text-xs font-semibold text-white shadow">
                Full Stack
              </div>
              <div className="absolute left-6 top-12 rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-green shadow">
                Web Apps
              </div>
              <div className="absolute right-6 top-24 rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-green shadow">
                Cloud
              </div>
            </div>
          </div>

          {/* Right Content - Statistics & Skills */}
          <div className="space-y-6">
            <p className="text-sm font-semibold text-brand-yellow">About Me</p>
            <h2 className="text-4xl font-extrabold leading-tight">
              Who is <span className="text-brand-yellow">{person.name.split(" ")[0]}</span>?
            </h2>
            <p className="text-white/85 leading-relaxed">
              {professionalSummary}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-2 sm:grid-cols-4">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-extrabold text-brand-yellow">{stat.value}</div>
                  <div className="mt-1 text-xs font-semibold text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Download CV Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <ResumeDownloadButton variant="about" label="Download CV" />
            </div>

            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white">Highlights</p>
              <ul className="mt-3 space-y-2 text-sm text-white/85">
                {keyAchievements.slice(0, 3).map((achievement) => (
                  <li key={achievement} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand-yellow" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
