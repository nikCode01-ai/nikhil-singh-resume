'use client';

import { notFound } from "next/navigation";
import { getProjectBySlug, getRelatedProjects } from "@/lib/project-slugs";
import { Button, ButtonLink } from "@/components/Button";
import { ArrowLeft, ExternalLink, Calendar, Users, Clock, Award, Target, Lightbulb, CheckCircle, TrendingUp, Star, GitBranch, Zap, Shield, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/Card";
import { motion } from "framer-motion";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project);

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-slate-950">
      {/* Hero Section */}
      <motion.div 
        className="relative h-96 bg-gradient-to-br from-brand-green/10 to-brand-yellow/10 dark:from-brand-green/5 dark:to-brand-yellow/5 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="rounded-full bg-brand-green/10 px-3 py-1 text-sm font-medium text-brand-green dark:bg-brand-yellow/15 dark:text-brand-yellow capitalize">
                {project.category.replace('-', ' ')}
              </span>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                project.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
              }`}>
                {project.status.replace('-', ' ')}
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              {project.name}
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-3xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {project.url && (
                <ButtonLink href={project.url} variant="primary">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Live Project
                </ButtonLink>
              )}
              {project.githubUrl && (
                <ButtonLink href={project.githubUrl} variant="secondary">
                  <GitBranch className="h-4 w-4 mr-2" />
                  View Source Code
                </ButtonLink>
              )}
              {project.demoUrl && (
                <ButtonLink href={project.demoUrl} variant="secondary">
                  <Zap className="h-4 w-4 mr-2" />
                  View Demo
                </ButtonLink>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        {/* Back Navigation */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ButtonLink href="/projects" variant="secondary" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </ButtonLink>
        </motion.div>

        {/* Project Overview */}
        <motion.div 
          className="grid lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Project Overview</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {project.longDescription}
              </p>

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-brand-green dark:text-brand-yellow mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Impact & Results */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Impact & Results</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.impact.map((impact, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start gap-3 p-4 bg-brand-green/5 dark:bg-brand-yellow/5 rounded-lg"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                    >
                      <TrendingUp className="w-5 h-5 text-brand-green dark:text-brand-yellow mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300">{impact}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Project Meta */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Project Details</h3>
                <div className="space-y-4">
                  {project.duration && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-brand-green dark:text-brand-yellow" />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Duration</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{project.duration}</p>
                      </div>
                    </div>
                  )}
                  {project.teamSize && (
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-brand-green dark:text-brand-yellow" />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Team Size</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{project.teamSize}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-brand-green dark:text-brand-yellow" />
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Role</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{project.role}</p>
                    </div>
                  </div>
                  {project.client && (
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-brand-green dark:text-brand-yellow" />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Client</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{project.client}</p>
                      </div>
                    </div>
                  )}
                  {project.date && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-brand-green dark:text-brand-yellow" />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Date</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{project.date}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="rounded-lg bg-brand-green/10 px-3 py-1 text-sm font-medium text-brand-green dark:bg-brand-yellow/15 dark:text-brand-yellow"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.2 + index * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">Performance Metrics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="p-6 text-center">
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, delay: 1.6 + index * 0.2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <TrendingUp className="w-8 h-8 text-brand-green dark:text-brand-yellow mx-auto mb-3" />
                    </motion.div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{metric.value}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{metric.label}</p>
                    {metric.improvement && (
                      <motion.p 
                        className="text-xs text-brand-green dark:text-brand-yellow font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 1.8 + index * 0.1 }}
                      >
                        {metric.improvement}
                      </motion.p>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Challenges & Solutions */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <Card className="p-8 h-full">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-brand-green dark:text-brand-yellow" />
                Challenges
              </h2>
              <div className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 2.0 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-brand-green dark:bg-brand-yellow rounded-full mt-2 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300">{challenge}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
          >
            <Card className="p-8 h-full">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-brand-green dark:text-brand-yellow" />
                Solutions
              </h2>
              <div className="space-y-4">
                {project.solutions.map((solution, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 2.2 + index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-brand-green dark:text-brand-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300">{solution}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Results */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4 }}
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Results & Impact</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.results.map((result, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-4 p-6 bg-gradient-to-r from-brand-green/5 to-brand-yellow/5 dark:from-brand-green/10 dark:to-brand-yellow/10 rounded-lg border border-brand-green/20 dark:border-brand-yellow/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 2.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 2.8 + index * 0.2 }}
                  >
                    <Star className="w-6 h-6 text-brand-green dark:text-brand-yellow mt-0.5 flex-shrink-0" />
                  </motion.div>
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{result}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Testimonials */}
        {project.testimonials && project.testimonials.length > 0 && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.8 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">Client Testimonials</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {project.testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 3.0 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-brand-yellow fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-6 italic text-lg leading-relaxed">"{testimonial.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-green/20 dark:bg-brand-yellow/20 rounded-full flex items-center justify-center">
                        <span className="text-brand-green dark:text-brand-yellow font-bold text-lg">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{testimonial.author}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.2 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">Related Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 3.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/40">
                      <Image
                        src={relatedProject.image}
                        alt={relatedProject.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <span className="rounded-full bg-brand-green/10 px-3 py-1 text-sm font-medium text-brand-green dark:bg-brand-yellow/15 dark:text-brand-yellow capitalize mb-3 inline-block">
                        {relatedProject.category.replace('-', ' ')}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-brand-green dark:group-hover:text-brand-yellow transition-colors">
                        {relatedProject.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">{relatedProject.description}</p>
                      <ButtonLink href={`/projects/${relatedProject.slug}`} variant="secondary" size="sm" className="w-full">
                        View Project
                      </ButtonLink>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

