export interface ProjectSlug {
  id: string;
  slug: string;
  name: string;
  category: "app-design" | "website-design" | "dashboard" | "wireframe" | "repository";
  tags: string[];
  description: string;
  longDescription: string;
  image: string;
  url?: string;
  githubUrl?: string;
  demoUrl?: string;
  date: string;
  tech: string[];
  features: string[];
  impact: string[];
  status: "completed" | "in-progress" | "planned";
  client?: string;
  duration?: string;
  teamSize?: string;
  role: string;
  methodologies: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  testimonials?: Array<{
    text: string;
    author: string;
    role: string;
  }>;
  metrics?: Array<{
    label: string;
    value: string;
    improvement?: string;
  }>;
}

export const projectSlugs: ProjectSlug[] = [
  {
    id: "ndc-terminal",
    slug: "ndc-terminal-airline-booking-system",
    name: "NDC Terminal",
    category: "app-design",
    tags: ["UI/UX Design", "App Design", "Backend", "Real-time Systems"],
    description: "A cryptic command-line airline booking system for travel agents enabling full booking flows in under 30 seconds using short commands.",
    longDescription: "The NDC Terminal is a revolutionary airline booking system that transforms complex flight booking processes into simple, fast command-line operations. Built for travel agents, this system integrates directly with major airline NDC APIs to provide real-time flight search, booking, and management capabilities with unprecedented speed and efficiency.",
    image: "/images/flightbooking.png",
    date: "2024",
    tech: ["Fastify", "TypeScript", "React", "WebSockets", "PostgreSQL", "PM2", "SOAP/XML", "NDC APIs"],
    features: [
      "Command-line interface for rapid booking",
      "Real-time flight search and booking",
      "Multi-airline integration",
      "WebSocket-based real-time updates",
      "Command history and shortcuts",
      "Error handling and recovery",
      "Automated booking confirmations"
    ],
    impact: [
      "Reduced booking time from 5-10 minutes to under 30 seconds",
      "Handles 1000+ daily bookings",
      "99.9% system uptime",
      "50% reduction in agent training time"
    ],
    status: "completed",
    duration: "6 months",
    teamSize: "3 developers",
    role: "Lead Developer & Architect",
    methodologies: ["Agile", "Scrum", "Test-Driven Development"],
    challenges: [
      "Complex NDC API integration across multiple airlines",
      "Real-time data synchronization",
      "Performance optimization for high-volume transactions",
      "Security compliance for payment processing"
    ],
    solutions: [
      "Modular architecture for easy airline integration",
      "WebSocket implementation for real-time updates",
      "Database optimization and caching strategies",
      "End-to-end encryption and secure payment gateways"
    ],
    results: [
      "Successfully integrated 3 direct airline APIs",
      "Processed 100K+ bookings with 99.9% success rate",
      "Achieved sub-500ms response times",
      "Reduced operational costs by 40%"
    ],
    metrics: [
      { label: "Booking Speed", value: "30 seconds", improvement: "95% faster" },
      { label: "Daily Transactions", value: "1000+", improvement: "300% increase" },
      { label: "System Uptime", value: "99.9%", improvement: "Industry leading" },
      { label: "User Satisfaction", value: "4.8/5", improvement: "Significant improvement" }
    ]
  },
  {
    id: "panama-kosher-fest",
    slug: "panama-kosher-fest-2026-event-platform",
    name: "Panama Kosher Fest 2026",
    category: "website-design",
    tags: ["Event Management", "Real-time Booking", "Next.js", "NDC Integration"],
    description: "Next.js event platform with integrated real-time flight booking using NDC APIs.",
    longDescription: "A comprehensive event management platform for the Panama Kosher Fest 2026, featuring seamless integration of event registration, hotel bookings, and real-time flight search. The platform leverages modern web technologies and NDC APIs to provide attendees with a one-stop solution for their event travel needs.",
    image: "/images/panamakosherfest.png",
    url: "https://panamakosherfest.com",
    date: "January 20, 2026",
    tech: ["Next.js 16", "React", "TypeScript", "SSE", "PM2", "NDC APIs", "Tailwind CSS"],
    features: [
      "Event registration and ticketing",
      "Hotel booking integration",
      "Real-time flight search using Server-Sent Events",
      "Advanced filtering (airlines, stops, price, time, duration)",
      "In-memory cache (7-day TTL, ~60% hit rate)",
      "Responsive design for all devices",
      "Multi-language support"
    ],
    impact: [
      "Streamlined event registration process",
      "Integrated travel booking reducing user friction",
      "Real-time updates improving user experience",
      "60% cache hit rate reducing API costs"
    ],
    status: "completed",
    client: "Panama Kosher Fest Committee",
    duration: "3 months",
    teamSize: "2 developers",
    role: "Full Stack Developer",
    methodologies: ["Agile", "Rapid Prototyping"],
    challenges: [
      "Real-time flight data integration",
      "Complex filtering and search requirements",
      "Performance optimization for high traffic",
      "Multi-language implementation"
    ],
    solutions: [
      "Server-Sent Events for real-time updates",
      "Advanced search algorithms with caching",
      "CDN implementation and lazy loading",
      "i18n framework integration"
    ],
    results: [
      "Successful launch with 5000+ registrations",
      "40% reduction in booking abandonment",
      "2-second average page load time",
      "95% user satisfaction rate"
    ],
    metrics: [
      { label: "Registrations", value: "5000+", improvement: "Exceeded target" },
      { label: "Page Load Time", value: "2 seconds", improvement: "60% faster" },
      { label: "User Engagement", value: "85%", improvement: "Significant increase" },
      { label: "Booking Conversion", value: "40%", improvement: "Industry leading" }
    ]
  },
  {
    id: "fresh-kosher-cruises",
    slug: "fresh-kosher-cruises-marketing-platform",
    name: "Fresh Kosher Cruises",
    category: "dashboard",
    tags: ["Marketing", "Lead Generation", "Booking Forms", "Analytics"],
    description: "Static marketing & lead-generation website for kosher cruise dining experiences.",
    longDescription: "A comprehensive marketing platform for Fresh Kosher Cruises, designed to generate leads and provide information about kosher cruise dining experiences. The platform features multi-step booking forms, cruise-specific landing pages, and integrated analytics to track campaign performance.",
    image: "/images/freshkosher.png",
    date: "2023",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap 5", "jQuery", "Google Apps Script", "Google Sheets"],
    features: [
      "Multi-step booking forms",
      "Cruise-wise landing pages",
      "Mattermost notifications",
      "Honeypot spam protection",
      "IP geo-tracking",
      "Lead management system",
      "Analytics dashboard"
    ],
    impact: [
      "Increased lead generation by 200%",
      "Reduced spam submissions by 95%",
      "Improved lead quality and conversion rates",
      "Streamlined booking process"
    ],
    status: "completed",
    client: "Fresh Kosher Cruises",
    duration: "2 months",
    teamSize: "1 developer",
    role: "Full Stack Developer",
    methodologies: ["Waterfall", "Rapid Development"],
    challenges: [
      "Spam prevention in forms",
      "Lead management automation",
      "Mobile responsiveness",
      "Integration with existing systems"
    ],
    solutions: [
      "Honeypot technique and CAPTCHA integration",
      "Google Apps Script automation",
      "Bootstrap responsive framework",
      "API integration with Mattermost"
    ],
    results: [
      "200% increase in qualified leads",
      "95% reduction in spam submissions",
      "Mobile traffic increased by 150%",
      "Lead conversion rate improved by 60%"
    ],
    metrics: [
      { label: "Lead Generation", value: "200%", improvement: "3x increase" },
      { label: "Spam Reduction", value: "95%", improvement: "Significant improvement" },
      { label: "Mobile Traffic", value: "150%", improvement: "Major increase" },
      { label: "Conversion Rate", value: "60%", improvement: "Above industry average" }
    ]
  }
];

export function getProjectBySlug(slug: string): ProjectSlug | undefined {
  return projectSlugs.find(project => project.slug === slug);
}

export function getProjectsByCategory(category: string): ProjectSlug[] {
  return projectSlugs.filter(project => project.category === category);
}

export function getAllProjectSlugs(): string[] {
  return projectSlugs.map(project => project.slug);
}

export function getRelatedProjects(currentProject: ProjectSlug, limit: number = 3): ProjectSlug[] {
  return projectSlugs
    .filter(project => project.id !== currentProject.id)
    .filter(project => project.category === currentProject.category || 
            project.tech.some(tech => currentProject.tech.includes(tech)))
    .slice(0, limit);
}
