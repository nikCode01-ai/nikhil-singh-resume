import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';

import { Card } from '@/components/Card';
import {
  getProjectBySlug,
  getRelatedProjects,
  projectSlugs,
} from '@/lib/project-slugs';
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Users,
  Clock,
  Award,
  Target,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Star,
  GitBranch,
  Zap,
  Code2,
  Rocket,
  Layers,
} from 'lucide-react';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projectSlugs.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const keywords = [
    project.category.replace('-', ' '),
    ...project.tech.slice(0, 5),
    'Full Stack Developer',
    'Nikhil Singh Portfolio',
  ];

  return {
    title: `${project.name} | ${project.category.replace('-', ' ')} - Nikhil Singh Portfolio`,
    description: project.description,
    keywords,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app'}/projects/${slug}`,
    },
    openGraph: {
      title: project.name,
      description: project.description,
      type: 'website' as const,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: project.name,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project);

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    author: {
      '@type': 'Person',
      name: 'Nikhil Singh',
    },
    datePublished: project.date || undefined,
    techStack: project.tech,
    image: project.image,
    url: project.url || undefined,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-brand-cream dark:from-slate-950 dark:to-slate-900">
      <Script
        id={`project-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      {/* Hero Section - Full Width Image */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-brand-cream dark:from-slate-950/90 dark:via-slate-950/70 dark:to-slate-900" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-2 rounded-full bg-brand-green/20 text-brand-green dark:bg-brand-yellow/20 dark:text-brand-yellow text-sm font-semibold backdrop-blur-sm border border-brand-green/30 dark:border-brand-yellow/30">
              {project.category.replace('-', ' ')}
            </span>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border ${
                project.status === 'completed'
                  ? 'bg-green-500/20 text-green-300 border-green-500/30'
                  : project.status === 'in-progress'
                    ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                    : 'bg-slate-500/20 text-slate-300 border-slate-500/30'
              }`}
            >
              {project.status.replace('-', ' ')}
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {project.name}
          </h1>

          <p className="text-xl text-slate-200 mb-8 leading-relaxed max-w-4xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4">
            {project.url && (
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
              >
                <ExternalLink className="h-5 w-5 mr-2 inline" />
                View Live Project
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-brand-green text-white rounded-lg font-semibold hover:bg-brand-greenDark transition-colors"
              >
                <GitBranch className="h-5 w-5 mr-2 inline" />
                View Source Code
              </Link>
            )}
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-brand-yellow text-brand-green rounded-lg font-semibold hover:bg-brand-yellow/80 transition-colors"
              >
                <Zap className="h-5 w-5 mr-2 inline" />
                View Demo
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green dark:text-brand-yellow hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>

        {/* Quick Stats Bar */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 text-center bg-gradient-to-br from-brand-green/10 to-brand-green/5 dark:from-brand-green/20 dark:to-brand-green/10 border border-brand-green/20 rounded-2xl shadow-lg">
              <Clock className="w-8 h-8 text-brand-green dark:text-brand-yellow mx-auto mb-3" />
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Duration
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {project.duration || 'N/A'}
              </p>
            </div>
            <div className="p-6 text-center bg-gradient-to-br from-brand-yellow/10 to-brand-yellow/5 dark:from-brand-yellow/20 dark:to-brand-yellow/10 border border-brand-yellow/20 rounded-2xl shadow-lg">
              <Users className="w-8 h-8 text-brand-green dark:text-brand-yellow mx-auto mb-3" />
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Team Size
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {project.teamSize || 'N/A'}
              </p>
            </div>
            <div className="p-6 text-center bg-gradient-to-br from-blue-500/10 to-blue-500/5 dark:from-blue-500/20 dark:to-blue-500/10 border border-blue-500/20 rounded-2xl shadow-lg">
              <Layers className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Role
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate">
                {project.role}
              </p>
            </div>
            <div className="p-6 text-center bg-gradient-to-br from-purple-500/10 to-purple-500/5 dark:from-purple-500/20 dark:to-purple-500/10 border border-purple-500/20 rounded-2xl shadow-lg">
              <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Date
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {project.date}
              </p>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="mb-16">
          <Card className="p-8 lg:p-12 bg-white dark:bg-slate-800 shadow-xl border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-brand-green/10 rounded-xl">
                <Target className="w-6 h-6 text-brand-green dark:text-brand-yellow" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Project Overview
              </h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.longDescription}
            </p>
          </Card>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-brand-yellow/10 rounded-xl">
              <Rocket className="w-6 h-6 text-brand-green dark:text-brand-yellow" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Key Features
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-green/10 rounded-lg flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-brand-green dark:text-brand-yellow" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {feature}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Technology Stack
            </h2>
          </div>
          <Card className="p-8 bg-white dark:bg-slate-800 shadow-xl border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-brand-green/10 to-brand-green/5 dark:from-brand-yellow/20 dark:to-brand-yellow/10 text-brand-green dark:text-brand-yellow font-semibold rounded-lg border border-brand-green/20 dark:border-brand-yellow/30 hover:shadow-lg transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Performance Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Performance Metrics
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.metrics.map((metric, index) => (
                <div key={index}>
                  <Card className="p-8 text-center bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 shadow-xl border-slate-200 dark:border-slate-700">
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-brand-green/20 dark:bg-brand-yellow/20 rounded-full blur-xl opacity-50" />
                      <TrendingUp className="w-12 h-12 text-brand-green dark:text-brand-yellow relative" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {metric.value}
                    </p>
                    <p className="text-base text-slate-600 dark:text-slate-400 mb-3 font-medium">
                      {metric.label}
                    </p>
                    {metric.improvement && (
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-sm font-semibold">
                        {metric.improvement}
                      </span>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Impact & Results */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Impact & Results
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {project.impact.map((impact, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-brand-green/5 to-brand-green/10 dark:from-brand-green/10 dark:to-brand-green/20 rounded-2xl border border-brand-green/20 dark:border-brand-green/30"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-brand-green/20 rounded-lg flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-brand-green dark:text-brand-yellow" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges & Solutions */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <Card className="p-8 h-full bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 border-red-200 dark:border-red-800/30 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-500/10 rounded-xl">
                  <Target className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Challenges
                </h2>
              </div>
              <div className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      {challenge}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-8 h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200 dark:border-green-800/30 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <Lightbulb className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Solutions
                </h2>
              </div>
              <div className="space-y-4">
                {project.solutions.map((solution, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-1 bg-green-500/20 rounded-lg flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      {solution}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Results */}
        <div className="mb-16">
          <Card className="p-8 lg:p-12 bg-gradient-to-br from-brand-green/10 to-brand-yellow/10 dark:from-brand-green/20 dark:to-brand-yellow/20 border border-brand-green/30 dark:border-brand-yellow/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-brand-yellow/20 rounded-xl">
                <Star className="w-6 h-6 text-brand-green dark:text-brand-yellow" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Final Results
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {project.results.map((result, index) => (
                <div
                  key={index}
                  className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl border border-brand-green/20 dark:border-brand-yellow/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-brand-yellow/20 rounded-lg flex-shrink-0">
                      <Star className="w-5 h-5 text-brand-yellow" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                      {result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Testimonials */}
        {project.testimonials && project.testimonials.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-3 bg-brand-yellow/10 rounded-xl">
                <Star className="w-6 h-6 text-brand-green dark:text-brand-yellow" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Client Testimonials
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {project.testimonials.map((testimonial, index) => (
                <div key={index}>
                  <Card className="p-8 bg-white dark:bg-slate-800 shadow-xl border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-brand-yellow fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 mb-6 italic text-lg leading-relaxed">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-green/20 to-brand-yellow/20 dark:from-brand-green/30 dark:to-brand-yellow/30 rounded-full flex items-center justify-center ring-4 ring-brand-green/10 dark:ring-brand-yellow/10">
                        <span className="text-brand-green dark:text-brand-yellow font-bold text-lg">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-brand-green/10 rounded-xl">
                <Layers className="w-6 h-6 text-brand-green dark:text-brand-yellow" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Related Projects
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <div key={relatedProject.id}>
                  <Link href={`/projects/${relatedProject.slug}`}>
                    <Card className="overflow-hidden bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 border-slate-200 dark:border-slate-700 cursor-pointer h-full flex flex-col">
                      <div className="relative h-56 bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/40">
                        <Image
                          src={relatedProject.image}
                          alt={relatedProject.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <span className="inline-block px-3 py-1 bg-brand-green/10 dark:bg-brand-yellow/20 text-brand-green dark:text-brand-yellow rounded-full text-sm font-semibold mb-3 w-fit">
                          {relatedProject.category.replace('-', ' ')}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 hover:text-brand-green dark:hover:text-brand-yellow transition-colors">
                          {relatedProject.name}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 flex-1">
                          {relatedProject.description}
                        </p>
                        <div className="flex items-center text-brand-green dark:text-brand-yellow font-semibold">
                          <span>View Project</span>
                          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
