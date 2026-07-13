export interface ProjectSlug {
  id: string;
  slug: string;
  name: string;
  category:
    | 'app-design'
    | 'website-design'
    | 'dashboard'
    | 'wireframe'
    | 'repository';
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
  status: 'completed' | 'in-progress' | 'planned';
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
    id: 'ndc-terminal',
    slug: 'ndc-terminal-airline-booking-system',
    name: 'NDC Terminal',
    category: 'app-design',
    tags: ['UI/UX Design', 'App Design', 'Backend', 'Real-time Systems'],
    description:
      'A cryptic command-line airline booking system for travel agents enabling full booking flows in under 30 seconds using short commands.',
    longDescription:
      'The NDC Terminal is a revolutionary airline booking system that transforms complex flight booking processes into simple, fast command-line operations. Built for travel agents, this system integrates directly with major airline NDC APIs to provide real-time flight search, booking, and management capabilities with unprecedented speed and efficiency.',
    image: '/images/flightbooking.png',
    date: '2024',
    tech: [
      'Fastify',
      'TypeScript',
      'React',
      'WebSockets',
      'PostgreSQL',
      'PM2',
      'SOAP/XML',
      'NDC APIs',
    ],
    features: [
      'Command-line interface for rapid booking',
      'Real-time flight search and booking',
      'Multi-airline integration',
      'WebSocket-based real-time updates',
      'Command history and shortcuts',
      'Error handling and recovery',
      'Automated booking confirmations',
    ],
    impact: [
      'Reduced booking time from 5-10 minutes to under 30 seconds',
      'Handles 1000+ daily bookings',
      '99.9% system uptime',
      '50% reduction in agent training time',
    ],
    status: 'completed',
    duration: '6 months',
    teamSize: '3 developers',
    role: 'Lead Developer & Architect',
    methodologies: ['Agile', 'Scrum', 'Test-Driven Development'],
    challenges: [
      'Complex NDC API integration across multiple airlines',
      'Real-time data synchronization',
      'Performance optimization for high-volume transactions',
      'Security compliance for payment processing',
    ],
    solutions: [
      'Modular architecture for easy airline integration',
      'WebSocket implementation for real-time updates',
      'Database optimization and caching strategies',
      'End-to-end encryption and secure payment gateways',
    ],
    results: [
      'Successfully integrated 3 direct airline APIs',
      'Processed 100K+ bookings with 99.9% success rate',
      'Achieved sub-500ms response times',
      'Reduced operational costs by 40%',
    ],
    metrics: [
      {
        label: 'Booking Speed',
        value: '30 seconds',
        improvement: '95% faster',
      },
      {
        label: 'Daily Transactions',
        value: '1000+',
        improvement: '300% increase',
      },
      {
        label: 'System Uptime',
        value: '99.9%',
        improvement: 'Industry leading',
      },
      {
        label: 'User Satisfaction',
        value: '4.8/5',
        improvement: 'Significant improvement',
      },
    ],
  },
  {
    id: 'panama-kosher-fest',
    slug: 'panama-kosher-fest-2026-event-platform',
    name: 'Panama Kosher Fest 2026',
    category: 'website-design',
    tags: [
      'Event Management',
      'Real-time Booking',
      'Next.js',
      'NDC Integration',
    ],
    description:
      'Next.js event platform with integrated real-time flight booking using NDC APIs.',
    longDescription:
      'A comprehensive event management platform for the Panama Kosher Fest 2026, featuring seamless integration of event registration, hotel bookings, and real-time flight search. The platform leverages modern web technologies and NDC APIs to provide attendees with a one-stop solution for their event travel needs.',
    image: '/images/panamakosherfest.png',
    url: 'https://panamakosherfest.com',
    date: 'January 20, 2026',
    tech: [
      'Next.js 16',
      'React',
      'TypeScript',
      'SSE',
      'PM2',
      'NDC APIs',
      'Tailwind CSS',
    ],
    features: [
      'Event registration and ticketing',
      'Hotel booking integration',
      'Real-time flight search using Server-Sent Events',
      'Advanced filtering (airlines, stops, price, time, duration)',
      'In-memory cache (7-day TTL, ~60% hit rate)',
      'Responsive design for all devices',
      'Multi-language support',
    ],
    impact: [
      'Streamlined event registration process',
      'Integrated travel booking reducing user friction',
      'Real-time updates improving user experience',
      '60% cache hit rate reducing API costs',
    ],
    status: 'completed',
    client: 'Panama Kosher Fest Committee',
    duration: '3 months',
    teamSize: '2 developers',
    role: 'Full Stack Developer',
    methodologies: ['Agile', 'Rapid Prototyping'],
    challenges: [
      'Real-time flight data integration',
      'Complex filtering and search requirements',
      'Performance optimization for high traffic',
      'Multi-language implementation',
    ],
    solutions: [
      'Server-Sent Events for real-time updates',
      'Advanced search algorithms with caching',
      'CDN implementation and lazy loading',
      'i18n framework integration',
    ],
    results: [
      'Successful launch with 5000+ registrations',
      '40% reduction in booking abandonment',
      '2-second average page load time',
      '95% user satisfaction rate',
    ],
    metrics: [
      {
        label: 'Registrations',
        value: '5000+',
        improvement: 'Exceeded target',
      },
      {
        label: 'Page Load Time',
        value: '2 seconds',
        improvement: '60% faster',
      },
      {
        label: 'User Engagement',
        value: '85%',
        improvement: 'Significant increase',
      },
      {
        label: 'Booking Conversion',
        value: '40%',
        improvement: 'Industry leading',
      },
    ],
  },
  {
    id: 'fresh-kosher-cruises',
    slug: 'fresh-kosher-cruises-marketing-platform',
    name: 'Fresh Kosher Cruises',
    category: 'dashboard',
    tags: ['Marketing', 'Lead Generation', 'Booking Forms', 'Analytics'],
    description:
      'Static marketing & lead-generation website for kosher cruise dining experiences.',
    longDescription:
      'A comprehensive marketing platform for Fresh Kosher Cruises, designed to generate leads and provide information about kosher cruise dining experiences. The platform features multi-step booking forms, cruise-specific landing pages, and integrated analytics to track campaign performance.',
    image: '/images/freshkosher.png',
    date: '2023',
    tech: [
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap 5',
      'jQuery',
      'Google Apps Script',
      'Google Sheets',
    ],
    features: [
      'Multi-step booking forms',
      'Cruise-wise landing pages',
      'Mattermost notifications',
      'Honeypot spam protection',
      'IP geo-tracking',
      'Lead management system',
      'Analytics dashboard',
    ],
    impact: [
      'Increased lead generation by 200%',
      'Reduced spam submissions by 95%',
      'Improved lead quality and conversion rates',
      'Streamlined booking process',
    ],
    status: 'completed',
    client: 'Fresh Kosher Cruises',
    duration: '2 months',
    teamSize: '1 developer',
    role: 'Full Stack Developer',
    methodologies: ['Waterfall', 'Rapid Development'],
    challenges: [
      'Spam prevention in forms',
      'Lead management automation',
      'Mobile responsiveness',
      'Integration with existing systems',
    ],
    solutions: [
      'Honeypot technique and CAPTCHA integration',
      'Google Apps Script automation',
      'Bootstrap responsive framework',
      'API integration with Mattermost',
    ],
    results: [
      '200% increase in qualified leads',
      '95% reduction in spam submissions',
      'Mobile traffic increased by 150%',
      'Lead conversion rate improved by 60%',
    ],
    metrics: [
      { label: 'Lead Generation', value: '200%', improvement: '3x increase' },
      {
        label: 'Spam Reduction',
        value: '95%',
        improvement: 'Significant improvement',
      },
      { label: 'Mobile Traffic', value: '150%', improvement: 'Major increase' },
      {
        label: 'Conversion Rate',
        value: '60%',
        improvement: 'Above industry average',
      },
    ],
  },
  {
    id: 'fresh-kosher-cruises-fe-be',
    slug: 'fresh-kosher-cruises-full-stack',
    name: 'Fresh Kosher Cruises (Full Stack)',
    category: 'repository',
    tags: [
      'Full Stack',
      'Lead Management',
      'Booking System',
      'API Integration',
    ],
    description:
      'Frontend + backend systems supporting lead capture and workflows.',
    longDescription:
      'A complete full-stack implementation for Fresh Kosher Cruises, encompassing both frontend user interface and backend workflow management systems. The solution handles lead capture, automated notifications, and seamless integration with various third-party services to provide a comprehensive platform for cruise booking and customer management.',
    image: '/images/freshkosher.png',
    date: '2023',
    tech: [
      'Node.js',
      'Express',
      'MongoDB',
      'React',
      'Google Apps Script',
      'Mattermost API',
      'REST APIs',
    ],
    features: [
      'Frontend booking interface',
      'Backend workflow automation',
      'Lead management system',
      'Automated notifications',
      'API integrations',
      'Database management',
      'Admin dashboard',
    ],
    impact: [
      'Streamlined backend operations',
      'Improved data flow',
      'Better lead tracking',
      'Enhanced notification system',
    ],
    status: 'completed',
    duration: '4 months',
    teamSize: '1 developer',
    role: 'Full Stack Developer',
    methodologies: ['Agile', 'Full Stack Development'],
    challenges: [
      'Complex workflow management',
      'Multiple API integrations',
      'Data synchronization',
      'Real-time notifications',
    ],
    solutions: [
      'Modular backend architecture',
      'RESTful API design',
      'Webhook integrations',
      'Event-driven notifications',
    ],
    results: [
      'Reduced manual workload by 50%',
      'Improved data accuracy',
      'Faster response times',
      'Better customer experience',
    ],
  },
  {
    id: 'invitationstreet',
    slug: 'invitationstreet-landing-pages',
    name: 'Invitation Street',
    category: 'website-design',
    tags: [
      'Landing Pages',
      'Event Management',
      'Responsive Design',
      'Frontend',
    ],
    description: 'Invitation/landing-page experiences and supporting services.',
    longDescription:
      'A collection of beautifully designed invitation and landing page experiences for various events and occasions. The project focuses on creating visually stunning, responsive designs that provide excellent user experience across all devices. Includes supporting backend services for data collection and management.',
    image: '/images/invitationstreet.png',
    date: '2023',
    tech: [
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap 5',
      'jQuery',
      'PHP',
      'MySQL',
    ],
    features: [
      'Responsive landing pages',
      'Event-specific designs',
      'Form submissions',
      'Image galleries',
      'Mobile-optimized',
      'Fast loading times',
      'SEO friendly',
    ],
    impact: [
      'Increased engagement',
      'Better conversion rates',
      'Improved user experience',
      'Higher page speed scores',
    ],
    status: 'completed',
    duration: '2 months',
    teamSize: '1 developer',
    role: 'Developer',
    methodologies: ['Rapid Development', 'Responsive Design'],
    challenges: [
      'Multiple design variations',
      'Mobile responsiveness',
      'Performance optimization',
      'Cross-browser compatibility',
    ],
    solutions: [
      'Component-based design',
      'Mobile-first approach',
      'Image optimization',
      'Progressive enhancement',
    ],
    results: [
      '95+ mobile score on Lighthouse',
      'Increased form submissions by 40%',
      'Reduced bounce rate by 30%',
      'Positive user feedback',
    ],
  },
  {
    id: 'dreamyinvite',
    slug: 'dreamyinvite-event-invitations',
    name: 'Dreamy Invite',
    category: 'website-design',
    tags: ['Event Invitations', 'Landing Pages', 'UI/UX', 'Frontend'],
    description: 'Invitation/landing-page experiences and supporting services.',
    longDescription:
      'Dreamy Invite specializes in creating elegant, memorable invitation and landing page experiences for weddings, corporate events, and special occasions. The platform features beautiful animations, smooth transitions, and an intuitive interface that makes creating and sharing invitations a delightful experience.',
    image: '/images/dreamyinvites.png',
    date: '2023',
    tech: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Framer Motion',
      'Tailwind CSS',
      'Node.js',
    ],
    features: [
      'Beautiful invitation templates',
      'Custom designs',
      'Animation effects',
      'RSVP management',
      'Real-time updates',
      'Mobile-responsive',
      'Social sharing',
    ],
    impact: [
      'Enhanced user engagement',
      'Premium user experience',
      'Higher RSVP rates',
      'Increased social sharing',
    ],
    status: 'completed',
    duration: '3 months',
    teamSize: '1 developer',
    role: 'Developer',
    methodologies: ['UI/UX Design', 'Frontend Development'],
    challenges: [
      'Complex animations',
      'Cross-device consistency',
      'Performance optimization',
      'User interaction design',
    ],
    solutions: [
      'Framer Motion for animations',
      'Responsive design patterns',
      'Code splitting',
      'User testing and feedback',
    ],
    results: [
      '80% RSVP completion rate',
      '4.5/5 user satisfaction',
      'Smooth 60fps animations',
      'Increased social shares',
    ],
  },
  {
    id: 'muffleit-fe-be',
    slug: 'muffleit-full-stack',
    name: 'MuffleIt',
    category: 'repository',
    tags: ['Full Stack', 'Web Platform', 'API Integration', 'Database'],
    description: 'Full-stack work across client and backend components.',
    longDescription:
      'MuffleIt is a comprehensive web platform built with full-stack capabilities. The project involved developing both frontend interfaces and backend systems to create a seamless user experience. Features include user authentication, data management, API integrations, and real-time updates.',
    image: '/images/muffleit.png',
    date: '2023',
    tech: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'WebSockets',
      'REST APIs',
      'JWT Auth',
    ],
    features: [
      'User authentication',
      'Real-time updates',
      'Data visualization',
      'API integrations',
      'Responsive UI',
      'Admin panel',
      'Analytics dashboard',
    ],
    impact: [
      'Improved platform functionality',
      'Better user management',
      'Real-time data access',
      'Enhanced security',
    ],
    status: 'completed',
    duration: '5 months',
    teamSize: '2 developers',
    role: 'Full Stack Developer',
    methodologies: [
      'Agile',
      'Full Stack Development',
      'Test-Driven Development',
    ],
    challenges: [
      'Real-time synchronization',
      'Complex state management',
      'Security implementation',
      'Scalable architecture',
    ],
    solutions: [
      'WebSocket implementation',
      'Redux for state management',
      'JWT authentication',
      'Microservices architecture',
    ],
    results: [
      'Sub-second real-time updates',
      '99.9% system uptime',
      'Zero security incidents',
      'Scalable to 10K+ users',
    ],
  },
  {
    id: 'barrymcguigan',
    slug: 'barrymcguigan-website',
    name: 'Barry McGuigan Website',
    category: 'website-design',
    tags: ['Content Site', 'Performance', 'SEO', 'Frontend'],
    description: 'Content-focused website build and optimization.',
    longDescription:
      'A content-focused website for Barry McGuigan, featuring optimized performance, excellent SEO structure, and a clean, professional design. The site showcases content, media, and information while maintaining fast load times and great user experience across all devices.',
    image: '/images/barrymcguigan.png',
    date: '2023',
    tech: [
      'HTML',
      'CSS',
      'JavaScript',
      'Next.js',
      'Tailwind CSS',
      'SEO Tools',
      'Performance Optimization',
    ],
    features: [
      'Content management system',
      'Optimized images',
      'SEO-friendly structure',
      'Fast page loads',
      'Mobile responsive',
      'Social media integration',
      'Blog functionality',
    ],
    impact: [
      'Improved search rankings',
      'Better user engagement',
      'Faster page loads',
      'Increased organic traffic',
    ],
    status: 'completed',
    duration: '2 months',
    teamSize: '1 developer',
    role: 'Developer',
    methodologies: ['Performance Optimization', 'SEO Best Practices'],
    challenges: [
      'Large media files',
      'SEO optimization',
      'Content organization',
      'Page speed optimization',
    ],
    solutions: [
      'Image optimization and lazy loading',
      'Meta tags and structured data',
      'Content hierarchy design',
      'Caching strategies',
    ],
    results: [
      '95+ PageSpeed score',
      '60% increase in organic traffic',
      '40% reduction in bounce rate',
      'Top 3 search rankings for key terms',
    ],
  },
  {
    id: 'businessmatters',
    slug: 'businessmatters-content-platform',
    name: 'Business Matters',
    category: 'dashboard',
    tags: ['Content Platform', 'Performance', 'CMS', 'Full Stack'],
    description: 'Content platform development and performance improvements.',
    longDescription:
      'Business Matters is a comprehensive content platform developed to deliver articles, news, and business insights efficiently. The project involved building a robust content management system, optimizing performance, and ensuring seamless content delivery to users across various devices.',
    image: '/images/businessmatters.png',
    date: '2023',
    tech: [
      'Next.js',
      'React',
      'Node.js',
      'MongoDB',
      'Redis',
      'CMS',
      'REST APIs',
    ],
    features: [
      'Content management',
      'Article publishing',
      'Search functionality',
      'Categories and tags',
      'User subscriptions',
      'Analytics tracking',
      'Email newsletters',
    ],
    impact: [
      'Improved content delivery',
      'Better user engagement',
      'Faster page loads',
      'Increased subscriber base',
    ],
    status: 'completed',
    duration: '4 months',
    teamSize: '2 developers',
    role: 'Full Stack Developer',
    methodologies: ['Agile', 'Performance Optimization', 'Content Management'],
    challenges: [
      'Large content database',
      'Search performance',
      'User personalization',
      'Email automation',
    ],
    solutions: [
      'Database indexing',
      'Redis caching',
      'Personalized recommendations',
      'Automated email campaigns',
    ],
    results: [
      '50% faster page loads',
      '200% increase in subscribers',
      '80% search accuracy',
      'Improved content discovery',
    ],
  },
  {
    id: 'agrosafpharmaceuticals',
    slug: 'agrosaf-pharmaceuticals-website',
    name: 'Agrosaf Pharmaceuticals',
    category: 'repository',
    tags: ['Business Site', 'Full Stack', 'E-commerce', 'Backend'],
    description: 'Business website and supporting backend services.',
    longDescription:
      'A professional business website for Agrosaf Pharmaceuticals, featuring product catalogs, company information, and integrated backend services. The platform includes customer management, order processing, and integration with various business systems to streamline operations.',
    image: '/images/agrosafpharmaceuticals.png',
    date: '2023',
    tech: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Payment Gateway',
      'Email Services',
      'Admin Dashboard',
    ],
    features: [
      'Product catalog',
      'Company information',
      'Customer management',
      'Order processing',
      'Admin dashboard',
      'Invoice generation',
      'Email notifications',
    ],
    impact: [
      'Streamlined business operations',
      'Improved customer experience',
      'Automated order processing',
      'Better data management',
    ],
    status: 'completed',
    duration: '3 months',
    teamSize: '1 developer',
    role: 'Full Stack Developer',
    methodologies: ['Full Stack Development', 'Business Process Automation'],
    challenges: [
      'Business logic complexity',
      'Payment integration',
      'Invoice generation',
      'Data security',
    ],
    solutions: [
      'Modular business logic',
      'Secure payment gateway',
      'PDF generation for invoices',
      'Encryption and security measures',
    ],
    results: [
      'Automated 80% of manual tasks',
      'Reduced processing time by 60%',
      'Zero payment errors',
      'Improved customer satisfaction',
    ],
  },
  {
    id: 'laladecorators',
    slug: 'lala-decorators-website',
    name: 'Lala Decorators',
    category: 'website-design',
    tags: ['Business Site', 'Responsive Design', 'UI/UX', 'Frontend'],
    description: 'Business site build with modern responsive UI.',
    longDescription:
      'A modern, responsive business website for Lala Decorators showcasing their decoration and event services. The site features an elegant design, gallery of work, service descriptions, and contact forms to help customers connect and learn about their offerings.',
    image: '/images/laladecorators.png',
    date: '2023',
    tech: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Tailwind CSS',
      'Image Optimization',
      'Contact Forms',
    ],
    features: [
      'Responsive design',
      'Service showcase',
      'Image gallery',
      'Contact forms',
      'Mobile optimized',
      'Fast loading',
      'Smooth animations',
    ],
    impact: [
      'Improved online presence',
      'Better customer engagement',
      'Increased inquiries',
      'Professional brand image',
    ],
    status: 'completed',
    duration: '1.5 months',
    teamSize: '1 developer',
    role: 'Developer',
    methodologies: ['UI/UX Design', 'Frontend Development'],
    challenges: [
      'Visual appeal',
      'Mobile responsiveness',
      'Gallery optimization',
      'Form functionality',
    ],
    solutions: [
      'Modern design patterns',
      'Mobile-first approach',
      'Lazy loading for images',
      'Form validation and spam protection',
    ],
    results: [
      '50% increase in inquiries',
      '40% improvement in mobile traffic',
      'Reduced bounce rate by 35%',
      'Positive customer feedback',
    ],
  },
  {
    id: 'ultimatesportstrainer',
    slug: 'ultimate-sports-trainer-platform',
    name: 'Ultimate Sports Trainer',
    category: 'repository',
    tags: ['Web Platform', 'Training', 'Full Stack', 'Database'],
    description: 'Web platform implementation and enhancements.',
    longDescription:
      'Ultimate Sports Trainer is a comprehensive web platform for sports training and fitness programs. The platform includes user management, workout tracking, progress monitoring, and various features to help users achieve their fitness goals. Involved both frontend enhancements and backend development.',
    image: '/images/ultimatesportstrainer.png',
    date: '2023',
    tech: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Chart.js',
      'Video Streaming',
      'REST APIs',
    ],
    features: [
      'User authentication',
      'Workout programs',
      'Progress tracking',
      'Video tutorials',
      'Performance analytics',
      'Nutrition plans',
      'Community features',
    ],
    impact: [
      'Improved user engagement',
      'Better workout tracking',
      'Enhanced progress monitoring',
      'Increased platform usage',
    ],
    status: 'completed',
    duration: '4 months',
    teamSize: '2 developers',
    role: 'Full Stack Developer',
    methodologies: ['Agile', 'Full Stack Development', 'User Testing'],
    challenges: [
      'Complex data tracking',
      'Video streaming optimization',
      'Real-time progress updates',
      'Scalable data storage',
    ],
    solutions: [
      'Efficient database design',
      'Optimized video delivery',
      'WebSocket for real-time updates',
      'Cloud storage integration',
    ],
    results: [
      '5000+ active users',
      '80% user retention',
      '4.7/5 app rating',
      'Reduced page load by 40%',
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectSlug | undefined {
  return projectSlugs.find((project) => project.slug === slug);
}

export function getRelatedProjects(
  currentProject: ProjectSlug,
  limit: number = 3
): ProjectSlug[] {
  return projectSlugs
    .filter((project) => project.id !== currentProject.id)
    .filter(
      (project) =>
        project.category === currentProject.category ||
        project.tech.some((tech) => currentProject.tech.includes(tech))
    )
    .slice(0, limit);
}
