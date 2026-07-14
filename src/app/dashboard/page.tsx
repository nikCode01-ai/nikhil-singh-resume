'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  ListChecks,
  Rocket,
  ShieldCheck,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

interface DocFile {
  name: string;
  slug: string;
  title: string;
  description: string;
  lines: number;
  size: string;
  status: 'pass' | 'warn' | 'pending' | 'error';
  progress: number;
  category: string;
  lastModified: string;
}

interface DashboardData {
  docs: DocFile[];
  summary: {
    totalFiles: number;
    passCount: number;
    errorCount: number;
    pendingCount: number;
    warnCount: number;
    overallProgress: number;
    timestamp: string;
  };
}

const statusConfig = {
  pass: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
    dot: 'bg-emerald-500',
    label: 'PASS',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
  },
  warn: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
    dot: 'bg-amber-500',
    label: 'WARN',
    gradient: 'from-amber-500/20 to-amber-500/5',
  },
  pending: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
    dot: 'bg-blue-500',
    label: 'PENDING',
    gradient: 'from-blue-500/20 to-blue-500/5',
  },
  error: {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/20',
    dot: 'bg-red-500',
    label: 'ERROR',
    gradient: 'from-red-500/20 to-red-500/5',
  },
};

const categoryIcons: Record<string, string> = {
  architecture: '◈',
  performance: '⚡',
  accessibility: '♿',
  seo: '🔍',
  issues: '📋',
  tasks: '📝',
  review: '👁',
  testing: '🧪',
  planning: '📅',
  ideas: '💡',
  cleanup: '🧹',
  runner: '🚀',
  general: '📄',
};

const pipelineStages = [
  {
    title: '01. Discover',
    description: 'Architecture, docs, and current gaps reviewed.',
    icon: LayoutDashboard,
  },
  {
    title: '02. Prioritize',
    description: 'Issues and tasks grouped by impact.',
    icon: ListChecks,
  },
  {
    title: '03. Implement',
    description: 'Performance, SEO, accessibility fixes.',
    icon: Rocket,
  },
  {
    title: '04. Verify',
    description: 'Build, lint, typecheck, Lighthouse.',
    icon: ShieldCheck,
  },
  {
    title: '05. Release',
    description: 'Production-ready portfolio.',
    icon: Sparkles,
  },
];

