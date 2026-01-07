import { technicalSkills } from "@/lib/resume-data";

const skillProficiency = {
  "HTML5": 95,
  "CSS3": 90,
  "JavaScript (ES6+)": 92,
  "TypeScript": 88,
  "React": 94,
  "Next.js 16 (App Router)": 90,
  "Tailwind CSS": 85,
  "Bootstrap": 80,
  "jQuery": 75,
  "PWA": 82,
  "SSE": 85,
  "Node.js": 90,
  "Fastify": 85,
  "Express": 88,
  "PHP 7/8": 75,
  "Laravel": 70,
  "Strapi CMS": 80,
  "REST APIs": 92,
  "SOAP/XML": 85,
  "GraphQL": 78,
  "Microservices": 82,
  "WebSockets": 88,
  "MongoDB": 85,
  "PostgreSQL": 82,
  "MySQL": 80,
  "BigQuery": 70,
  "Redis": 78,
  "Query Optimization": 85,
  "AWS (EC2, S3, RDS, Lambda)": 80,
  "PM2": 85,
  "Docker": 75,
  "Git": 92,
  "GitLab CI/CD": 82,
  "Linux": 78,
  "Nginx": 80,
  "Apache": 75,
  "Plesk": 70,
  "WHM": 72,
  "Hostinger": 85,
  "HostGator": 80,
  "NDC APIs": 90,
  "American Airlines": 85,
  "United Airlines": 85,
  "Copa Airlines": 80,
  "AirGateway (25+ airlines)": 88,
  "GDS systems": 82,
  "GA4": 75,
  "Google Ads": 80,
  "GTM": 78,
  "Looker Studio": 72,
  "Amazon PA-API": 70,
  "SEO": 85,
  "Google Apps Script": 80,
};

const getToolsByCategory = () => {
  const tools: Array<{
    name: string;
    category: string;
    proficiency: number;
  }> = [];
  Object.entries(technicalSkills).forEach(([category, skills]) => {
    skills.forEach(skill => {
      tools.push({
        name: skill,
        category,
        proficiency: (skillProficiency as Record<string, number>)[skill] || 75
      });
    });
  });
  return tools;
};

export function Skills() {
  const tools = getToolsByCategory();
  
  // Get unique categories for filtering
  const categories = Object.keys(technicalSkills);
  
  return (
    <section className="bg-brand-cream py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand-green">My Favorite Tools</p>
          <h2 className="mt-2 text-4xl font-extrabold text-slate-900">
            <span className="text-brand-yellow">Exploring the Tools</span>
            <br />
            Behind My Designs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Technologies and tools I work with daily, with proficiency levels based on real project experience.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="rounded-full border-2 border-brand-green px-6 py-2 font-medium text-brand-green transition-colors hover:bg-brand-green hover:text-white"
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{tool.name}</h4>
                  <p className="text-sm text-gray-500">{tool.category}</p>
                </div>
                <div className="text-2xl font-bold text-brand-green">
                  {tool.proficiency}%
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-brand-yellow transition-all duration-1000 ease-out"
                  style={{ width: `${tool.proficiency}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Key Skills Summary */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-brand-green mb-2">50+</div>
            <div className="text-gray-600">Technologies Mastered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-brand-green mb-2">30+</div>
            <div className="text-gray-600">Production Systems</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-brand-green mb-2">4+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
