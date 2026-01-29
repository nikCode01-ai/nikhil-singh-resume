export type BlogPostBodyBlock =
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string;
  date: string;
  readingTime: string;
  tags: string[];
  body: BlogPostBodyBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "real-time-airline-booking-ndc",
    title: "Building Real-Time Airline Booking Systems with NDC APIs",
    excerpt:
      "Learn how I built a command-line airline booking system that reduces booking time from 5-10 minutes to under 30 seconds using WebSocket architecture and direct NDC API integrations.",
    category: "App Design",
    image: "/images/flightbooking.png",
    date: "Jan 2026",
    readingTime: "6 min read",
    tags: ["NDC", "WebSockets", "Fastify", "PostgreSQL", "Real-time"],
    body: [
      {
        type: "paragraph",
        text: "Most airline booking tools are built for slow, click-heavy workflows. For travel agents, that friction is expensive: every extra minute is lost productivity, and every extra screen is a chance to make mistakes. I wanted a faster model—something closer to a terminal where skilled agents can complete full booking flows with short commands.",
      },
      { type: "heading", text: "The goal: speed without sacrificing correctness" },
      {
        type: "paragraph",
        text: "The key constraints were simple to state but hard to execute: booking had to be fast, consistent, and safe across multiple airline NDC implementations. Under the hood, NDC integrations can vary per airline, while the user experience must feel uniform.",
      },
      {
        type: "list",
        items: [
          "Sub-30-second end-to-end booking for common flows",
          "Real-time, multi-step conversational UX (without page reloads)",
          "Support both direct airline NDC and aggregator NDC",
          "Traceable steps for debugging and customer support",
        ],
      },
      { type: "heading", text: "Architecture that stays fast under load" },
      {
        type: "paragraph",
        text: "I designed a real-time pipeline where the UI stays connected to the backend through WebSockets. Commands get parsed, validated, executed, and streamed back as incremental updates so the agent always knows what is happening.",
      },
      {
        type: "list",
        items: [
          "React UI for terminal-like interactions",
          "WebSocket gateway for low-latency round trips",
          "Command parser → executor pipeline for deterministic behavior",
          "NDC client layer that normalizes airline differences",
          "PostgreSQL persistence for orders, passengers, tickets, and audit logs",
        ],
      },
      { type: "heading", text: "WebSockets vs SSE: why WebSockets won here" },
      {
        type: "paragraph",
        text: "SSE is excellent for one-way streaming, especially when the server pushes search results. But booking is interactive: the client sends commands, the server responds with prompts, and the agent may confirm or modify inputs mid-flow. WebSockets gave the cleanest two-way channel for a terminal UX.",
      },
      { type: "heading", text: "NDC integration lessons" },
      {
        type: "paragraph",
        text: "NDC is powerful, but every airline has nuances. The most important engineering decision was building a normalization layer so the rest of the system could behave consistently.",
      },
      {
        type: "list",
        items: [
          "Model the domain carefully: offers, orders, payments, ticketing, and after-sales",
          "Treat airline responses as untrusted input: validate and guard rails everywhere",
          "Make every step idempotent where possible to survive retries/timeouts",
          "Persist intermediate state so agents can resume without losing context",
        ],
      },
      { type: "heading", text: "Observability and reliability" },
      {
        type: "paragraph",
        text: "Real-time systems fail in new ways: partial responses, slow upstreams, and client disconnects. I added structured logging and correlation IDs per booking flow so every step can be traced end-to-end.",
      },
      {
        type: "list",
        items: [
          "Correlation IDs for each command execution",
          "Timeout budgets per external API call",
          "Clear error surfaces (what failed, where, and what to do next)",
          "PM2-based process management and safe restarts",
        ],
      },
      {
        type: "paragraph",
        text: "The result is a system that handles 1000+ daily bookings, keeps agents in a high-speed workflow, and still preserves the traceability needed for real-world support and operations.",
      },
    ],
  },
  {
    slug: "nextjs-event-platform-flight-booking",
    title: "Next.js Event Platforms with Integrated Flight Booking",
    excerpt:
      "A practical walkthrough of building an event platform (Panama Kosher Fest 2026) using Next.js 16, Server-Sent Events, and real-time flight search with filtering and caching.",
    category: "Dashboard",
    image: "/images/panamakosherfest.png",
    date: "Jan 2026",
    readingTime: "7 min read",
    tags: ["Next.js", "SSE", "Caching", "NDC", "UX"],
    body: [
      {
        type: "paragraph",
        text: "Event websites usually look simple from the outside: show dates, passes, hotels, and a booking form. But the moment you integrate real-time flight search and booking, the platform becomes a high-throughput system with UX constraints.",
      },
      { type: "heading", text: "Why SSE is perfect for real-time flight search" },
      {
        type: "paragraph",
        text: "Flight search is naturally streaming: the user wants to see early results quickly, then refine. Server-Sent Events (SSE) is ideal because the server can continuously push results over a single HTTP connection, while the client keeps rendering progressively.",
      },
      {
        type: "list",
        items: [
          "Faster perceived performance: first results appear immediately",
          "Simpler than WebSockets for one-way streams",
          "Works well with edge/CDN friendly infrastructure",
        ],
      },
      { type: "heading", text: "Filtering without re-running expensive searches" },
      {
        type: "paragraph",
        text: "A common trap is re-querying upstream providers on every filter change. Instead, I designed the pipeline so the initial search streams in offers, then filters run locally/in-memory on the server side, returning updated slices quickly.",
      },
      {
        type: "list",
        items: [
          "Airline/stops/price/time/duration filters",
          "Stable sorting with predictable tie-breakers",
          "Pagination without losing streamed context",
        ],
      },
      { type: "heading", text: "Caching strategy: 7-day TTL with a high hit rate" },
      {
        type: "paragraph",
        text: "Caching in travel is tricky because offers can change—but many searches are repeated (same route/date range). A short-lived but meaningful cache with a 7-day TTL and smart keys gave ~60% hit rate, reducing upstream load and improving responsiveness.",
      },
      {
        type: "paragraph",
        text: "Next.js App Router made it easy to keep the platform structure clean (event content pages, passes, hotels) while isolating real-time flight search as an interactive module.",
      },
      { type: "heading", text: "Takeaways" },
      {
        type: "list",
        items: [
          "Stream early results; don't block the UI waiting for perfect completeness",
          "Design the API so filters are cheap and predictable",
          "Cache aggressively but safely, and measure hit rate",
        ],
      },
    ],
  },
  {
    slug: "optimizing-content-platform-performance",
    title: "Optimizing Content Platforms for Performance",
    excerpt:
      "How I improved content-heavy websites with modern image strategy, caching, and rendering choices—resulting in large performance gains and better engagement.",
    category: "Website Design",
    image: "/images/businessmatters.png",
    date: "Dec 2025",
    readingTime: "5 min read",
    tags: ["Performance", "Core Web Vitals", "Images", "Caching"],
    body: [
      {
        type: "paragraph",
        text: "Content platforms succeed or fail on speed. If pages load slowly, users bounce—and ad/SEO performance drops with them. The interesting part is that performance is rarely one fix; it is a set of small, disciplined decisions across the stack.",
      },
      { type: "heading", text: "Start with measurement, not guesswork" },
      {
        type: "paragraph",
        text: "Before changing anything, I baseline key metrics: TTFB, LCP, CLS, and real-user behavior. This prevents optimizing the wrong thing and makes improvements provable.",
      },
      { type: "heading", text: "Image strategy usually delivers the biggest wins" },
      {
        type: "paragraph",
        text: "Large hero images and unoptimized thumbnails are common on news sites. Converting formats, generating responsive sizes, and loading images correctly usually improves LCP dramatically.",
      },
      {
        type: "list",
        items: [
          "Serve correct sizes (no 2MB images in 300px slots)",
          "Prefer modern formats when possible",
          "Lazy-load below-the-fold media",
          "Avoid layout shift by reserving space",
        ],
      },
      { type: "heading", text: "Caching and rendering choices" },
      {
        type: "paragraph",
        text: "For content pages, the goal is often a fast TTFB with stable HTML. Depending on the stack, that can mean smart page caching, edge caching, or pre-rendering. The biggest mistake is caching without clear invalidation rules.",
      },
      {
        type: "list",
        items: [
          "Cache the right layer: CDN, server, or database",
          "Invalidate by content updates, not by time alone",
          "Keep database queries predictable and indexed",
        ],
      },
      {
        type: "paragraph",
        text: "When these practices are applied consistently, content platforms can see meaningful performance gains (often 30-50%) and improved engagement because the site feels instant.",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
