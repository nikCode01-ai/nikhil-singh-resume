import { NextResponse } from 'next/server';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface Phase {
  id: string;
  name: string;
  status: 'done' | 'in-progress' | 'pending' | 'error';
  progress: number;
  description: string;
  files: string[];
  lastModified: string;
}

interface DashboardData {
  phases: Phase[];
  requirements: string;
  logs: string[];
  summary: {
    totalPhases: number;
    completed: number;
    inProgress: number;
    pending: number;
    overallProgress: number;
  };
}

function parsePhasesFile(content: string): Phase[] {
  const phases: Phase[] = [];
  const sections = content.split(/^## /m).filter(Boolean);

  for (const section of sections) {
    const lines = section.split('\n');
    const header = lines[0]?.trim() || '';

    // Match phase headers like "Phase 1: Chatbot AI Integration" or "Phase 3: Hindi Docx → English MD Conversion"
    const phaseMatch = header.match(/Phase\s+(\d+):\s*(.+)/i);
    if (!phaseMatch) continue;

    const id = `phase-${phaseMatch[1]}`;
    const name = phaseMatch[2].trim();

    // Find status
    let status: Phase['status'] = 'pending';
    let progress = 0;

    const statusLine = section.match(/Status:\s*(.+)/i);
    if (statusLine) {
      const s = statusLine[1].toLowerCase();
      if (s.includes('done') || s.includes('✅')) {
        status = 'done';
        progress = 100;
      } else if (s.includes('progress') || s.includes('🔄')) {
        status = 'in-progress';
        progress = 50;
      } else if (s.includes('pending') || s.includes('⏳')) {
        status = 'pending';
        progress = 0;
      } else if (s.includes('error') || s.includes('❌')) {
        status = 'error';
        progress = 0;
      }
    }

    // Count steps/tasks for progress
    const stepMatches = section.match(/\|\s*\d+\s*\|/g) || [];
    const doneSteps = (section.match(/✅/g) || []).length;
    const totalSteps = stepMatches.length || 1;
    if (status !== 'done' && status !== 'error') {
      progress = Math.round((doneSteps / totalSteps) * 100);
    }

    // Find description (first paragraph after header)
    const descMatch = section.match(/\*\*Goal\*\*:\s*(.+)/i);
    const description = descMatch?.[1]?.trim() || name;

    // Find files mentioned
    const fileMatches = section.match(/`([^`]+\.(tsx?|css|json|md))`/g) || [];
    const files = [...new Set(fileMatches.map((f) => f.replace(/`/g, '')))];

    // Find last modified from file system
    let lastModified = new Date().toISOString();
    if (files.length > 0) {
      try {
        const filePath = join(process.cwd(), files[0]);
        if (existsSync(filePath)) {
          lastModified = statSync(filePath).mtime.toISOString();
        }
      } catch {
        // ignore
      }
    }

    phases.push({
      id,
      name,
      status,
      progress,
      description,
      files,
      lastModified,
    });
  }

  return phases;
}

function getDocsInfo(): { name: string; size: string; lines: number }[] {
  try {
    const docsDir = join(process.cwd(), 'docs');
    const files = readdirSync(docsDir).filter(
      (f) => f.endsWith('.md') || f.endsWith('.docx')
    );

    return files.map((filename) => {
      const filePath = join(docsDir, filename);
      const stats = statSync(filePath);
      const size =
        stats.size < 1024
          ? `${stats.size} B`
          : `${(stats.size / 1024).toFixed(1)} KB`;

      let lines = 0;
      if (filename.endsWith('.md')) {
        lines = readFileSync(filePath, 'utf-8').split('\n').length;
      }

      return { name: filename, size, lines };
    });
  } catch {
    return [];
  }
}

function getRequirements(): string {
  try {
    const reqFile = join(process.cwd(), 'docs', 'REQUIREMENTS.md');
    if (existsSync(reqFile)) {
      return readFileSync(reqFile, 'utf-8');
    }
  } catch {
    // ignore
  }
  return '';
}

export async function GET() {
  try {
    const phasesFile = join(process.cwd(), 'phases.md');
    let phases: Phase[] = [];

    if (existsSync(phasesFile)) {
      const content = readFileSync(phasesFile, 'utf-8');
      phases = parsePhasesFile(content);
    }

    getDocsInfo();
    const requirements = getRequirements();

    const completed = phases.filter((p) => p.status === 'done').length;
    const inProgress = phases.filter((p) => p.status === 'in-progress').length;
    const pending = phases.filter((p) => p.status === 'pending').length;
    const overallProgress = phases.length
      ? Math.round(
          phases.reduce((acc, p) => acc + p.progress, 0) / phases.length
        )
      : 0;

    const data: DashboardData = {
      phases,
      requirements,
      logs: [],
      summary: {
        totalPhases: phases.length,
        completed,
        inProgress,
        pending,
        overallProgress,
      },
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load phases', details: String(error) },
      { status: 500 }
    );
  }
}
