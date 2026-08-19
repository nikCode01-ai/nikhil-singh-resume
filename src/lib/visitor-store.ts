import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export interface VisitorEvent {
  id: string;
  type:
    | 'pageview'
    | 'resume_download'
    | 'project_click'
    | 'social_click'
    | 'chat_query'
    | 'section_view'
    | 'form_intent'
    | 'contact_submit';
  timestamp: string;
  path?: string;
  ip?: string;
  city?: string;
  country?: string;
  countryCode?: string;
  company?: string;
  device?: string;
  browser?: string;
  os?: string;
  details?: Record<string, unknown>;
}

export interface VisitorSession {
  sessionId: string;
  lastActive: string;
  path: string;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
}

const TRACKER_FILE_DIR = join(process.cwd(), 'docs');
const EVENTS_FILE = join(TRACKER_FILE_DIR, 'VISITOR_EVENTS.json');
const SESSIONS_FILE = join(TRACKER_FILE_DIR, 'ACTIVE_SESSIONS.json');

export function getVisitorEvents(): VisitorEvent[] {
  try {
    if (!existsSync(TRACKER_FILE_DIR)) {
      mkdirSync(TRACKER_FILE_DIR, { recursive: true });
    }
    if (!existsSync(EVENTS_FILE)) {
      writeFileSync(EVENTS_FILE, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const raw = readFileSync(EVENTS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error reading visitor events:', error);
    return [];
  }
}

export function logVisitorEvent(
  event: Omit<VisitorEvent, 'id' | 'timestamp'>
): VisitorEvent {
  const events = getVisitorEvents();
  const newEvent: VisitorEvent = {
    id: `ev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    ...event,
  };
  events.unshift(newEvent);

  // Keep last 1000 real events
  const trimmed = events.slice(0, 1000);
  try {
    writeFileSync(EVENTS_FILE, JSON.stringify(trimmed, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing visitor event:', err);
  }
  return newEvent;
}

export function updateActiveSession(session: VisitorSession) {
  try {
    if (!existsSync(TRACKER_FILE_DIR)) {
      mkdirSync(TRACKER_FILE_DIR, { recursive: true });
    }
    let sessions: VisitorSession[] = [];
    if (existsSync(SESSIONS_FILE)) {
      const raw = readFileSync(SESSIONS_FILE, 'utf-8');
      sessions = JSON.parse(raw);
      if (!Array.isArray(sessions)) sessions = [];
    }

    // Filter out inactive sessions (> 3 minutes ago)
    const activeThreshold = Date.now() - 3 * 60 * 1000;
    sessions = sessions.filter(
      (s) =>
        new Date(s.lastActive).getTime() > activeThreshold &&
        s.sessionId !== session.sessionId
    );
    sessions.push(session);

    writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error updating active session:', err);
  }
}

export function getActiveSessions(): VisitorSession[] {
  try {
    if (!existsSync(SESSIONS_FILE)) return [];
    const raw = readFileSync(SESSIONS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const activeThreshold = Date.now() - 3 * 60 * 1000;
    return parsed.filter(
      (s) => new Date(s.lastActive).getTime() > activeThreshold
    );
  } catch {
    return [];
  }
}
