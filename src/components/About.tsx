import {
  person,
  professionalSummary,
  keyAchievements,
  languages,
  certifications,
  publications,
  openSourceContributions,
  softSkills,
  interests,
  experience,
  industryExpertise,
  education,
} from '@/lib/resume-data';
import {
  Award,
  Trophy,
  Target,
  Users,
  Code,
  Globe,
  MapPin,
  Calendar,
  GraduationCap,
  ExternalLink,
  Star,
  BookOpen,
  GitBranch,
  Heart,
} from 'lucide-react';
import { ResumeDownloadButton } from '@/components/ResumeDownloadButton';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ButtonLink } from '@/components/Button';

const statistics = [
  { icon: Code, value: '30+', label: 'Production Systems' },
  { icon: Users, value: '25+', label: 'Industries Covered' },
  { icon: Target, value: '4+', label: 'Years Experience' },
  { icon: Award, value: '99.9%', label: 'Server Uptime' },
  { icon: Star, value: '15+', label: 'Key Achievements' },
  { icon: GitBranch, value: '31+', label: 'Git Repositories' },
];

export function About() {
  return (
    <section
      className="bg-white dark:bg-slate-950 section-padding"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto flex h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-green to-brand-greenDark dark:from-brand-yellow dark:to-brand-yellow/70 p-[3px]">
                <div className="h-full w-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                  <span className="text-5xl sm:text-6xl font-extrabold text-brand-green dark:text-brand-yellow">
                    {person.name
                      .split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
              </div>

              {[
                {
                  label: 'Full Stack',
                  className: 'absolute -bottom-2 left-1/2 -translate-x-1/2',
                },
                { label: 'Cloud', className: 'absolute right-0 top-1/4' },
                {
                  label: 'APIs',
                  className: 'absolute left-0 top-1/2 -translate-y-1/2',
                },
                { label: 'DevOps', className: 'absolute right-4 bottom-8' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className={`${badge.className} rounded-full bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-brand-green dark:text-brand-yellow shadow-elevated border border-slate-100 dark:border-white/10`}
                >
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <p className="text-sm font-semibold text-brand-green dark:text-brand-yellow">
              About Me
            </p>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white"
            >
              Who is{' '}
              <span className="text-brand-green dark:text-brand-yellow">
                {person.name.split(' ')[0]}
              </span>
              ?
            </h2>
            <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {professionalSummary}
            </p>

            <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 lg:grid-cols-6 pt-2">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center p-2">
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-green dark:text-brand-yellow">
                    <AnimatedCounter
                      to={Number.parseFloat(stat.value)}
                      decimals={
                        stat.value.includes('.')
                          ? stat.value.split('.')[1]?.replace(/\D/g, '')
                              .length || 0
                          : 0
                      }
                      suffix={stat.value.replace(/[0-9.]/g, '')}
                    />
                  </div>
                  <div className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ResumeDownloadButton variant="about" label="Download CV" />
              <ButtonLink href="/contact" variant="accent" size="sm">
                Get in Touch
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-20 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MapPin, title: 'Location', content: person.location },
            { icon: Calendar, title: 'Timezone', content: person.timezone },
            {
              icon: Globe,
              title: 'Languages',
              content: languages
                .map((l) => `${l.name} (${l.proficiency})`)
                .join(', '),
            },
            {
              icon: Code,
              title: 'Industries',
              content: industryExpertise.join(' \u2022 '),
            },
          ].map((item) => (
            <div key={item.title} className="card-premium p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/8 dark:bg-brand-yellow/8">
                  <item.icon className="h-5 w-5 text-brand-green dark:text-brand-yellow" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        {/* Work Experience */}
        <div className="mb-20">
          <h3 className="mb-8 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Work Experience
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            {experience.map((exp, index) => (
              <div key={index} className="card-premium p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {exp.title}
                    </h4>
                    <p className="text-brand-green dark:text-brand-yellow text-sm font-medium">
                      {exp.company}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 flex items-center gap-1">
                      <MapPin className="inline h-3 w-3" />
                      {exp.location}
                    </p>
                  </div>
                  <span className="rounded-full bg-brand-green/8 dark:bg-brand-yellow/8 px-3 py-1 text-xs font-semibold text-brand-green dark:text-brand-yellow flex-shrink-0">
                    {exp.start} - {exp.end}
                  </span>
                </div>
                <ul className="space-y-2 mb-4">
                  {exp.highlights.slice(0, 3).map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-green dark:bg-brand-yellow flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                {exp.achievements && (
                  <div className="rounded-xl bg-slate-50 dark:bg-white/3 p-4">
                    <p className="text-xs font-bold text-brand-green dark:text-brand-yellow mb-2">
                      Key Results
                    </p>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                        >
                          <Trophy className="h-3 w-3 text-brand-green dark:text-brand-yellow flex-shrink-0 mt-0.5" />
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
        <div className="mb-20">
          <h3 className="mb-8 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Education
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            {education.map((edu, index) => (
              <div key={index} className="card-premium p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/8 dark:bg-brand-yellow/8">
                    <GraduationCap className="h-5 w-5 text-brand-green dark:text-brand-yellow" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-brand-green dark:text-brand-yellow text-sm font-medium">
                      {edu.school}
                    </p>
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs mb-3 flex items-center gap-1">
                  <MapPin className="inline h-3 w-3" />
                  {edu.location} \u2022 {edu.period}
                </p>
                {edu.coursework && (
                  <div className="mb-3">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
                      Coursework
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-slate-100 dark:bg-white/6 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {edu.achievements && (
                  <div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
                      Achievements
                    </p>
                    <ul className="space-y-1.5">
                      {edu.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                        >
                          <Award className="h-3 w-3 text-brand-green dark:text-brand-yellow flex-shrink-0 mt-0.5" />
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
        <div className="mb-20">
          <h3 className="mb-8 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Certifications
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-start gap-4 card-premium p-5"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-green/8 dark:bg-brand-yellow/8">
                  <Award className="h-6 w-6 text-brand-green dark:text-brand-yellow" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {cert.name}
                  </h4>
                  <p className="text-brand-green dark:text-brand-yellow text-sm font-medium">
                    {cert.issuer}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                    {cert.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publications */}
        <div className="mb-20">
          <h3 className="mb-8 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Publications
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="flex items-start gap-4 card-premium p-5"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-green/8 dark:bg-brand-yellow/8">
                  <BookOpen className="h-6 w-6 text-brand-green dark:text-brand-yellow" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {pub.title}
                  </h4>
                  <p className="text-brand-green dark:text-brand-yellow text-sm font-medium">
                    {pub.publisher}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                    {pub.summary}
                  </p>
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-green dark:text-brand-yellow hover:underline transition-colors"
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
        <div className="mb-20">
          <h3 className="mb-8 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Open Source Contributions
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {openSourceContributions.map((repo, index) => (
              <div
                key={index}
                className="flex items-start gap-4 card-premium p-5"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-green/8 dark:bg-brand-yellow/8">
                  <GitBranch className="h-6 w-6 text-brand-green dark:text-brand-yellow" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {repo.name}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                    {repo.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Star className="h-4 w-4 text-brand-yellow" />
                    <span className="text-sm font-medium text-brand-yellow">
                      {repo.stars} stars
                    </span>
                  </div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-green dark:text-brand-yellow hover:underline transition-colors"
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
        <div className="mb-20 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
          <div className="card-premium p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/8 dark:bg-brand-yellow/8">
                <Target className="h-5 w-5 text-brand-green dark:text-brand-yellow" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Soft Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-slate-100 dark:bg-white/6 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 transition-all hover:bg-brand-green/8 hover:text-brand-green dark:hover:bg-brand-yellow/8 dark:hover:text-brand-yellow"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="card-premium p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/8 dark:bg-brand-yellow/8">
                <Heart className="h-5 w-5 text-brand-green dark:text-brand-yellow" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Interests
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="rounded-full bg-brand-yellow/8 px-3 py-1.5 text-sm font-medium text-brand-yellow transition-all hover:bg-brand-yellow/15"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="card-premium p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/8 dark:bg-brand-yellow/8">
              <Trophy className="h-5 w-5 text-brand-green dark:text-brand-yellow" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Key Achievements
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {keyAchievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-green dark:bg-brand-yellow flex-shrink-0" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {achievement}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
