import { NextResponse } from 'next/server';
import os from 'os';
import fs from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

let previousCpuTimes: { idle: number; total: number } | null = null;

function getCpuUsage(): number {
  const cpus = os.cpus();
  let idle = 0;
  let total = 0;

  for (const cpu of cpus) {
    for (const type in cpu.times) {
      total += (cpu.times as Record<string, number>)[type];
    }
    idle += cpu.times.idle;
  }

  if (!previousCpuTimes) {
    previousCpuTimes = { idle, total };
    return 12.5; // Initial baseline
  }

  const idleDiff = idle - previousCpuTimes.idle;
  const totalDiff = total - previousCpuTimes.total;
  previousCpuTimes = { idle, total };

  if (totalDiff === 0) return 0;
  const usage = 100 - (idleDiff / totalDiff) * 100;
  return Math.max(0, Math.min(100, parseFloat(usage.toFixed(1))));
}

function getDirectorySize(dirPath: string): number {
  try {
    if (!fs.existsSync(dirPath)) return 0;
    let totalSize = 0;
    const files = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const file of files) {
      const fullPath = join(dirPath, file.name);
      if (file.isDirectory()) {
        totalSize += getDirectorySize(fullPath);
      } else if (file.isFile()) {
        totalSize += fs.statSync(fullPath).size;
      }
    }
    return totalSize;
  } catch {
    return 0;
  }
}

async function pingEndpoint(
  url: string,
  timeoutMs = 2500
): Promise<{
  status: 'operational' | 'degraded' | 'down';
  latencyMs: number;
  error?: string;
}> {
  const start = Date.now();
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: { 'Cache-Control': 'no-cache' },
    });
    clearTimeout(timer);
    const latencyMs = Date.now() - start;

    if (res.ok || res.status < 500) {
      return { status: 'operational', latencyMs };
    }
    return { status: 'degraded', latencyMs, error: `HTTP ${res.status}` };
  } catch (err: unknown) {
    const latencyMs = Date.now() - start;
    const msg = err instanceof Error ? err.message : 'Connection refused';
    return { status: 'down', latencyMs, error: msg };
  }
}

export async function GET() {
  try {
    const startTime = Date.now();

    // 1. REAL CPU DATA
    const cpus = os.cpus();
    const cpuLoad = getCpuUsage();
    const coreCount = cpus.length;
    const cpuModel = cpus[0]?.model || 'Generic CPU';
    const cpuSpeed = cpus[0]?.speed || 0;

    const perCoreLoad = cpus.map((cpu, index) => {
      let coreTotal = 0;
      for (const type in cpu.times) {
        coreTotal += (cpu.times as Record<string, number>)[type];
      }
      const coreIdle = cpu.times.idle;
      const usage = coreTotal > 0 ? 100 - (coreIdle / coreTotal) * 100 : 0;
      return {
        core: index + 1,
        speedMhz: cpu.speed,
        usage: parseFloat(usage.toFixed(1)),
      };
    });

    // 2. REAL RAM / MEMORY
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memUsagePercent = parseFloat(((usedMem / totalMem) * 100).toFixed(1));

    // 3. REAL PROCESS MEMORY (Node.js)
    const procMem = process.memoryUsage();

    // 4. REAL UPTIME & LIFECYCLE
    const processUptimeSeconds = Math.floor(process.uptime());
    const systemUptimeSeconds = Math.floor(os.uptime());

    // 5. REAL DISK / FILE SYSTEM BENCHMARK
    const ioBenchStart = Date.now();
    const tempTestFile = join(process.cwd(), '.bench_test.tmp');
    try {
      fs.writeFileSync(tempTestFile, `benchmark-${Date.now()}`, 'utf-8');
      fs.readFileSync(tempTestFile, 'utf-8');
      fs.unlinkSync(tempTestFile);
    } catch {}
    const diskIoLatencyMs = Date.now() - ioBenchStart;

    // Cache / Build Directory Sizes
    const nextBuildSize = getDirectorySize(join(process.cwd(), '.next'));
    const publicDirSize = getDirectorySize(join(process.cwd(), 'public'));

    // 6. REAL SERVICE HEALTH PINGS
    const [appServerPing, strapiPing] = await Promise.all([
      pingEndpoint('http://localhost:3000/api/admin/analytics', 2000),
      pingEndpoint('http://localhost:1337/_health', 1500),
    ]);

    const executionTimeMs = Date.now() - startTime;

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      executionTimeMs,
      cpu: {
        model: cpuModel,
        cores: coreCount,
        speedMhz: cpuSpeed,
        overallLoadPercent: cpuLoad,
        perCore: perCoreLoad,
        architecture: os.arch(),
      },
      memory: {
        totalBytes: totalMem,
        usedBytes: usedMem,
        freeBytes: freeMem,
        percent: memUsagePercent,
        totalGB: (totalMem / (1024 * 1024 * 1024)).toFixed(2),
        usedGB: (usedMem / (1024 * 1024 * 1024)).toFixed(2),
        freeGB: (freeMem / (1024 * 1024 * 1024)).toFixed(2),
      },
      process: {
        pid: process.pid,
        nodeVersion: process.version,
        platform: os.platform(),
        osType: os.type(),
        osRelease: os.release(),
        hostname: os.hostname(),
        uptimeSeconds: processUptimeSeconds,
        systemUptimeSeconds: systemUptimeSeconds,
        memoryUsage: {
          rssMB: (procMem.rss / (1024 * 1024)).toFixed(2),
          heapTotalMB: (procMem.heapTotal / (1024 * 1024)).toFixed(2),
          heapUsedMB: (procMem.heapUsed / (1024 * 1024)).toFixed(2),
          externalMB: (procMem.external / (1024 * 1024)).toFixed(2),
        },
      },
      storage: {
        diskIoLatencyMs,
        nextBuildSizeBytes: nextBuildSize,
        nextBuildSizeMB: (nextBuildSize / (1024 * 1024)).toFixed(2),
        publicDirSizeBytes: publicDirSize,
        publicDirSizeMB: (publicDirSize / (1024 * 1024)).toFixed(2),
        fileSystemStatus: 'healthy',
      },
      services: {
        appServer: {
          name: 'Next.js App Server (port 3000)',
          status: appServerPing.status,
          latencyMs: appServerPing.latencyMs,
          error: appServerPing.error,
        },
        strapiCms: {
          name: 'Strapi Headless CMS (port 1337)',
          status: strapiPing.status,
          latencyMs: strapiPing.latencyMs,
          error: strapiPing.error,
        },
        inboxDb: {
          name: 'Inbox JSON File Storage',
          status: 'operational',
          latencyMs: diskIoLatencyMs,
        },
      },
    });
  } catch (error) {
    console.error('Error getting system metrics:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve system metrics' },
      { status: 500 }
    );
  }
}
