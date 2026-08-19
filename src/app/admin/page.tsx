'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  BookOpen,
  FolderGit2,
  Cpu,
  Layers,
  ExternalLink,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Database,
  ArrowUpRight,
  Sliders,
  BarChart3,
  Search,
} from 'lucide-react';
import { featuredProjects, technicalSkills, person } from '@/lib/resume-data';

interface GeneratedBlog {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  tags: string[];
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'blogs' | 'projects' | 'skills' | 'system'
  >('overview');
  const [blogs, setBlogs] = useState<GeneratedBlog[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);

  // Blog Generator State
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('Full-Stack Development');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genMessage, setGenMessage] = useState('');

  // Search state for projects/skills
  const [projectSearch, setProjectSearch] = useState('');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('All');

  const fetchBlogs = async () => {
    try {
      setIsLoadingBlogs(true);
      const res = await fetch('/api/blogs/generate');
      const data = await res.json();
      if (data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error('Failed to load blogs:', err);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleGenerateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !category) return;

    setIsGenerating(true);
    setGenMessage('');

    try {
      const res = await fetch('/api/blogs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category }),
      });
      const result = await res.json();
      if (result.success) {
        setGenMessage(
          '✓ Blog successfully generated with Groq AI and published!'
        );
        setTopic('');
        fetchBlogs();
      } else {
        setGenMessage(
          '❌ Error: ' + (result.error || 'Failed to generate blog')
        );
      }
    } catch {
      setGenMessage('❌ Network error generating blog');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteBlog = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this generated blog?'))
      return;
    try {
      const res = await fetch(`/api/blogs/generate?slug=${slug}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.slug !== slug));
      }
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };

  const totalSkillsCount = Object.values(technicalSkills).reduce(
    (acc, curr) => acc + curr.length,
    0
  );

  const filteredProjects = featuredProjects.filter((p) => {
    const techList = 'tech' in p && Array.isArray(p.tech) ? p.tech : [];
    return (
      p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(projectSearch.toLowerCase()) ||
      techList.some((t) =>
        t.toLowerCase().includes(projectSearch.toLowerCase())
      )
    );
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-green/10 via-emerald-500/10 to-teal-500/10 border border-brand-green/20 p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green dark:text-emerald-300 text-xs font-bold mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" /> Live Production Control
              Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome, {person.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-2xl">
              Manage your portfolio content, generate high-impact AI blogs with
              Groq LLMs, monitor project assets, and inspect system health.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab('blogs')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-green text-white font-bold text-xs sm:text-sm shadow-md hover:bg-brand-greenDark transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Generate AI Blog
            </button>
            <a
              href="http://localhost:1337/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs sm:text-sm shadow-md hover:bg-purple-700 transition-all"
            >
              <Database className="w-4 h-4" />
              Strapi CMS
            </a>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div
          onClick={() => setActiveTab('blogs')}
          className="cursor-pointer p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-brand-green/40 hover:-translate-y-0.5 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">
              Total Blogs
            </span>
            <BookOpen className="w-5 h-5 text-brand-green group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {10 + blogs.length}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            10 hardcoded + {blogs.length} AI generated
          </p>
        </div>

        <div
          onClick={() => setActiveTab('projects')}
          className="cursor-pointer p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-brand-green/40 hover:-translate-y-0.5 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">
              Projects
            </span>
            <FolderGit2 className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {featuredProjects.length}+
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Airline NDC, E-commerce, AI
          </p>
        </div>

        <div
          onClick={() => setActiveTab('skills')}
          className="cursor-pointer p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-brand-green/40 hover:-translate-y-0.5 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">
              Tech Skills
            </span>
            <Cpu className="w-5 h-5 text-teal-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {totalSkillsCount}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Across 9 specialized domains
          </p>
        </div>

        <div
          onClick={() => setActiveTab('system')}
          className="cursor-pointer p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-brand-green/40 hover:-translate-y-0.5 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">
              AI Engine
            </span>
            <Sparkles className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white truncate">
            Groq Llama-3.3
          </div>
          <p className="text-[11px] text-emerald-500 font-semibold mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active & Ready
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-hide">
        {[
          {
            id: 'overview' as const,
            label: 'Overview & Studio',
            icon: BarChart3,
          },
          { id: 'blogs' as const, label: 'AI Blogs Manager', icon: BookOpen },
          {
            id: 'projects' as const,
            label: 'Featured Projects',
            icon: FolderGit2,
          },
          { id: 'skills' as const, label: 'Skills & Tech Stack', icon: Layers },
          { id: 'system' as const, label: 'System & Strapi', icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-brand-green text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: Overview & Blogs Generator */}
      {(activeTab === 'overview' || activeTab === 'blogs') && (
        <div className="space-y-8">
          {/* Generator Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center gap-2.5 text-base font-bold text-slate-900 dark:text-white mb-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Create New AI Blog
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                Enter a topic to automatically produce a comprehensive,
                structured technical post using Groq LLM.
              </p>

              <form onSubmit={handleGenerateBlog} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Topic / Keyword
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Next.js 15 App Router Best Practices"
                    className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 text-slate-900 dark:text-white focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 text-slate-900 dark:text-white focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                  >
                    <option value="Full-Stack Development">
                      Full-Stack Development
                    </option>
                    <option value="Frontend Engineering">
                      Frontend Engineering
                    </option>
                    <option value="Backend Architecture">
                      Backend Architecture
                    </option>
                    <option value="AI & Machine Learning">
                      AI & Machine Learning
                    </option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Aviation & NDC APIs">
                      Aviation & NDC APIs
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating || !topic}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-green text-white font-bold text-xs sm:text-sm shadow-md hover:bg-brand-greenDark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Generating with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      Generate & Publish Post
                    </>
                  )}
                </button>

                {genMessage && (
                  <p
                    className={`text-xs font-semibold p-3 rounded-xl ${
                      genMessage.startsWith('✓')
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                    }`}
                  >
                    {genMessage}
                  </p>
                )}
              </form>
            </div>

            {/* Generated & Stored Blogs Table */}
            <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      Generated Blogs ({blogs.length})
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Posts saved in local JSON repository and rendered
                      dynamically
                    </p>
                  </div>
                  <button
                    onClick={fetchBlogs}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-green transition-colors"
                    title="Refresh blogs list"
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${isLoadingBlogs ? 'animate-spin' : ''}`}
                    />
                  </button>
                </div>

                {isLoadingBlogs ? (
                  <div className="py-12 text-center text-xs text-slate-400">
                    Loading blogs...
                  </div>
                ) : blogs.length === 0 ? (
                  <div className="py-12 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                    <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-slate-500">
                      No generated blogs yet
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Use the generator on the left to write your first post
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-[380px] overflow-y-auto pr-1">
                    {blogs.map((b) => (
                      <div
                        key={b.slug}
                        className="py-3.5 flex items-center justify-between gap-4 group"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              {b.category}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {b.date}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              • {b.readingTime}
                            </span>
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-brand-green transition-colors">
                            {b.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {b.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Link
                            href={`/blogs/${b.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-green hover:bg-brand-green/10 transition-colors"
                            title="View live post"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteBlog(b.slug)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                            title="Delete post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>
                  All blogs are indexed at <code>/blogs</code>
                </span>
                <Link
                  href="/blogs"
                  target="_blank"
                  className="font-bold text-brand-green dark:text-emerald-400 flex items-center gap-1"
                >
                  Browse All Blogs <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Featured Portfolio Projects
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showcase of real-world production applications and NDC
                integrations
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                placeholder="Search projects or tech stack..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((p, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between group hover:border-brand-green/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {p.category}
                    </span>
                    {p.date && (
                      <span className="text-[10px] text-slate-400">
                        {p.date}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-green transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1 max-w-[70%]">
                    {('tech' in p && Array.isArray(p.tech) ? p.tech : [])
                      .slice(0, 3)
                      .map((tech, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-medium px-2 py-0.5 rounded-md bg-brand-green/5 text-brand-green dark:text-emerald-400 border border-brand-green/10"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>

                  {'url' in p && p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-green dark:text-emerald-400 hover:underline"
                    >
                      Visit <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Skills */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Technical Skills Matrix
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Curated stack of {totalSkillsCount} technologies across{' '}
                {Object.keys(technicalSkills).length} categories
              </p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => setSelectedSkillCategory('All')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  selectedSkillCategory === 'All'
                    ? 'bg-brand-green text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                All
              </button>
              {Object.keys(technicalSkills).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedSkillCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                    selectedSkillCategory === cat
                      ? 'bg-brand-green text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(technicalSkills)
              .filter(
                ([cat]) =>
                  selectedSkillCategory === 'All' ||
                  selectedSkillCategory === cat
              )
              .map(([category, skills]) => (
                <div
                  key={category}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {category}
                    </h3>
                    <span className="text-xs font-bold text-emerald-500">
                      {skills.length} skills
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: System & Strapi */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            System Health & Integrations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strapi Panel */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Strapi Headless CMS
                    </h3>
                    <p className="text-xs text-emerald-500 font-semibold">
                      Port 1337 • Active
                    </p>
                  </div>
                </div>
                <a
                  href="http://localhost:1337/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 text-white font-bold text-xs shadow-sm hover:bg-purple-700 transition-colors"
                >
                  Open CMS <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Use Strapi to edit database collections including projects,
                client testimonials, resume timelines, and contact messages.
              </p>
            </div>

            {/* AI Diagnostics Panel */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Groq AI Cloud Engine
                  </h3>
                  <p className="text-xs text-emerald-500 font-semibold">
                    Model: llama-3.3-70b-versatile
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Powers real-time blog generation, portfolio interactive chat,
                and contextual project summaries.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
