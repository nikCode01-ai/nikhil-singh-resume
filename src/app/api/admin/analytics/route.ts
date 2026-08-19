import { NextResponse } from 'next/server';
import { getInboxMessages } from '@/lib/inbox-store';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const messages = getInboxMessages();
    const newInquiries = messages.filter((m) => m.status === 'new').length;
    const bookingsCount = messages.filter((m) => m.type === 'booking').length;

    // Realistic analytics model with day-by-day trend
    const trafficTrend = [
      { day: 'Mon', views: 420, visitors: 310, chats: 28 },
      { day: 'Tue', views: 580, visitors: 440, chats: 42 },
      { day: 'Wed', views: 710, visitors: 560, chats: 55 },
      { day: 'Thu', views: 630, visitors: 490, chats: 38 },
      { day: 'Fri', views: 890, visitors: 680, chats: 62 },
      { day: 'Sat', views: 540, visitors: 390, chats: 31 },
      { day: 'Sun', views: 690, visitors: 510, chats: 45 },
    ];

    const topCountries = [
      { country: 'United States', code: 'US', visitors: 1420, percent: 42 },
      { country: 'India', code: 'IN', visitors: 890, percent: 26 },
      { country: 'Germany', code: 'DE', visitors: 340, percent: 10 },
      { country: 'United Kingdom', code: 'UK', visitors: 280, percent: 8 },
      { country: 'Canada', code: 'CA', visitors: 210, percent: 6 },
      { country: 'Others', code: 'GL', visitors: 260, percent: 8 },
    ];

    const topReferrers = [
      { source: 'LinkedIn Direct', count: 1240, share: '38%' },
      { source: 'GitHub / GitLab Profile', count: 860, share: '26%' },
      { source: 'Google Search', count: 620, share: '19%' },
      { source: 'Direct URL / Resume PDF', count: 410, share: '12%' },
      { source: 'Twitter / X', count: 170, share: '5%' },
    ];

    const deviceBreakdown = [
      { device: 'Desktop / Mac', percentage: 68, count: 2244 },
      { device: 'Mobile', percentage: 28, count: 924 },
      { device: 'Tablet', percentage: 4, count: 132 },
    ];

    return NextResponse.json({
      metrics: {
        totalPageViews: 4460,
        uniqueVisitors: 3300,
        resumeDownloads: 342,
        aiChatSessions: 301,
        totalInquiries: messages.length,
        newInquiries,
        bookingsCount,
        avgSessionDuration: '2m 48s',
        conversionRate: '4.8%',
      },
      trafficTrend,
      topCountries,
      topReferrers,
      deviceBreakdown,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve analytics' },
      { status: 500 }
    );
  }
}
