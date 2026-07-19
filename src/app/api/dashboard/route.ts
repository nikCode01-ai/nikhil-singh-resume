import { NextResponse } from 'next/server';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

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

function getFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function parseDocFile(
  filename: string,
  content: string,
  stats: { size: number; mtime: Date }
): DocFile {
  const lines = content.split('\n').length;
  const title =
    content
      .split('\n')
      .find((l) => l.startsWith('# '))
      ?.replace('# ', '') || filename;
  const description =
    content
      .split('\n')
      .find((l) => l.startsWith('## '))
      ?.replace('## ', '') || '';

  const statusIcons = (content.match(/[✅❌⏳🟡🔴🟢]/g) || []).length;
  const passCount = (content.match(/✅/g) || []).length;
  const failCount = (content.match(/❌/g) || []).length;
  const pendingCount = (content.match(/⏳/g) || []).length;

  let status: DocFile['status'] = 'pass';
  let progress = 100;

  if (failCount > 0) {
    status = 'error';
    progress = Math.round((passCount / Math.max(statusIcons, 1)) * 100);
  } else if (pendingCount > 0) {
    status = 'pending';
    progress = Math.round((passCount / Math.max(statusIcons, 1)) * 100);
  } else if (passCount > 0) {
    status = 'pass';
    progress = 100;
  } else {
    status = 'warn';
    progress = 50;
  }

  const categoryMap: Record<string, string> = {
    '01': 'architecture',
    '02': 'performance',
    '03': 'accessibility',
    '04': 'seo',
    '05': 'issues',
    '06': 'tasks',
    '07': 'review',
    '08': 'testing',
    '09': 'planning',
    '10': 'ideas',
    '11': 'cleanup',
    '12': 'runner',
  };

  const prefix = filename.substring(0, 2);

  return {
    name: filename,
    slug: filename.replace('.md', ''),
    title,
    description,
    lines,
    size: getFileSize(stats.size),
    status,
    progress,
    category: categoryMap[prefix] || 'general',
    lastModified: stats.mtime.toISOString(),
  };
}

export async function GET() {
  try {
    const docsDir = join(process.cwd(), 'docs');
    const files = readdirSync(docsDir).filter((f) => f.endsWith('.md'));

    const docs: DocFile[] = files.sort().map((filename) => {
      const filePath = join(docsDir, filename);
      const content = readFileSync(filePath, 'utf-8');
      const stats = statSync(filePath);
      return parseDocFile(filename, content, stats);
    });

    const totalFiles = docs.length;
    const passCount = docs.filter((d) => d.status === 'pass').length;
    const errorCount = docs.filter((d) => d.status === 'error').length;
    const pendingCount = docs.filter((d) => d.status === 'pending').length;
    const warnCount = docs.filter((d) => d.status === 'warn').length;

    const overallProgress = Math.round(
      docs.reduce((acc, d) => acc + d.progress, 0) / totalFiles
    );

    return NextResponse.json({
      docs,
      summary: {
        totalFiles,
        passCount,
        errorCount,
        pendingCount,
        warnCount,
        overallProgress,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Failed to scan docs directory:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
