import { MetadataRoute } from 'next';
import { projectSlugs } from '@/lib/project-slugs';
import { blogPosts } from '@/lib/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nikhisingh.netlify.app';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/skills`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/price`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/jobs`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/testimonials`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/faqs`, lastModified: new Date(), priority: 0.5 },
  ];

  const projectPages = projectSlugs.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    priority: 0.7,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}
