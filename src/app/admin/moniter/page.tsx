'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Users,
  Eye,
  FileDown,
  Globe,
  Flame,
  Activity,
  ArrowLeft,
  RefreshCw,
  Play,
  Pause,
  ShieldCheck,
} from 'lucide-react';

interface LiveMonitorData {
  timestamp: string;
  executionTimeMs: number;
  liveMonitor: {
    activeVisitorsCount: number;
    totalPageviews: number;
    totalResumeDownloads: number;
    totalChatQueries: number;
    totalInquiries: number;
    conversionRate: string;
  };
  activeSessions: Array<{
    sessionId: string;
    lastActive: string;
    path: string;
    country?: string;
    city?: string;
    device?: string;
    browser?: string;
  }>;
  liveActivityFeed: Array<{
    id: string;
    time: string;
    timestamp: string;
    type: string;
    title: string;
    location: string;
    device: string;
    ip?: string;
  }>;
  services: {
    groqAi: {
      name: string;
      status: 'operational' | 'degraded' | 'down';
      latencyMs: number;
    };
    resendEmail: {
      name: string;
      status: 'operational' | 'degraded' | 'down';
      latencyMs: number;
    };
    appServer: {
      name: string;
      status: 'operational' | 'degraded' | 'down';
      latencyMs: number;
    };
    inboxDb: {
      name: string;
      status: 'operational' | 'degraded' | 'down';
      latencyMs: number;
      totalRecords: number;
    };
  };
}

export default function AdminMonitorPage() {
  const [data, setData] = useState<LiveMonitorData | null>(null);
  const [pollInterval, setPollInterval] = useState<number>(3000); // 3s polling
  const [isPaused, setIsPaused] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLiveMonitor = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch('/api/admin/system-metrics', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: LiveMonitorData = await res.json();
      setData(json);
    } catch (err) {
      console.error('Failed to fetch live monitor:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveMonitor();
    if (isPaused) return;

    const timer = setInterval(() => {
      fetchLiveMonitor();
    }, pollInterval);

    return () => clearInterval(timer);
  }, [fetchLiveMonitor, pollInterval, isPaused]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 sm:p-8 text-white shadow-xl border border-slate-700/50">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white transition-colors bg-white/10 px-2.5 py-1 rounded-lg"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
              </Link>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                100% REAL LIVE DATA
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Live Business & Visitor Command Center
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
              Real-time portfolio visitors, recruiter interactions, resume
              downloads, and live service health.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              aria-label="Select refresh interval"
              value={pollInterval}
              onChange={(e) => setPollInterval(Number(e.target.value))}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium rounded-xl px-3 py-2 outline-hidden transition-all cursor-pointer backdrop-blur-md"
            >
              <option value={1000} className="bg-slate-900 text-white">
                1s (Ultra Fast)
              </option>
              <option value={3000} className="bg-slate-900 text-white">
                3s (Normal)
              </option>
              <option value={10000} className="bg-slate-900 text-white">
                10s (Eco)
              </option>
            </select>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all cursor-pointer border ${
                isPaused
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                  : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isPaused ? (
                <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ) : (
                <Pause className="w-3.5 h-3.5" />
              )}
              {isPaused ? 'Resume' : 'Pause'}
            </button>

            <button
              onClick={fetchLiveMonitor}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* 4 Big Live Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Active Visitors Now
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-baseline gap-2">
            {data?.liveMonitor.activeVisitorsCount ?? 0}
            <span className="text-xs font-normal text-emerald-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />{' '}
              Live
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Real Pageviews
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {data?.liveMonitor.totalPageviews ?? 0}
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Resume Downloads
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <FileDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">
            {data?.liveMonitor.totalResumeDownloads ?? 0}
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Lead Conversion Rate
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {data?.liveMonitor.conversionRate ?? '0.0%'}
          </div>
        </div>
      </div>

      {/* Main Grid: Live Feed & Active Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Live Recruiter & Visitor Stream
                </h3>
              </div>
            </div>

            {data?.liveActivityFeed.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <Globe className="w-8 h-8 mx-auto mb-2 opacity-40 text-emerald-500" />
                <p className="text-xs">Listening for real live visitors...</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {data?.liveActivityFeed.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-slate-900 dark:text-white truncate">
                          {ev.title}
                        </span>
                        <span className="px-1.5 py-0.2 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono">
                          {ev.type}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span>📍 {ev.location}</span>
                        <span>•</span>
                        <span>💻 {ev.device}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 shrink-0">
                      {ev.time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Users className="w-4 h-4 text-indigo-500" />
              Live Online Users ({data?.activeSessions.length ?? 0})
            </h3>
            {data?.activeSessions.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs">
                No active users right this second.
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {data?.activeSessions.map((sess, idx) => (
                  <div
                    key={sess.sessionId || idx}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Viewing:{' '}
                        <span className="font-mono text-indigo-500">
                          {sess.path}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Live Integration Services
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-700 dark:text-slate-300">
                  Groq AI
                </span>
                <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {data?.services.groqAi.status?.toUpperCase() ?? 'OPERATIONAL'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-700 dark:text-slate-300">
                  Resend
                </span>
                <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {data?.services.resendEmail.status?.toUpperCase() ??
                    'OPERATIONAL'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
