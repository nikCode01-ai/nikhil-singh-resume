import Link from "next/link";

import { additionalProjects, featuredProjects, flagshipProject, person } from "@/lib/resume-data";
import { ExternalLink, Calendar, Code } from "lucide-react";

const projectImages = [
  "/api/placeholder/400/300?text=NDC+Terminal",
  "/api/placeholder/400/300?text=Panama+Kosher+Fest",
  "/api/placeholder/400/300?text=Fresh+Kosher+Cruises",
  "/api/placeholder/400/300?text=Travel+Platform",
  "/api/placeholder/400/300?text=E-commerce+Solution",
  "/api/placeholder/400/300?text=Event+Management"
];

const allProjects = [
  {
    name: flagshipProject.name,
    description: flagshipProject.description,
    image: projectImages[0],
    category: "Application Design",
    tags: ["UI/UX Design", "App Design", "Backend"],
    url: "#",
    date: "2024",
    tech: flagshipProject.tech.slice(0, 3)
  },
  ...featuredProjects.map((project, index) => ({
    name: project.name,
    description: project.description,
    image: projectImages[index + 1],
    category: index === 0 ? "Website Design" : index === 1 ? "Dashboard" : "Wireframe",
    tags: (project.features ?? []).slice(0, 2).map((f) => f.split(" ")[0]),
    url: project.url || "#",
    date: project.date,
    tech: project.tech.slice(0, 3)
  })),
  ...additionalProjects.map((project, index) => ({
    name: project.name,
    description: project.description,
    image: projectImages[(index + featuredProjects.length + 1) % projectImages.length],
    category: "Repository",
    tags: [project.role],
    url: person.gitlabUrl,
    date: "",
    tech: [] as string[]
  }))
];

export function Projects() {
  return (
    <section className="bg-brand-cream py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            My Latest Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore my recent work across different industries and technologies.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["All Projects", "App Design", "Website Design", "Dashboard", "Wireframe", "Repository"].map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                category === "All Projects"
                  ? "bg-brand-green text-white"
                  : "bg-white text-brand-green hover:bg-brand-yellow hover:text-brand-green border border-brand-green/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/40 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Code className="w-12 h-12 text-brand-green mx-auto mb-2" />
                    <p className="text-brand-green font-medium">{project.name}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-colors"></div>
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-full bg-brand-green/10 px-3 py-1 text-sm font-medium text-brand-green">
                    {project.category}
                  </span>
                  {project.date ? (
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{project.date}</span>
                    </div>
                  ) : null}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-green transition-colors">
                  {project.name}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="rounded bg-brand-yellow/25 px-2 py-1 text-xs text-brand-green"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* View Project Link */}
                <a
                  href={project.url}
                  className="inline-flex items-center gap-2 text-brand-green font-semibold hover:text-brand-greenDark transition-colors"
                >
                  View Project
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 rounded-full bg-brand-green px-8 py-3 font-semibold text-white transition-colors hover:bg-brand-greenDark"
          >
            View All Projects
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow text-brand-green">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
