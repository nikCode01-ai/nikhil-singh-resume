import { MetadataRoute } from 'next';
import { projectSlugs, type ProjectSlug } from '@/lib/project-slugs';
import { blogPosts, type BlogPostBodyBlock } from '@/lib/blog-posts';
import { getProjects } from '@/lib/strapi';
import { getBlogs } from '@/lib/strapi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app';

  let allProjectSlugs = projectSlugs;
  let allBlogPosts = blogPosts;

  try {
    const strapiProjects = await getProjects();
    if (strapiProjects.length > 0) {
      allProjectSlugs = strapiProjects.map((p) => ({
        id: String(p.id),
        slug: p.slug,
        name: p.name,
        category: (p.category || 'repository') as ProjectSlug['category'],
        tags: p.tags || [],
        description: p.description,
        longDescription: p.longDescription || p.description,
        image: p.image?.url || '',
        url: p.url,
        githubUrl: p.githubUrl,
        demoUrl: p.demoUrl,
        date: p.date || '',
        tech: p.tech || [],
        features: p.features || [],
        impact: p.impact || [],
        status: (p.status || 'completed') as ProjectSlug['status'],
        client: p.client,
        duration: p.duration,
        teamSize: p.teamSize,
        role: p.role || '',
        methodologies: p.methodologies || [],
        challenges: p.challenges || [],
        solutions: p.solutions || [],
        results: p.results || [],
        testimonials: p.testimonials,
        metrics: p.metrics,
      }));
    }
  } catch {}

  try {
    const strapiBlogs = await getBlogs();
    if (strapiBlogs.length > 0) {
      allBlogPosts = strapiBlogs.map((b) => ({
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        category: b.category,
        image: b.featured_image?.url || undefined,
        date: b.createdAt,
        readingTime: b.readingTime,
        tags: b.tags || [],
        body: (b.body || []) as BlogPostBodyBlock[],
      }));
    }
  } catch {}

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/price`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/projects/ndcterm`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = [
    ...allProjectSlugs.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.date || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  const blogPages: MetadataRoute.Sitemap = allBlogPosts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}
