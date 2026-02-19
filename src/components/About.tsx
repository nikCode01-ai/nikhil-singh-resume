import { person, professionalSummary, keyAchievements, languages, certifications, publications, openSourceContributions, softSkills, interests, experience, industryExpertise, education } from "@/lib/resume-data";
import { Award, Target, Users, Code, Globe, MapPin, Calendar, GraduationCap, ExternalLink, Star, BookOpen, GitBranch, Heart, Award as Trophy } from "lucide-react";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ButtonLink } from "@/components/Button";

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
  },
  {
    icon: Star,
    value: "15+",
    label: "Key Achievements"
  },
  {
    icon: GitBranch,
    value: "31+",
    label: "GitLab Repositories"
  }
];

const orbitBadges = [
  {
    label: "Full Stack",
    className:
      "absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-brand-greenDark px-4 py-2 text-xs font-semibold text-white shadow",
  },
  {
    label: "Web Apps",
    className:
      "absolute left-6 top-12 rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-green shadow",
  },
  {
    label: "Cloud",
    className:
      "absolute right-6 top-24 rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-green shadow",
  },
  {
    label: "APIs",
    className:
      "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-green shadow",
  },
  {
    label: "Databases",
    className:
      "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-green shadow",
  },
  {
    label: "DevOps",
    className:
      "absolute left-16 bottom-20 rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-green shadow",
  },
  {
    label: "CI/CD",
    className:
      "absolute right-16 bottom-24 rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-green shadow",
  },
  {
    label: "Microservices",
    className:
      "absolute left-1/2 top-8 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-green shadow",
  },
];

