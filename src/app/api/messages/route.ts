import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

interface Message {
  id: string;
  from: 'user' | 'ai';
  content: string;
  timestamp: string;
  type: 'requirement' | 'question' | 'status' | 'reply';
}

const MESSAGES_FILE = join(process.cwd(), 'docs', 'MESSAGES.md');

function parseMessages(content: string): Message[] {
  const messages: Message[] = [];
  const blocks = content.split(/^---$/m).filter(Boolean);

  for (const block of blocks) {
    const idMatch = block.match(/ID:\s*(.+)/);
    const fromMatch = block.match(/From:\s*(.+)/);
    const typeMatch = block.match(/Type:\s*(.+)/);
    const timeMatch = block.match(/Time:\s*(.+)/);
    const contentMatch = block.match(/Content:\n([\s\S]+)/);

    if (idMatch && fromMatch && contentMatch) {
      messages.push({
        id: idMatch[1].trim(),
        from: (fromMatch[1].trim() as 'user' | 'ai') || 'user',
        content: contentMatch[1].trim(),
        timestamp: timeMatch?.[1]?.trim() || new Date().toISOString(),
        type: (typeMatch?.[1]?.trim() as Message['type']) || 'reply',
      });
    }
  }

  return messages;
}

function formatMessages(messages: Message[]): string {
  let content = '# Dashboard Messages\n\n';
  content +=
    '*This file is managed by the dashboard. Do not edit manually.*\n\n';

  for (const msg of messages) {
    content += `---\n`;
    content += `ID: ${msg.id}\n`;
    content += `From: ${msg.from}\n`;
    content += `Type: ${msg.type}\n`;
    content += `Time: ${msg.timestamp}\n`;
    content += `Content:\n${msg.content}\n\n`;
  }

  return content;
}

export async function GET() {
  try {
    let messages: Message[] = [];

    if (existsSync(MESSAGES_FILE)) {
      const content = readFileSync(MESSAGES_FILE, 'utf-8');
      messages = parseMessages(content);
    }

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Failed to read messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const adminToken = process.env.DASHBOARD_AUTH_TOKEN;

    if (!adminToken || authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { from, content, type = 'reply' } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    if (content.length > 10000) {
      return NextResponse.json(
        { error: 'Content too long' },
        { status: 400 }
      );
    }

    let messages: Message[] = [];

    if (existsSync(MESSAGES_FILE)) {
      const fileContent = readFileSync(MESSAGES_FILE, 'utf-8');
      messages = parseMessages(fileContent);
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      from: from || 'user',
      content,
      timestamp: new Date().toISOString(),
      type,
    };

    messages.push(newMessage);

    writeFileSync(MESSAGES_FILE, formatMessages(messages), 'utf-8');

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    console.error('Failed to save message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
