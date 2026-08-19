import { NextRequest, NextResponse } from 'next/server';
import { addInboxMessage } from '@/lib/inbox-store';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, service, phone, type } = await request.json();

    if (
      !name ||
      typeof name !== 'string' ||
      !email ||
      typeof email !== 'string' ||
      !message ||
      typeof message !== 'string'
    ) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 254 || message.length > 5000) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Persist to Admin Inbox
    try {
      addInboxMessage({
        name,
        email,
        message,
        type: type === 'booking' ? 'booking' : 'contact',
        meta: {
          service: typeof service === 'string' ? service : undefined,
          phone: typeof phone === 'string' ? phone : undefined,
        },
      });
    } catch (saveErr) {
      console.error('Failed to save to inbox store:', saveErr);
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioWhatsAppFrom = process.env.TWILIO_WHATSAPP_FROM;
    const myWhatsAppTo = process.env.WHATSAPP_TO;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    const emailSubject = `Portfolio Contact: ${name}`;
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `;

    if (resendApiKey) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: ['nikhilcool974@gmail.com'],
          reply_to: email,
          subject: emailSubject,
          html: emailHtml,
        }),
      });

      if (!emailResponse.ok) {
        console.error('Resend email failed:', emailResponse.status);
      }
    }

    if (
      twilioAccountSid &&
      twilioAuthToken &&
      twilioWhatsAppFrom &&
      myWhatsAppTo
    ) {
      const whatsappMessage = `*New Contact from Portfolio*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;

      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
      const auth = Buffer.from(
        `${twilioAccountSid}:${twilioAuthToken}`
      ).toString('base64');

      await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: twilioWhatsAppFrom,
          To: myWhatsAppTo,
          Body: whatsappMessage,
        }),
      });
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
