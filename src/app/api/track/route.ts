import { NextRequest, NextResponse } from 'next/server';
import { logVisitorEvent, updateActiveSession } from '@/lib/visitor-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, path = '/', sessionId, details = {} } = body;

    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0].trim() || realIp || '127.0.0.1';

    // Geo headers (works automatically on Vercel/Cloudflare/AWS)
    const country =
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      (ip === '127.0.0.1' || ip === '::1' ? 'Localhost (Dev)' : 'India');
    const city =
      request.headers.get('x-vercel-ip-city') ||
      (ip === '127.0.0.1' || ip === '::1' ? 'Local System' : 'Agra/Noida');

    // Simple device detection
    let device = 'Desktop';
    if (/mobile/i.test(userAgent)) device = 'Mobile';
    else if (/ipad|tablet/i.test(userAgent)) device = 'Tablet';

    let browser = 'Chrome';
    if (/edg/i.test(userAgent)) browser = 'Edge';
    else if (/firefox/i.test(userAgent)) browser = 'Firefox';
    else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent))
      browser = 'Safari';

    if (sessionId) {
      updateActiveSession({
        sessionId,
        lastActive: new Date().toISOString(),
        path,
        country,
        city,
        device,
        browser,
      });
    }

    if (type) {
      const event = logVisitorEvent({
        type,
        path,
        ip,
        city,
        country,
        device,
        browser,
        details,
      });
      return NextResponse.json({ success: true, event });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
