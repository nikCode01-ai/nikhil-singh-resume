import { NextRequest, NextResponse } from 'next/server';
import { addInboxMessage } from '@/lib/inbox-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      date,
      time,
      duration = '30 mins',
      topic,
      notes,
    } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: 'Name, email, date, and time are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Add to Inbox
    const message = addInboxMessage({
      name,
      email,
      subject: `Call Scheduled: ${topic || 'Portfolio Intro & Discussion'} (${date} @ ${time})`,
      message: `Topic: ${topic || 'Introductory Call'}\nDuration: ${duration}\nDate: ${date}\nTime: ${time}\nNotes: ${notes || 'No extra notes provided.'}`,
      type: 'booking',
      status: 'new',
      meta: {
        date,
        time,
        service: topic || 'Quick Intro Call',
      },
    });

    // Generate Google Calendar Link
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Call with Nikhil Singh - ${name}`
    )}&details=${encodeURIComponent(
      `Meeting with Nikhil Singh (Senior Full-Stack Developer).\nTopic: ${topic || 'Intro'}\nNotes: ${notes || ''}`
    )}&add=${encodeURIComponent(email)}`;

    return NextResponse.json({
      success: true,
      message: 'Meeting requested successfully!',
      booking: message,
      gcalUrl,
    });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
