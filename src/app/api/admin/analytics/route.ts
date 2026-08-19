import { NextResponse } from 'next/server';
import { getInboxMessages } from '@/lib/inbox-store';
import { getVisitorEvents, getActiveSessions } from '@/lib/visitor-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const messages = getInboxMessages();
    const events = getVisitorEvents();
    const activeSessions = getActiveSessions();

    const newInquiries = messages.filter((m) => m.status === 'new').length;
    const bookingsCount = messages.filter((m) => m.type === 'booking').length;

    // Real stats
    const pageviews = events.filter((e) => e.type === 'pageview');
    const resumeDownloads = events.filter(
      (e) => e.type === 'resume_download'
    ).length;
    const chatQueries = events.filter((e) => e.type === 'chat_query');
    const projectClicks = events.filter(
      (e) => e.type === 'project_click'
    ).length;
    const socialClicks = events.filter((e) => e.type === 'social_click').length;

    // Unique IPs / Visitors
    const uniqueIps = new Set(
      events.map((e) => e.ip || e.details?.sessionId).filter(Boolean)
    );
    const uniqueVisitors = uniqueIps.size || (pageviews.length > 0 ? 1 : 0);

    // Dynamic 7-day trend from real events
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    const trafficTrend = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(now.getDate() - (6 - i));
      const dayStr = d.toISOString().split('T')[0];
      const dayName = days[d.getDay()];

      const dayEvents = events.filter((e) => e.timestamp?.startsWith(dayStr));
      const dayViews = dayEvents.filter((e) => e.type === 'pageview').length;
      const dayChats = dayEvents.filter((e) => e.type === 'chat_query').length;
      const dayVisitors = new Set(dayEvents.map((e) => e.ip).filter(Boolean))
        .size;

      return {
        day: dayName,
        views: dayViews,
        visitors: dayVisitors,
        chats: dayChats,
      };
    });

    // Real Country aggregation
    const countryMap: Record<string, number> = {};
    events.forEach((e) => {
      const c = e.country || 'India';
      countryMap[c] = (countryMap[c] || 0) + 1;
    });
    const totalCountryEvents = events.length || 1;
    const topCountries = Object.entries(countryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([country, count]) => ({
        country,
        code: country === 'India' ? 'IN' : 'GL',
        visitors: count,
        percent: Math.round((count / totalCountryEvents) * 100),
      }));

    // Real Device breakdown
    const deviceMap: Record<string, number> = {
      Desktop: 0,
      Mobile: 0,
      Tablet: 0,
    };
    events.forEach((e) => {
      const dev = e.device || 'Desktop';
      deviceMap[dev] = (deviceMap[dev] || 0) + 1;
    });
    const totalDeviceCount =
      deviceMap.Desktop + deviceMap.Mobile + deviceMap.Tablet || 1;
    const deviceBreakdown = [
      {
        device: 'Desktop / Laptop',
        percentage: Math.round(
          (deviceMap.Desktop / totalDeviceCount) * 100 || 0
        ),
        count: deviceMap.Desktop,
      },
      {
        device: 'Mobile',
        percentage: Math.round(
          (deviceMap.Mobile / totalDeviceCount) * 100 || 0
        ),
        count: deviceMap.Mobile,
      },
      {
        device: 'Tablet',
        percentage: Math.round(
          (deviceMap.Tablet / totalDeviceCount) * 100 || 0
        ),
        count: deviceMap.Tablet,
      },
    ];

    // Real Chat Questions (Latest 8)
    const recentChatQueries = chatQueries.slice(0, 8).map((q) => ({
      query: q.details?.query || 'General Portfolio Inquiry',
      time: q.timestamp,
    }));

    // Real Conversion rate: (messages + bookings + resumeDownloads) / uniqueVisitors
    const conversionEvents = messages.length + resumeDownloads;
    const conversionRate =
      uniqueVisitors > 0
        ? ((conversionEvents / uniqueVisitors) * 100).toFixed(1) + '%'
        : '0.0%';

    return NextResponse.json({
      metrics: {
        totalPageViews: pageviews.length,
        uniqueVisitors,
        resumeDownloads,
        aiChatSessions: chatQueries.length,
        totalInquiries: messages.length,
        newInquiries,
        bookingsCount,
        activeNow: activeSessions.length,
        projectClicks,
        socialClicks,
        conversionRate,
      },
      activeSessions,
      trafficTrend,
      topCountries:
        topCountries.length > 0
          ? topCountries
          : [
              {
                country: 'India',
                code: 'IN',
                visitors: pageviews.length || 0,
                percent: 100,
              },
            ],
      deviceBreakdown,
      recentChatQueries,
      recentEvents: events.slice(0, 25),
    });
  } catch (error) {
    console.error('Error fetching real analytics:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve analytics' },
      { status: 500 }
    );
  }
}
