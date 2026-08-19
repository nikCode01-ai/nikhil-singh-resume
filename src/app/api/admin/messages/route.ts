import { NextRequest, NextResponse } from 'next/server';
import {
  getInboxMessages,
  addInboxMessage,
  updateInboxMessageStatus,
  deleteInboxMessage,
} from '@/lib/inbox-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filterStatus = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase();

    let messages = getInboxMessages();

    if (filterStatus && filterStatus !== 'all') {
      messages = messages.filter((m) => m.status === filterStatus);
    }

    if (search) {
      messages = messages.filter(
        (m) =>
          m.name.toLowerCase().includes(search) ||
          m.email.toLowerCase().includes(search) ||
          m.message.toLowerCase().includes(search) ||
          (m.subject && m.subject.toLowerCase().includes(search))
      );
    }

    const unreadCount = getInboxMessages().filter(
      (m) => m.status === 'new'
    ).length;

    return NextResponse.json({
      messages,
      total: messages.length,
      unreadCount,
    });
  } catch (error) {
    console.error('Error fetching admin messages:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve messages' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !['new', 'read', 'replied', 'archived'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid ID or status' },
        { status: 400 }
      );
    }

    const success = updateInboxMessageStatus(id, status);
    if (!success) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id, status });
  } catch (error) {
    console.error('Error updating message status:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const success = deleteInboxMessage(id);
    if (!success) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, subject, type = 'contact', meta } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const newMessage = addInboxMessage({
      name,
      email,
      message,
      subject,
      type,
      meta,
      status: 'new',
    });

    return NextResponse.json(
      { success: true, message: newMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding message:', error);
    return NextResponse.json(
      { error: 'Failed to add message' },
      { status: 500 }
    );
  }
}
