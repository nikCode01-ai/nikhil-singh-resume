import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    console.log('Received contact form submission:', { name, email, message });

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioWhatsAppFrom = process.env.TWILIO_WHATSAPP_FROM;
    const myWhatsAppTo = process.env.WHATSAPP_TO;

    console.log('Environment check:', {
      hasResendKey: !!resendApiKey,
      resendKeyPrefix: resendApiKey?.substring(0, 10),
      hasTwilio: !!twilioAccountSid,
    });

    const emailSubject = `Portfolio Contact: ${name}`;
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    // Send Email using Resend
    let emailSent = false;
    if (resendApiKey) {
      console.log('Attempting to send email with Resend...');

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

      const emailResult = await emailResponse.text();
      console.log('Resend response:', emailResponse.status, emailResult);

      if (emailResponse.ok) {
        emailSent = true;
      } else {
        console.error('Resend error:', emailResult);
      }
    } else {
      console.log('No RESEND_API_KEY found');
    }

    // Send WhatsApp notification using Twilio
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
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
