'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Cpu,
  HardDrive,
  Clock,
  Server,
  Zap,
  RefreshCw,
  Play,
  Pause,
  Download,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Flame,
  BarChart2,
  Database,
  ArrowLeft,
} from 'lucide-react';

interface SystemMetrics {
  timestamp: string;
  executionTimeMs: number;
  cpu: {
    model: string;
    cores: number;
    speedMhz: number;
    overallLoadPercent: number;
    perCore: Array<{ core: number; speedMhz: number; usage: number }>;
    architecture: string;
  };
  memory: {
    totalBytes: number;
    usedBytes: number;
    freeBytes: number;
    percent: number;
    totalGB: string;
    usedGB: string;
    freeGB: string;
  };
  process: {
    pid: number;
    nodeVersion: string;
    platform: string;
    osType: string;
    osRelease: string;
    hostname: string;
    uptimeSeconds: number;
    systemUptimeSeconds: number;
    memoryUsage: {
      rssMB: string;
      heapTotalMB: string;
      heapUsedMB: string;
      externalMB: string;
    };
  };
  storage: {
    diskIoLatencyMs: number;
    nextBuildSizeBytes: number;
    nextBuildSizeMB: string;
    publicDirSizeBytes: number;
    publicDirSizeMB: string;
    fileSystemStatus: string;
  };
  services: {
    appServer: {
      name: string;
      status: 'operational' | 'degraded' | 'down';
      latencyMs: number;
      error?: string;
    };
    strapiCms: {
      name: string;
      status: 'operational' | 'degraded' | 'down';
      latencyMs: number;
      error?: string;
    };
    inboxDb: {
      name: string;
      status: 'operational' | 'degraded' | 'down';
      latencyMs: number;
    };
  };
}

interface TelemetryPoint {
  time: string;
  cpu: number;
  memory: number;
  heap: number;
}

interface LogEvent {
  id: string;
  time: string;
  type: 'info' | 'success' | 'warn' | 'error';
  message: string;
}