const focusAreas = [
  {
    title: 'Performance',
    value: 'High impact',
    note: 'Image optimization, caching headers, GA4 loading, bundle cleanup.',
  },
  {
    title: 'Accessibility',
    value: 'Medium impact',
    note: 'ARIA announcements, focus states, and screen-reader support.',
  },
  {
    title: 'SEO',
    value: 'High impact',
    note: 'Canonical URLs, metadata, schema, and sitemap coverage.',
  },
];

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<DocFile | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/dashboard');
      const json = await res.json();
      setData(json);
    } catch {
      console.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(31,77,55,0.08),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(31,77,55,0.15),_transparent_55%)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-brand-green/20 dark:border-brand-yellow/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-green dark:border-t-brand-yellow animate-spin" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Loading dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-400">Failed to load dashboard data</p>
      </div>
    );
  }

  const { docs, summary } = data;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(31,77,55,0.08),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(31,77,55,0.15),_transparent_55%)] py-8 sm:py-12">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 dark:bg-brand-yellow/10">
                  <LayoutDashboard className="h-6 w-6 text-brand-green dark:text-brand-yellow" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Project Dashboard
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Last updated:{' '}
                    {new Date(summary.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <button
                onClick={fetchData}
                disabled={refreshing}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
                />
                Refresh
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/10 px-3 py-1 text-sm font-semibold text-brand-green dark:border-brand-yellow/20 dark:bg-brand-yellow/10 dark:text-brand-yellow">
                <CheckCircle2 className="h-4 w-4" />
                {summary.passCount}/{summary.totalFiles} docs passing
              </div>
              {summary.errorCount > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-400 border border-red-500/20">
                  {summary.errorCount} errors
                </span>
              )}
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500 dark:text-slate-400">
                  Overall Progress
                </span>
                <span className="font-bold text-brand-green dark:text-brand-yellow">
                  {summary.overallProgress}%
                </span>
              </div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${summary.overallProgress}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-brand-green to-emerald-400 dark:from-brand-yellow dark:to-amber-400 rounded-full"
                />
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                {
                  label: 'Total',
                  value: summary.totalFiles,
                  bg: 'bg-slate-100 dark:bg-slate-800',
                  color: 'text-slate-900 dark:text-white',
                },
                {
                  label: 'Passing',
                  value: summary.passCount,
                  bg: 'bg-emerald-50 dark:bg-emerald-500/10',
                  color: 'text-emerald-600 dark:text-emerald-400',
                },
                {
                  label: 'Warnings',
                  value: summary.warnCount,
                  bg: 'bg-amber-50 dark:bg-amber-500/10',
                  color: 'text-amber-600 dark:text-amber-400',
                },
                {
                  label: 'Pending',
                  value: summary.pendingCount,
                  bg: 'bg-blue-50 dark:bg-blue-500/10',
                  color: 'text-blue-600 dark:text-blue-400',
                },
                {
                  label: 'Errors',
                  value: summary.errorCount,
                  bg: 'bg-red-50 dark:bg-red-500/10',
                  color: 'text-red-600 dark:text-red-400',
                },
              ].map((c) => (
                <div
                  key={c.label}
                  className={`${c.bg} rounded-2xl p-3 text-center border border-slate-200/50 dark:border-white/5`}
                >
                  <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {c.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="h-5 w-5 text-brand-green dark:text-brand-yellow" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Execution Pipeline
              </h2>
            </div>
            <div className="grid gap-3 lg:grid-cols-5">
              {pipelineStages.map((stage, i) => {
                const Icon = stage.icon;
                const isCompleted = i < 2;
                const isCurrent = i === 2;
                return (
                  <motion.div
                    key={stage.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className={`rounded-2xl border p-4 transition-all ${
                      isCompleted
                        ? 'border-emerald-500/20 bg-emerald-500/5'
                        : isCurrent
                          ? 'border-brand-green/30 bg-brand-green/5 dark:border-brand-yellow/30 dark:bg-brand-yellow/5 ring-1 ring-brand-green/10 dark:ring-brand-yellow/10'
                          : 'border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                          isCompleted
                            ? 'bg-emerald-500/10'
                            : isCurrent
                              ? 'bg-brand-green/10 dark:bg-brand-yellow/10'
                              : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Icon className="h-4 w-4 text-brand-green dark:text-brand-yellow" />
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          isCompleted
                            ? 'text-emerald-500'
                            : isCurrent
                              ? 'text-brand-green dark:text-brand-yellow'
                              : 'text-slate-400'
                        }`}
                      >
                        {isCompleted ? 'DONE' : isCurrent ? 'NOW' : 'NEXT'}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {stage.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {stage.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Focus Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Current Focus
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {focusAreas.map((area) => (
                <div
                  key={area.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-800/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {area.title}
                    </p>
                    <span className="text-xs font-semibold text-brand-green dark:text-brand-yellow">
                      {area.value}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {area.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Docs Grid + Detail Panel */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* File list */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Documentation Files
              </h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {docs.length} files
              </span>
            </div>
            {docs.map((doc, i) => {
              const cfg = statusConfig[doc.status];
              return (
                <motion.div
                  key={doc.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.03 }}
                  onClick={() =>
                    setSelectedDoc(selectedDoc?.name === doc.name ? null : doc)
                  }
                  className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                    selectedDoc?.name === doc.name
                      ? 'border-brand-green/40 bg-brand-green/5 dark:border-brand-yellow/40 dark:bg-brand-yellow/5 ring-1 ring-brand-green/10 dark:ring-brand-yellow/10'
                      : 'border-slate-200 bg-white hover:border-slate-300 dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-11 w-11 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-xl">
                        {categoryIcons[doc.category] || '📄'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {doc.title}
                        </h3>
                        <span
                          className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${cfg.bg} ${cfg.text} border ${cfg.border}`}
                        >
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {doc.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          {doc.lines} lines
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          {doc.size}
                        </span>
                        <span className="text-[10px] capitalize text-slate-400 dark:text-slate-500">
                          {doc.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="relative w-11 h-11">
                        <svg
                          className="w-11 h-11 -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <circle
                            cx="18"
                            cy="18"
                            r="15"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-slate-200 dark:text-slate-700"
                          />
                          <circle
                            cx="18"
                            cy="18"
                            r="15"
                            fill="none"
                            strokeWidth="2.5"
                            strokeDasharray={`${doc.progress * 0.94} 100`}
                            stroke="currentColor"
                            strokeLinecap="round"
                            className={cfg.text}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-slate-600 dark:text-slate-300">
                          {doc.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Details
            </h2>
            <AnimatePresence mode="wait">
              {selectedDoc ? (
                <motion.div
                  key={selectedDoc.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/70 sticky top-24"
                >
                  {(() => {
                    const cfg = statusConfig[selectedDoc.status];
                    return (
                      <>
                        <div className="flex items-center gap-3 mb-5">
                          <div
                            className={`h-14 w-14 rounded-2xl ${cfg.bg} flex items-center justify-center`}
                          >
                            <span className="text-2xl">
                              {categoryIcons[selectedDoc.category]}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                              {selectedDoc.title}
                            </h3>
                            <span
                              className={`text-xs font-semibold ${cfg.text}`}
                            >
                              {cfg.label}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3 mb-5">
                          {[
                            {
                              label: 'File',
                              value: selectedDoc.name,
                              mono: true,
                            },
                            {
                              label: 'Lines',
                              value: String(selectedDoc.lines),
                            },
                            { label: 'Size', value: selectedDoc.size },
                            {
                              label: 'Category',
                              value: selectedDoc.category,
                              capitalize: true,
                            },
                            {
                              label: 'Modified',
                              value: new Date(
                                selectedDoc.lastModified
                              ).toLocaleDateString(),
                            },
                          ].map((row) => (
                            <div
                              key={row.label}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-slate-500 dark:text-slate-400">
                                {row.label}
                              </span>
                              <span
                                className={`text-slate-900 dark:text-white ${row.mono ? 'font-mono text-xs' : ''} ${row.capitalize ? 'capitalize' : ''}`}
                              >
                                {row.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Progress bar */}
                        <div className="mb-5">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500">Progress</span>
                            <span className={`font-bold ${cfg.text}`}>
                              {selectedDoc.progress}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${cfg.dot}`}
                              style={{ width: `${selectedDoc.progress}%` }}
                            />
                          </div>
                        </div>

                        <a
                          href={`https://github.com/nikCode01-ai/nikhil-singh-resume/blob/feature/chatbot-ai-integration/docs/${selectedDoc.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center px-4 py-2.5 rounded-xl bg-brand-green/10 border border-brand-green/20 text-brand-green dark:bg-brand-yellow/10 dark:border-brand-yellow/20 dark:text-brand-yellow text-sm font-semibold hover:bg-brand-green/20 dark:hover:bg-brand-yellow/20 transition-colors"
                        >
                          View on GitHub →
                        </a>
                      </>
                    );
                  })()}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center"
                >
                  <LayoutDashboard className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    Click a file to see details
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Recommended Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Recommended Plan
            </h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-800/50">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <Clock3 className="h-4 w-4 text-brand-green dark:text-brand-yellow" />
                  Phase 1: Quick Wins
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />{' '}
                    Caching headers and security headers
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />{' '}
                    Conditional GA4 loading
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />{' '}
                    Canonical URLs added to all pages
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />{' '}
                    aria-live on contact form
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />{' '}
                    Duplicate imports cleaned
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-800/50">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <Rocket className="h-4 w-4 text-brand-green dark:text-brand-yellow" />
                  Phase 2: Quality Boost
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="h-4 w-4 flex items-center justify-center text-blue-400 mt-0.5 shrink-0">
                      ◎
                    </span>{' '}
                    Optimize images with next/image + WebP
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-4 w-4 flex items-center justify-center text-blue-400 mt-0.5 shrink-0">
                      ◎
                    </span>{' '}
                    Add FAQ and Article schema
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-4 w-4 flex items-center justify-center text-blue-400 mt-0.5 shrink-0">
                      ◎
                    </span>{' '}
                    Debounce search in Projects
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-4 w-4 flex items-center justify-center text-blue-400 mt-0.5 shrink-0">
                      ◎
                    </span>{' '}
                    Add unique meta descriptions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-4 w-4 flex items-center justify-center text-blue-400 mt-0.5 shrink-0">
                      ◎
                    </span>{' '}
                    Run Lighthouse audit
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-greenDark"
              >
                Back to portfolio
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold text-slate-700 transition hover:text-brand-green dark:text-slate-300 dark:hover:text-brand-yellow"
              >
                Share feedback
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-slate-400 dark:text-slate-500 pb-4"
        >
          Auto-refreshes every 30s · Dashboard by Nikhil Singh
        </motion.p>
      </div>
    </main>
  );
}