export function About() {
  return (
    <section className="bg-brand-green py-20 text-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
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

              {orbitBadges.map((badge) => (
                <div key={badge.label} className={badge.className}>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm font-semibold text-brand-yellow">About Me</p>
            <h2 className="text-4xl font-extrabold leading-tight">
              Who is <span className="text-brand-yellow">{person.name.split(" ")[0]}</span>?
            </h2>
            <p className="text-white/85 leading-relaxed">
              {professionalSummary}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-2 sm:grid-cols-3 lg:grid-cols-6">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-extrabold text-brand-yellow">
                    <AnimatedCounter
                      to={Number.parseFloat(stat.value)}
                      decimals={stat.value.includes(".") ? (stat.value.split(".")[1]?.replace(/\D/g, "").length || 0) : 0}
                      suffix={stat.value.replace(/[0-9.]/g, "")}
                    />
                  </div>
                  <div className="mt-1 text-xs font-semibold text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <ResumeDownloadButton variant="about" label="Download CV" />
              <ButtonLink href="/contact" variant="accent" size="sm">Get in Touch</ButtonLink>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-5 w-5 text-brand-yellow" />
              <h3 className="text-sm font-semibold">Location</h3>
            </div>
            <p className="text-sm text-white/90">{person.location}</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-5 w-5 text-brand-yellow" />
              <h3 className="text-sm font-semibold">Timezone</h3>
            </div>
            <p className="text-sm text-white/90">{person.timezone}</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-5 w-5 text-brand-yellow" />
              <h3 className="text-sm font-semibold">Languages</h3>
            </div>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between text-sm">
                  <span className="text-white/90">{lang.name}</span>
                  <span className="text-brand-yellow/80">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-5 w-5 text-brand-yellow" />
              <h3 className="text-sm font-semibold">Industries</h3>
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              {industryExpertise.join(" • ")}
            </p>
          </div>
        </div>

        {/* Work Experience */}
        <div className="mb-16">
          <h3 className="mb-8 text-3xl font-bold text-brand-yellow">Work Experience</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {experience.map((exp, index) => (
              <div key={index} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-white">{exp.title}</h4>
                    <p className="text-brand-yellow text-sm font-medium">{exp.company}</p>
                    <p className="text-white/70 text-xs mt-1">
                      <MapPin className="inline h-3 w-3 mr-1" />
                      {exp.location}
                    </p>
                  </div>
                  <span className="rounded-full bg-brand-yellow/20 px-3 py-1 text-xs font-medium text-brand-yellow">
                    {exp.start} - {exp.end}
                  </span>
                </div>
                <ul className="space-y-2 mb-4">
                  {exp.highlights.slice(0, 3).map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/85">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-yellow flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                {exp.achievements && (
                  <div className="rounded-lg bg-white/5 p-3">
                    <p className="text-xs font-semibold text-brand-yellow mb-2">Key Results</p>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-white/75">
                          <Trophy className="h-3 w-3 text-brand-yellow flex-shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="mb-8 text-3xl font-bold text-brand-yellow">Education</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {education.map((edu, index) => (
              <div key={index} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <GraduationCap className="h-5 w-5 text-brand-yellow" />
                  <div>
                    <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                    <p className="text-brand-yellow text-sm font-medium">{edu.school}</p>
                  </div>
                </div>
                <p className="text-white/70 text-xs mb-3">
                  <MapPin className="inline h-3 w-3 mr-1" />
                  {edu.location} • {edu.period}
                </p>
                {edu.coursework && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-white/80 mb-2">Coursework</p>
                    <div className="flex flex-wrap gap-1">
                      {edu.coursework.map((course, i) => (
                        <span key={i} className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/70">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {edu.achievements && (
                  <div>
                    <p className="text-xs font-semibold text-white/80 mb-2">Achievements</p>
                    <ul className="space-y-1">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-white/75">
                          <Award className="h-3 w-3 text-brand-yellow flex-shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="mb-8 text-3xl font-bold text-brand-yellow">Certifications</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-start gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition-all hover:bg-white/10">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-yellow/20 text-brand-yellow">
                  <Award className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white">{cert.name}</h4>
                  <p className="text-brand-yellow text-sm">{cert.issuer}</p>
                  <p className="text-white/60 text-xs mt-1">{cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publications */}
        <div className="mb-16">
          <h3 className="mb-8 text-3xl font-bold text-brand-yellow">Publications</h3>
          <div className="grid grid-cols-1 gap-4">
            {publications.map((pub, index) => (
              <div key={index} className="flex items-start gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition-all hover:bg-white/10">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-yellow/20 text-brand-yellow">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white">{pub.title}</h4>
                  <p className="text-brand-yellow text-sm">{pub.publisher}</p>
                  <p className="text-white/60 text-sm mt-2">{pub.summary}</p>
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-yellow hover:text-brand-yellow/80 transition-colors"
                  >
                    Read Article
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Source Contributions */}
        <div className="mb-16">
          <h3 className="mb-8 text-3xl font-bold text-brand-yellow">Open Source Contributions</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {openSourceContributions.map((repo, index) => (
              <div key={index} className="flex items-start gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition-all hover:bg-white/10">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-yellow/20 text-brand-yellow">
                  <GitBranch className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white">{repo.name}</h4>
                  <p className="text-white/70 text-sm mt-1">{repo.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Star className="h-4 w-4 text-brand-yellow" />
                    <span className="text-sm text-brand-yellow">{repo.stars} stars</span>
                  </div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-yellow hover:text-brand-yellow/80 transition-colors"
                  >
                    View Repository
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Interests */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-5 w-5 text-brand-yellow" />
              <h3 className="text-lg font-bold">Soft Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white/90 transition-all hover:bg-white/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-5 w-5 text-brand-yellow" />
              <h3 className="text-lg font-bold">Interests</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="rounded-full bg-brand-yellow/10 px-3 py-1.5 text-sm font-medium text-brand-yellow/90 transition-all hover:bg-brand-yellow/20"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="h-5 w-5 text-brand-yellow" />
            <h3 className="text-lg font-bold">Key Achievements</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {keyAchievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-yellow flex-shrink-0" />
                <span className="text-sm text-white/85">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