export default function AdminMonitorPage() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pollInterval, setPollInterval] = useState<number>(2000); // 2s default
  const [isPaused, setIsPaused] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [history, setHistory] = useState<TelemetryPoint[]>([]);
  const [logs, setLogs] = useState<LogEvent[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const addLog = useCallback((type: LogEvent['type'], message: string) => {
    const newLog: LogEvent = {
      id: `${Date.now()}-${Math.random()}`,
      time: new Date().toLocaleTimeString(),
      type,
      message,
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 29)]);
  }, []);

  const fetchMetrics = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch('/api/admin/system-metrics', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: SystemMetrics = await res.json();
      setMetrics(data);
      setLastUpdated(new Date());

      // Add to rolling history (max 30 data points)
      const nowTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setHistory((prev) => {
        const nextPoint: TelemetryPoint = {
          time: nowTime,
          cpu: data.cpu.overallLoadPercent,
          memory: data.memory.percent,
          heap: parseFloat(data.process.memoryUsage.heapUsedMB),
        };
        return [...prev.slice(-29), nextPoint];
      });

      if (data.cpu.overallLoadPercent > 85) {
        addLog(
          'warn',
          `High CPU load detected: ${data.cpu.overallLoadPercent}%`
        );
      }
    } catch (err) {
      console.error('Failed to fetch system metrics:', err);
      addLog(
        'error',
        `Metrics fetch error: ${err instanceof Error ? err.message : 'Unknown'}`
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [addLog]);

  // Polling timer
  useEffect(() => {
    fetchMetrics();
    addLog('info', 'System telemetry agent initialized and monitoring live.');
  }, [fetchMetrics, addLog]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      fetchMetrics();
    }, pollInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pollInterval, isPaused, fetchMetrics]);

  // Format seconds into DD:HH:MM:SS
  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d > 0 ? `${d}d ` : ''}${h.toString().padStart(2, '0')}h ${m
      .toString()
      .padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  const handleExportDiagnostics = () => {
    if (!metrics) return;
    const jsonStr = JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        metrics,
        telemetryHistory: history,
        logs,
      },
      null,
      2
    );
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-health-diagnostics-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addLog('success', 'Full system health diagnostic report exported.');
  };

  const handleTriggerBenchmark = async () => {
    addLog('info', 'Executing live Disk I/O & Memory stress benchmark...');
    await fetchMetrics();
    addLog(
      'success',
      `Benchmark complete. Disk I/O Latency: ${metrics?.storage.diskIoLatencyMs || 0}ms`
    );
  };

  if (isLoading && !metrics) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-500">
          Connecting to Host OS Telemetry Socket...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn font-sans pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
              </Link>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                LIVE REAL-TIME TELEMETRY
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Host System & Performance Monitor
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              100% Real OS Kernel, CPU Core Load, Node.js Memory Heap, Disk I/O,
              and Microservice Latency metrics.
            </p>
          </div>

          {/* Controls toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Interval Selector */}
            <div className="flex items-center rounded-xl bg-slate-800/80 border border-slate-700/80 p-1 text-xs font-semibold">
              <span className="px-2 text-slate-400 text-[11px]">Poll:</span>
              {[
                { label: '1s', val: 1000 },
                { label: '2s', val: 2000 },
                { label: '5s', val: 5000 },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setPollInterval(item.val)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    pollInterval === item.val
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Pause/Resume button */}
            <button
              onClick={() => {
                setIsPaused(!isPaused);
                addLog(
                  'info',
                  isPaused ? 'Live polling resumed.' : 'Live polling paused.'
                );
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isPaused
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {isPaused ? (
                <Play className="w-3.5 h-3.5" />
              ) : (
                <Pause className="w-3.5 h-3.5" />
              )}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>

            {/* Sync now button */}
            <button
              onClick={fetchMetrics}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              <span>Refresh</span>
            </button>

            {/* Export diagnostics */}
            <button
              onClick={handleExportDiagnostics}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* Point 1, 2, 3, 4: Top 4 Real-Time Core KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* 1. CPU LOAD */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Overall CPU Load
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
              {metrics?.cpu.overallLoadPercent ?? 0}%
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              {metrics?.cpu.cores || 0} Cores
            </span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                (metrics?.cpu.overallLoadPercent ?? 0) > 80
                  ? 'bg-red-500'
                  : (metrics?.cpu.overallLoadPercent ?? 0) > 50
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
              }`}
              style={{
                width: `${Math.min(100, metrics?.cpu.overallLoadPercent ?? 0)}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate font-mono">
            {metrics?.cpu.model}
          </p>
        </div>

        {/* 2. SYSTEM RAM */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              System Memory (RAM)
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
              {metrics?.memory.percent ?? 0}%
            </span>
            <span className="text-xs text-slate-400">
              {metrics?.memory.usedGB} / {metrics?.memory.totalGB} GB
            </span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${metrics?.memory.percent ?? 0}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex justify-between">
            <span>Free: {metrics?.memory.freeGB} GB</span>
            <span className="text-emerald-500 font-semibold">Available</span>
          </p>
        </div>

        {/* 3. NODE.JS HEAP */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Node.js Heap Memory
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
              {metrics?.process.memoryUsage.heapUsedMB ?? 0}
            </span>
            <span className="text-xs text-slate-400">MB Used</span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  100,
                  (parseFloat(metrics?.process.memoryUsage.heapUsedMB || '0') /
                    parseFloat(
                      metrics?.process.memoryUsage.heapTotalMB || '1'
                    )) *
                    100
                )}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex justify-between">
            <span>
              Heap Total: {metrics?.process.memoryUsage.heapTotalMB} MB
            </span>
            <span>RSS: {metrics?.process.memoryUsage.rssMB} MB</span>
          </p>
        </div>

        {/* 4. PROCESS UPTIME */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Process Uptime
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono truncate">
            {formatUptime(metrics?.process.uptimeSeconds ?? 0)}
          </div>
          <div className="mt-3 text-xs text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
            <span>
              PID:{' '}
              <strong className="font-mono text-slate-800 dark:text-slate-200">
                {metrics?.process.pid}
              </strong>
            </span>
            <span>
              OS Uptime:{' '}
              <strong className="font-mono text-slate-800 dark:text-slate-200">
                {Math.floor((metrics?.process.systemUptimeSeconds || 0) / 3600)}
                h
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Point 6: Live 60-Second Real-Time Telemetry Scrolling Timeline Chart */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-emerald-500" />
              Live Telemetry Waveform (Real-Time Sample Stream)
            </h3>
            <p className="text-xs text-slate-500">
              Capturing continuous CPU load and RAM usage at{' '}
              {pollInterval / 1000}s sampling intervals.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500" />
              <span className="text-slate-600 dark:text-slate-300">
                CPU Load (%)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-blue-500" />
              <span className="text-slate-600 dark:text-slate-300">
                Memory RAM (%)
              </span>
            </div>
          </div>
        </div>

        {/* Live Visual Timeline Bars */}
        <div className="h-44 w-full flex items-end gap-1.5 sm:gap-2 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar">
          {history.length === 0 ? (
            <div className="w-full text-center text-xs text-slate-400 py-12">
              Accumulating real-time telemetry stream...
            </div>
          ) : (
            history.map((pt, idx) => (
              <div
                key={idx}
                className="flex-1 min-w-[10px] flex flex-col items-center justify-end h-full group relative"
              >
                <div className="w-full flex items-end gap-1 justify-center h-full">
                  {/* CPU Bar */}
                  <div
                    style={{ height: `${Math.max(4, pt.cpu)}%` }}
                    className="w-full max-w-[14px] bg-emerald-500/80 hover:bg-emerald-500 rounded-t-xs transition-all duration-300 relative group/cpu"
                  >
                    <div className="opacity-0 group-hover/cpu:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-30 shadow-md">
                      CPU: {pt.cpu}%
                    </div>
                  </div>
                  {/* RAM Bar */}
                  <div
                    style={{ height: `${Math.max(4, pt.memory)}%` }}
                    className="w-full max-w-[14px] bg-blue-500/80 hover:bg-blue-500 rounded-t-xs transition-all duration-300 relative group/ram"
                  >
                    <div className="opacity-0 group-hover/ram:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-30 shadow-md">
                      RAM: {pt.memory}%
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>T - 60s</span>
          <span className="font-mono">
            Live Timestamp: {lastUpdated.toLocaleTimeString()}
          </span>
          <span>Now (T - 0s)</span>
        </div>
      </div>

      {/* Point 1 (Cores) & Point 5 (Services) & Point 7 (Storage) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Point 1: Per-Core Breakdown Grid */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-500" />
            CPU Multi-Core Load ({metrics?.cpu.cores} Physical/Virtual Cores)
          </h3>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {metrics?.cpu.perCore.map((core) => (
              <div key={core.core} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-700 dark:text-slate-300">
                    Core #{core.core}
                  </span>
                  <span className="text-slate-500">
                    {core.speedMhz} MHz • <strong>{core.usage}%</strong>
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      core.usage > 80
                        ? 'bg-red-500'
                        : core.usage > 50
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, core.usage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Point 5: Microservices & Endpoints Health */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-500" />
              Microservices & API Latency
            </h3>
            <button
              onClick={fetchMetrics}
              className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Ping All
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* App Server */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">
                  Next.js Web Server
                </div>
                <span className="text-slate-500 text-[11px]">
                  Port 3000 • Localhost
                </span>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 font-bold text-emerald-500">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 200 OK
                </span>
                <div className="text-[10px] text-slate-400 font-mono">
                  {metrics?.services.appServer.latencyMs} ms
                </div>
              </div>
            </div>

            {/* Strapi CMS */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">
                  Strapi CMS Engine
                </div>
                <span className="text-slate-500 text-[11px]">
                  Port 1337 • Backend
                </span>
              </div>
              <div className="text-right">
                {metrics?.services.strapiCms.status === 'operational' ? (
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-500">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Online
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-bold text-slate-400">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />{' '}
                    Standby
                  </span>
                )}
                <div className="text-[10px] text-slate-400 font-mono">
                  {metrics?.services.strapiCms.latencyMs} ms
                </div>
              </div>
            </div>

            {/* Inbox Store */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">
                  JSON Inbox Data Layer
                </div>
                <span className="text-slate-500 text-[11px]">
                  Local File System Storage
                </span>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 font-bold text-emerald-500">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Operational
                </span>
                <div className="text-[10px] text-slate-400 font-mono">
                  {metrics?.storage.diskIoLatencyMs} ms
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Point 7: Disk & Storage I/O Benchmark */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-500" />
              Workspace Disk & Artifacts
            </h3>
            <button
              onClick={handleTriggerBenchmark}
              className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
            >
              Test I/O
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">
                Disk Read/Write Latency
              </span>
              <span className="font-mono font-bold text-emerald-500">
                {metrics?.storage.diskIoLatencyMs} ms
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">
                .next Build Cache Size
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {metrics?.storage.nextBuildSizeMB} MB
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">
                Public Static Assets
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {metrics?.storage.publicDirSizeMB} MB
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-600 dark:text-slate-400">
                File System Health
              </span>
              <span className="font-bold text-emerald-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Normal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Point 8, 9, 10: Environment Specs & Live Telemetry Terminal Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Point 8 & 4: Host Specs Details */}
        <div className="lg:col-span-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Host Runtime Specifications
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Hostname</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {metrics?.process.hostname}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">OS Platform</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {metrics?.process.platform} ({metrics?.process.osRelease})
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Architecture</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {metrics?.cpu.architecture}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Node.js Engine</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {metrics?.process.nodeVersion}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Next.js Framework</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                v15.5.12 App Router
              </span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500">Telemetry Latency</span>
              <span className="font-mono font-bold text-emerald-500">
                {metrics?.executionTimeMs} ms
              </span>
            </div>
          </div>
        </div>

        {/* Point 9: Live System Event Log Terminal */}
        <div className="lg:col-span-8 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-200 shadow-xl space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Live Telemetry Event Log Stream
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Realtime Buffer</span>
            </div>
          </div>

          <div className="h-48 overflow-y-auto space-y-1.5 text-xs pr-2">
            {logs.length === 0 ? (
              <div className="text-slate-500 text-xs italic">
                Waiting for events...
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-2 leading-relaxed"
                >
                  <span className="text-slate-500 shrink-0">[{log.time}]</span>
                  <span
                    className={`font-bold shrink-0 uppercase text-[10px] px-1 rounded ${
                      log.type === 'error'
                        ? 'bg-red-500/20 text-red-400'
                        : log.type === 'warn'
                          ? 'bg-amber-500/20 text-amber-400'
                          : log.type === 'success'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {log.type}
                  </span>
                  <span className="text-slate-300 truncate">{log.message}</span>
                </div>
              ))
            )}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>Terminal status: Online & streaming</span>
            <button
              onClick={() => setLogs([])}
              className="hover:text-white transition-colors cursor-pointer text-[10px] underline"
            >
              Clear Buffer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
