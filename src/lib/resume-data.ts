export const person = {
  name: "Nikhil Singh",
  role: "Senior Full Stack Developer, GenAI Developer & Cloud Infrastructure Specialist",
  location: "Agra, Uttar Pradesh, India",
  phone: "+91 8532856980",
  email: "nikhilcool974@gmail.com",
  linkedinUrl: "https://linkedin.com/in/nikhil-code05",
  gitlabHandle: "@nikhilcool974",
  gitlabUrl: "https://gitlab.com/nikhilcool974",
};

export const professionalSummary =
  "Accomplished Full Stack Developer with 4+ years of experience building enterprise-grade web applications across aviation, travel, e-commerce, hospitality, and content platforms. Expert in Next.js, React, Node.js, Fastify, and Strapi. Specialized in real-time systems, WebSockets, SSE, and airline NDC API integrations. Also experienced in GenAI/LLM integrations (RAG, vector search, and workflow automation). Delivered 30+ production systems, managed cloud infrastructure with 99.9% uptime, and optimized performance by up to 50%.";

export const coreCompetencies = [
  "Full Stack Development",
  "Real-Time Systems",
  "NDC / GDS Integration",
  "WebSocket Architecture",
  "Cloud & Server Management",
  "REST / SOAP APIs",
  "Database Optimization",
  "DevOps & CI/CD",
];

export const technicalSkills = {
  Frontend: [
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "Next.js 16 (App Router)",
    "Tailwind CSS",
    "Bootstrap",
    "jQuery",
    "PWA",
    "SSE",
  ],
  Backend: [
    "Node.js",
    "Fastify",
    "Express",
    "Strapi CMS",
    "REST APIs",
    "SOAP/XML",
    "GraphQL",
    "Microservices",
    "WebSockets",
  ],
  Databases: [
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "BigQuery",
    "Redis",
    "Query Optimization",
  ],
  "Cloud & DevOps": [
    "AWS (EC2, S3, RDS, Lambda)",
    "PM2",
    "Docker",
    "Git",
    "GitLab CI/CD",
    "Linux",
    "Nginx",
    "Apache",
    "Plesk",
    "WHM",
    "Hostinger",
    "HostGator",
  ],
  "Travel & Aviation": [
    "NDC APIs",
    "American Airlines",
    "United Airlines",
    "Copa Airlines",
    "AirGateway (25+ airlines)",
    "GDS systems",
  ],
  "Analytics & Marketing": [
    "GA4",
    "Google Ads",
    "GTM",
    "Looker Studio",
    "Amazon PA-API",
    "SEO",
    "Google Apps Script",
  ],
};

export const experience = [
  {
    company: "Aalpha Media",
    location: "Agra",
    title: "Full Stack Developer & Technical Specialist",
    start: "Jan 2021",
    end: "Present",
    highlights: [
      "Built and shipped enterprise-grade systems across travel, aviation, hospitality, e-commerce, and content platforms.",
      "Designed real-time architectures using WebSockets and SSE for high-throughput workflows.",
      "Managed cloud infrastructure and deployments across 20+ servers with 99.9% uptime.",
    ],
  },
];

export const flagshipProject = {
  name: "NDC Terminal",
  description:
    "A cryptic command-line airline booking system for travel agents enabling full booking flows in under 30 seconds using short commands.",
  image: "/images/flightbooking.png",
  architecture:
    "React UI → WebSocket → Command Parser → Executor → NDC Clients → Airline APIs → PostgreSQL",
  supportedAirlines: [
    "American Airlines (Direct NDC – Production)",
    "United Airlines (Direct NDC – Production)",
    "Copa Airlines (Direct NDC – In Progress)",
    "25+ Airlines via AirGateway (Production)",
  ],
  tech: [
    "Fastify",
    "TypeScript",
    "React",
    "WebSockets",
    "PostgreSQL",
    "PM2",
    "SOAP/XML",
  ],
  impact: [
    "Reduced booking time from 5–10 minutes to under 30 seconds.",
    "Handles 1000+ daily bookings.",
  ],
};

export const featuredProjects = [
  {
    name: "Panama Kosher Fest 2026",
    url: "https://panamakosherfest.com",
    date: "January 20, 2026",
    image: "/images/panamakosherfest.png",
    description:
      "Next.js event platform with integrated real-time flight booking using NDC APIs.",
    features: [
      "Event pages, passes, hotels",
      "Real-time flight search using Server-Sent Events (SSE)",
      "Advanced filters (airlines, stops, price, time, duration)",
      "In-memory cache (7-day TTL, ~60% hit rate)",
    ],
    tech: ["Next.js 16", "React", "TypeScript", "SSE", "PM2", "NDC APIs", "Tailwind CSS"],
  },
  {
    name: "Fresh Kosher Cruises",
    image: "/images/freshkosher.png",
    description:
      "Static marketing & lead-generation website for kosher cruise dining experiences.",
    features: [
      "Multi-step booking forms",
      "Cruise-wise landing pages",
      "Mattermost notifications",
      "Honeypot spam protection",
      "IP geo-tracking",
    ],
    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap 5",
      "jQuery",
      "Google Apps Script",
      "Google Sheets",
    ],
  },
];

export const additionalProjects = [
  {
    name: "Fresh Kosher Cruises (FE & BE)",
    image: "/images/freshkosher.png",
    description: "Frontend + backend systems supporting lead capture and workflows.",
    role: "Developer",
  },
  {
    name: "invitationstreet",
    image: "/images/invitationstreet.png",
    description: "Invitation/landing-page experiences and supporting services.",
    role: "Developer",
  },
  {
    name: "dreamyinvite",
    image: "/images/dreamyinvites.png",
    description: "Invitation/landing-page experiences and supporting services.",
    role: "Developer",
  },
  {
    name: "muffleit (FE & BE)",
    image: "/images/muffleit.png",
    description: "Full-stack work across client and backend components.",
    role: "Developer",
  },
  {
    name: "barrymcguigan.com",
    image: "/images/barrymcguigan.png",
    description: "Content-focused website build and optimization.",
    role: "Developer",
  },
  {
    name: "businessmatters.net",
    image: "/images/businessmatters.png",
    description: "Content platform development and performance improvements.",
    role: "Developer",
  },
  {
    name: "agrosafpharmaceuticals (FE & BE)",
    image: "/images/agrosafpharmaceuticals.png",
    description: "Business website and supporting backend services.",
    role: "Developer",
  },
  {
    name: "laladecorators.com",
    image: "/images/laladecorators.png",
    description: "Business site build with modern responsive UI.",
    role: "Developer",
  },
  {
    name: "ultimatesportstrainer",
    image: "/images/ultimatesportstrainer.png",
    description: "Web platform implementation and enhancements.",
    role: "Developer",
  },
];

export const keyAchievements = [
  "Reduced airline booking time to under 30 seconds",
  "Integrated 3 direct airline NDC APIs + 25 via aggregator",
  "Delivered 30+ production systems",
  "Managed 20+ servers with 99.9% uptime",
  "Built real-time systems with sub-500ms responses",
  "Active GitLab contributor with 31+ repositories",
];

export const education = [
  {
    degree: "Bachelor of Technology (B.Tech) – Computer Science",
    school: "AKTU University, Uttar Pradesh",
  },
  {
    degree: "Diploma – Computer Science & Engineering",
    school: "GLA University, Mathura",
  },
];
