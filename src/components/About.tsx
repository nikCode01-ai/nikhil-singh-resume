'use client';

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
  ChevronRight,
} from 'lucide-react';
import { ResumeDownloadButton } from '@/components/ResumeDownloadButton';
import { LiveRepoStats } from '@/components/LiveRepoStats';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ButtonLink } from '@/components/Button';
import Image from 'next/image';
import { motion } from 'framer-motion';

const statistics = [
  { icon: Code, value: '30+', label: 'Production Systems' },
  { icon: Users, value: '25+', label: 'Industries Covered' },
  { icon: Target, value: '4+', label: 'Years Experience' },
  { icon: Award, value: '99.9%', label: 'Server Uptime' },
  { icon: Star, value: '15+', label: 'Key Achievements' },
  { icon: GitBranch, value: '31+', label: 'Git Repositories' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: { staggerChildren: 0.15 },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export function About() {
  return (
    <section
      className="bg-white dark:bg-slate-950 section-padding overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-24 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ perspective: 1000 }}
              className="relative mx-auto flex h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] items-center justify-center group"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-green to-brand-greenDark dark:from-emerald-400 dark:to-teal-500 p-[4px] transition-transform duration-500 group-hover:scale-105">
                <div className="h-full w-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/nik_profile.jpeg"
                    width={360}
                    height={360}
                    className="h-full w-full rounded-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={person.name}
                  />
                </div>
              </div>

              {[
                {
                  label: 'Full Stack',
                  className:
                    'absolute -bottom-2 left-1/2 -translate-x-1/2 delay-0',
                },
                {
                  label: 'Cloud',
                  className: 'absolute right-0 top-1/4 delay-100',
                },
                {
                  label: 'APIs',
                  className:
                    'absolute left-0 top-1/2 -translate-y-1/2 delay-200',
                },
                {
                  label: 'DevOps',
                  className: 'absolute right-4 bottom-8 delay-300',
                },
              ].map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.4 + i * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  className={`${badge.className} rounded-full bg-white dark:bg-slate-900 px-4 py-2 text-xs font-bold tracking-wide text-brand-green dark:text-brand-greenLight shadow-xl border border-slate-100 dark:border-white/10 z-10 backdrop-blur-md`}
                >
                  {badge.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 dark:bg-emerald-500/10 px-3 py-1">
              <span className="flex h-2 w-2 rounded-full bg-brand-green dark:bg-emerald-400 animate-pulse"></span>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-green dark:text-emerald-400">
                About Me
              </p>
            </div>

            <h2
              id="about-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-slate-900 dark:text-white"
            >
              Who is{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-emerald-600 to-teal-500 dark:from-emerald-400 dark:via-emerald-300 dark:to-teal-300">
                {person.name.split(' ')[0]}
              </span>
              ?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {professionalSummary}
            </p>

            <div className="grid grid-cols-3 gap-6 sm:grid-cols-3 lg:grid-cols-6 pt-6 border-t border-slate-100 dark:border-slate-800/60">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-2xl sm:text-3xl font-black text-brand-green dark:text-brand-greenLight transition-transform duration-300 group-hover:-translate-y-1">
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
                  <div className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <ResumeDownloadButton variant="about" label="Download CV" />
              <ButtonLink
                href="/contact"
                variant="primary"
                size="sm"
                className="group"
              >
                Get in Touch
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </div>
          </motion.div>
        </div>

        {/* Personal Information */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { icon: MapPin, title: 'Location', content: person.location },
            { icon: Calendar, title: 'Timezone', content: person.timezone },
            {
              icon: Globe,
              title: 'Languages',
              content: languages.map((l) => `${l.name}`).join(', '),
            },
            {
              icon: Code,
              title: 'Industries',
              content: industryExpertise.slice(0, 3).join(' \u2022 '),
            },
          ].map((item) => (
            <motion.div
              variants={staggerItem}
              key={item.title}
              whileHover={{ y: -5 }}
              className="card-premium p-6 group cursor-default transition-colors hover:border-brand-green/30 dark:hover:border-emerald-500/30"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 dark:bg-emerald-500/10 transition-colors group-hover:bg-brand-green dark:group-hover:bg-brand-green">
                  <item.icon className="h-5 w-5 text-brand-green dark:text-emerald-400 transition-colors group-hover:text-white dark:group-hover:text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {item.content}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Work Experience */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          className="mb-24"
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="h-8 w-2 rounded-full bg-brand-green dark:bg-emerald-400"></div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Work Experience
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {experience.map((exp, index) => (
              <motion.div
                whileHover={{ scale: 1.01 }}
                key={index}
                className="card-premium p-8 border border-slate-200/60 dark:border-white/10 hover:shadow-xl dark:hover:shadow-emerald-500/5 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                      {exp.title}
                    </h4>
                    <p className="text-brand-green dark:text-brand-greenLight text-base font-semibold mt-1">
                      {exp.company}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {exp.location}
                    </p>
                  </div>
                  <span className="inline-flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {exp.start} - {exp.end}
                  </span>
                </div>
                <ul className="space-y-3 mb-6">
                  {exp.highlights.slice(0, 3).map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-green dark:bg-emerald-400 flex-shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                {exp.achievements && (
                  <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 p-5 border border-slate-200/50 dark:border-white/5">
                    <p className="text-xs font-black uppercase tracking-wider text-brand-green dark:text-emerald-400 mb-3 flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      Key Results
                    </p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
                        >
                          <span className="mt-1 text-brand-green dark:text-emerald-400">
                            ✓
                          </span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education & Certifications */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-2 rounded-full bg-brand-green dark:bg-emerald-400"></div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Education
              </h3>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="card-premium p-6 group hover:border-brand-green/30 dark:hover:border-emerald-500/30 transition-colors"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-green/10 dark:bg-emerald-500/10">
                      <GraduationCap className="h-6 w-6 text-brand-green dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-brand-green dark:text-brand-greenLight text-sm font-semibold mt-0.5">
                        {edu.school}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 font-medium">
                        {edu.location} &bull; {edu.period}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-2 rounded-full bg-brand-green dark:bg-emerald-400"></div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Certifications
              </h3>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 card-premium p-4 group hover:border-brand-green/30 dark:hover:border-emerald-500/30 transition-colors"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 group-hover:bg-brand-green/10 dark:group-hover:bg-emerald-500/10 transition-colors">
                    <Award className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-brand-green dark:group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base truncate">
                      {cert.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-brand-green dark:text-emerald-400 text-xs font-semibold">
                        {cert.issuer}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                        {cert.year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Open Source Contributions */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          className="mb-24"
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="h-8 w-2 rounded-full bg-brand-green dark:bg-emerald-400"></div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Open Source
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {openSourceContributions.map((repo, index) => (
              <motion.div
                whileHover={{ y: -5 }}
                key={index}
                className="flex flex-col gap-4 card-premium p-6 group hover:shadow-xl dark:hover:shadow-emerald-500/5 hover:border-brand-green/30 dark:hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 dark:bg-emerald-500/10">
                    <GitBranch className="h-6 w-6 text-brand-green dark:text-emerald-400" />
                  </div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5 text-slate-400 hover:text-brand-green dark:hover:text-emerald-400 transition-colors" />
                  </a>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                    {repo.name}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium line-clamp-2">
                    {repo.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60">
                  <LiveRepoStats url={repo.url} fallbackStars={repo.stars} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills & Interests */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          <div className="card-premium p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 dark:bg-emerald-500/10">
                <Target className="h-6 w-6 text-brand-green dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Soft Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-xl bg-slate-100 dark:bg-slate-800/80 px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 transition-colors hover:bg-brand-green hover:text-white dark:hover:bg-brand-green dark:hover:text-white cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="card-premium p-8 border border-transparent dark:border-white/5 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 dark:bg-emerald-500/10">
                <Heart className="h-6 w-6 text-brand-green dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Interests
              </h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="rounded-xl border border-brand-green/20 dark:border-emerald-500/20 bg-brand-green/5 dark:bg-emerald-500/5 px-4 py-2 text-sm font-bold text-brand-green dark:text-emerald-300 transition-all hover:bg-brand-green hover:text-white dark:hover:bg-brand-green dark:hover:text-white cursor-default"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key Achievements & Publications */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Key Achievements */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-2 rounded-full bg-brand-green dark:bg-emerald-400"></div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Key Achievements
              </h3>
            </div>
            <div className="card-premium p-8 h-[calc(100%-4rem)] bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 dark:bg-emerald-500/10">
                  <Trophy className="h-6 w-6 text-brand-green dark:text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  Milestones
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {keyAchievements.map((achievement, index) => (
                  <motion.div
                    whileHover={{ x: 5 }}
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand-green dark:bg-emerald-400 flex-shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Publications */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-2 rounded-full bg-brand-green dark:bg-emerald-400"></div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Publications
              </h3>
            </div>
            <div className="space-y-4">
              {publications.map((pub, index) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  key={index}
                  className="flex flex-col gap-3 card-premium p-6 group hover:shadow-xl dark:hover:shadow-emerald-500/5 hover:border-brand-green/30 dark:hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-green/10 dark:bg-emerald-500/10">
                      <BookOpen className="h-5 w-5 text-brand-green dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg line-clamp-2">
                        {pub.title}
                      </h4>
                      <p className="text-brand-green dark:text-brand-greenLight text-sm font-semibold mt-1">
                        {pub.publisher}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium line-clamp-2 pl-16">
                    {pub.summary}
                  </p>
                  <div className="pl-16">
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-brand-green dark:hover:text-emerald-400 transition-colors group/link"
                    >
                      Read Article
                      <ExternalLink className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
