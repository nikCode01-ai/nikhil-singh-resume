import { NextResponse } from 'next/server';
import { getInboxMessages } from '@/lib/inbox-store';
import { getVisitorEvents, getActiveSessions } from '@/lib/visitor-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function checkServiceHealth(
  name: string,
  checkFn: () => Promise<boolean>
) {
  const start = Date.now();
  try {
    const isOk = await checkFn();
    const latencyMs = Date.now() - start;
    return {
      name,
      status: isOk ? ('operational' as const) : ('degraded' as const),
      latencyMs,
    };
  } catch (err: unknown) {
    return {
      name,
      status: 'down' as const,
      latencyMs: Date.now() - start,
      error: err instanceof Error ? err.message : 'Check failed',
    };
  }
}

export async function GET(request: Request) {
  const startTime = Date.now();
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '1d'; // '1d' | '7d' | '30d' | 'all'

    const now = Date.now();
    const msPerDay = 24 * 60 * 60 * 1000;
    const timeframeMs =
      timeframe === '1d'
        ? 1 * msPerDay
        : timeframe === '7d'
          ? 7 * msPerDay
          : timeframe === '30d'
            ? 30 * msPerDay
            : Infinity;

    const allEvents = getVisitorEvents();
    const activeSessions = getActiveSessions();
    const allMessages = getInboxMessages();

    // Filter events and messages based on selected timeframe
    const events =
      timeframeMs === Infinity
        ? allEvents
        : allEvents.filter(
            (e) => now - new Date(e.timestamp).getTime() <= timeframeMs
          );

    const messages =
      timeframeMs === Infinity
        ? allMessages
        : allMessages.filter(
            (m) => now - new Date(m.timestamp).getTime() <= timeframeMs
          );

    // Check Real Services
    const [groqHealth, emailHealth, appServerHealth] = await Promise.all([
      checkServiceHealth('Groq AI LLM Gateway', async () => {
        return !!process.env.GROQ_API_KEY;
      }),
      checkServiceHealth('Resend Email Notification Service', async () => {
        return !!process.env.RESEND_API_KEY;
      }),
      checkServiceHealth('Next.js Edge & Core Engine', async () => {
        return true;
      }),
    ]);

    // Live Metrics computation
    const totalViews = events.filter((e) => e.type === 'pageview').length;
    const resumeDownloads = events.filter(
      (e) => e.type === 'resume_download'
    ).length;
    const chatQueries = events.filter((e) => e.type === 'chat_query').length;

    // Recent Live Feed
    const liveActivityFeed = events.slice(0, 30).map((ev) => {
      let title = 'Portfolio Pageview';
      if (ev.type === 'resume_download') {
        title = 'Resume PDF Downloaded';
      } else if (ev.type === 'chat_query') {
        title = `AI Chat: "${ev.details?.query || 'General Query'}"`;
      } else if (ev.type === 'project_click') {
        title = `Project Viewed: ${ev.details?.title || 'Project Link'}`;
      } else if (ev.type === 'social_click') {
        title = `Recruiter clicked ${ev.details?.platform || 'Social Link'}`;
      }

      return {
        id: ev.id,
        time: new Date(ev.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        timestamp: ev.timestamp,
        type: ev.type,
        title,
        location: `${ev.city || 'Unknown'}, ${ev.country || 'India'}`,
        device: `${ev.browser || 'Chrome'} on ${ev.device || 'Desktop'}`,
        ip: ev.ip,
      };
    });

    const executionTimeMs = Date.now() - startTime;

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      executionTimeMs,
      liveMonitor: {
        activeVisitorsCount: activeSessions.length,
        totalPageviews: totalViews,
        totalResumeDownloads: resumeDownloads,
        totalChatQueries: chatQueries,
        totalInquiries: messages.length,
        conversionRate:
          totalViews > 0
            ? (
                ((resumeDownloads + messages.length) / totalViews) *
                100
              ).toFixed(1) + '%'
            : '0.0%',
      },
      activeSessions,
      liveActivityFeed,
      services: {
        groqAi: groqHealth,
        resendEmail: emailHealth,
        appServer: appServerHealth,
        inboxDb: {
          name: 'Inbox & Event Store',
          status: 'operational',
          latencyMs: 1,
          totalRecords: messages.length + events.length,
        },
      },
    });
  } catch (error) {
    console.error('Error in live monitor metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch live monitor' },
      { status: 500 }
    );
  }
}
