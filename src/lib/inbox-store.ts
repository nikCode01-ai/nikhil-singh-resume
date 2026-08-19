import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export interface InboxMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  type: 'contact' | 'booking' | 'chat_inquiry' | 'quote';
  status: 'new' | 'read' | 'replied' | 'archived';
  timestamp: string;
  meta?: {
    date?: string;
    time?: string;
    service?: string;
    phone?: string;
    budget?: string;
  };
}

const INBOX_FILE_DIR = join(process.cwd(), 'docs');
const INBOX_FILE = join(INBOX_FILE_DIR, 'INBOX_MESSAGES.json');

const INITIAL_MESSAGES: InboxMessage[] = [
  {
    id: 'msg-101',
    name: 'Sarah Jenkins',
    email: 'sarah.j@traveltech-group.com',
    subject: 'Aviation NDC Booking Engine Integration Project',
    message:
      'Hello Nikhil, we saw your NDC Terminal project with American and United Airlines APIs. We are looking for a senior consultant to lead our multi-airline aggregation backend.',
    type: 'contact',
    status: 'new',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    meta: {
      budget: '$8,000 - $15,000',
      service: 'Airline NDC Integration',
    },
  },
  {
    id: 'msg-102',
    name: 'David Miller',
    email: 'david@fintechspark.io',
    subject: 'Interview for Senior Fullstack & Next.js Role',
    message:
      'Hi Nikhil, your portfolio and production metrics (99.9% uptime, microservices) are very impressive. Can we schedule a 30-minute technical discussion this week?',
    type: 'booking',
    status: 'read',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    meta: {
      date: '2026-08-22',
      time: '04:00 PM IST',
      service: 'Technical Interview',
    },
  },
  {
    id: 'msg-103',
    name: 'Elena Rostova',
    email: 'elena@luxurystays.ch',
    subject: 'High-Performance Event Ticketing Web App',
    message:
      'We need a high-concurrency ticketing portal similar to Panama Kosher Fest 2026. Looking for your availability for a 2-month contract.',
    type: 'contact',
    status: 'replied',
    timestamp: new Date(Date.now() - 3600000 * 72).toISOString(),
    meta: {
      budget: 'Monthly Retainer ₹45,000',
      service: 'Web App Development',
    },
  },
];

export function getInboxMessages(): InboxMessage[] {
  try {
    if (!existsSync(INBOX_FILE_DIR)) {
      mkdirSync(INBOX_FILE_DIR, { recursive: true });
    }

    if (!existsSync(INBOX_FILE)) {
      writeFileSync(
        INBOX_FILE,
        JSON.stringify(INITIAL_MESSAGES, null, 2),
        'utf-8'
      );
      return INITIAL_MESSAGES;
    }

    const raw = readFileSync(INBOX_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_MESSAGES;
  } catch (error) {
    console.error('Error reading inbox messages:', error);
    return INITIAL_MESSAGES;
  }
}

export function saveInboxMessages(messages: InboxMessage[]): boolean {
  try {
    if (!existsSync(INBOX_FILE_DIR)) {
      mkdirSync(INBOX_FILE_DIR, { recursive: true });
    }
    writeFileSync(INBOX_FILE, JSON.stringify(messages, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving inbox messages:', error);
    return false;
  }
}

export function addInboxMessage(
  msg: Omit<InboxMessage, 'id' | 'timestamp' | 'status'> & {
    status?: InboxMessage['status'];
  }
): InboxMessage {
  const messages = getInboxMessages();
  const newMessage: InboxMessage = {
    id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    status: msg.status || 'new',
    ...msg,
  };

  messages.unshift(newMessage);
  saveInboxMessages(messages);
  return newMessage;
}

export function updateInboxMessageStatus(
  id: string,
  status: InboxMessage['status']
): boolean {
  const messages = getInboxMessages();
  const index = messages.findIndex((m) => m.id === id);
  if (index === -1) return false;

  messages[index].status = status;
  return saveInboxMessages(messages);
}

export function deleteInboxMessage(id: string): boolean {
  const messages = getInboxMessages();
  const filtered = messages.filter((m) => m.id !== id);
  if (filtered.length === messages.length) return false;

  return saveInboxMessages(filtered);
}
