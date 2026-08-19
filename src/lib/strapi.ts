const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'https://nik-be.onrender.com';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

type StrapiResponse<T> = {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

async function fetchStrapi<T>(
  path: string,
  options?: { next?: { revalidate?: number }; cache?: string }
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api${path}`;
  const headers: Record<string, string> = {};
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
    headers,
    signal: AbortSignal.timeout(1500),
  };
  if (options?.next) {
    fetchOptions.next = options.next;
  }
  if (options?.cache) {
    fetchOptions.cache = options.cache as RequestCache;
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(`Invalid content-type: expected JSON, got ${contentType}`);
  }

  return await res.json();
}

export type StrapiBlog = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readingTime: string;
  tags: string[];
  body: Record<string, unknown>[];
  featured_image?: {
    url: string;
    alternativeText?: string;
    name?: string;
    width?: number;
    height?: number;
    formats?: Record<string, { url: string }>;
  };
  createdAt: string;
  updatedAt: string;
};

export type StrapiProject = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  longDescription?: string;
  tags?: string[];
  tech?: string[];
  features?: string[];
  impact?: string[];
  status: string;
  url?: string;
  githubUrl?: string;
  demoUrl?: string;
  date?: string;
  client?: string;
  duration?: string;
  teamSize?: string;
  role?: string;
  methodologies?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  testimonials?: Array<{ text: string; author: string; role: string }>;
  metrics?: Array<{ label: string; value: string; improvement?: string }>;
  image?: { url: string; alternativeText?: string };
  createdAt: string;
  updatedAt: string;
};

export type StrapiService = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  technologies: string[];
  longDescription?: string;
  features?: string[];
  icon?: string;
  createdAt: string;
  updatedAt: string;
};

export async function getBlogs(): Promise<StrapiBlog[]> {
  try {
    const res = await fetchStrapi<StrapiBlog[]>(
      '/blogs?pagination[pageSize]=100&sort=createdAt:desc&populate=featured_image',
      {
        next: { revalidate: 300 },
      }
    );
    return res.data.map((blog) => ({
      ...blog,
      featured_image: blog.featured_image
        ? {
            ...blog.featured_image,
            url: blog.featured_image.url?.startsWith('http')
              ? blog.featured_image.url
              : `${STRAPI_URL}${blog.featured_image.url}`,
          }
        : undefined,
    }));
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<StrapiBlog | null> {
  try {
    const res = await fetchStrapi<StrapiBlog[]>(
      `/blogs?filters[slug][$eq]=${slug}&populate=featured_image`,
      {
        next: { revalidate: 300 },
      }
    );
    const blog = res.data[0] || null;
    if (
      blog?.featured_image?.url &&
      !blog.featured_image.url.startsWith('http')
    ) {
      blog.featured_image.url = `${STRAPI_URL}${blog.featured_image.url}`;
    }
    return blog;
  } catch {
    return null;
  }
}

export async function getProjects(): Promise<StrapiProject[]> {
  try {
    const res = await fetchStrapi<StrapiProject[]>(
      '/projects?pagination[pageSize]=100&sort=createdAt:desc&populate=*',
      {
        next: { revalidate: 300 },
      }
    );
    return res.data.map((project) => ({
      ...project,
      image: project.image
        ? {
            ...project.image,
            url: project.image.url?.startsWith('http')
              ? project.image.url
              : `${STRAPI_URL}${project.image.url}`,
          }
        : undefined,
    }));
  } catch {
    return [];
  }
}

export async function getProjectBySlug(
  slug: string
): Promise<StrapiProject | null> {
  try {
    const res = await fetchStrapi<StrapiProject[]>(
      `/projects?filters[slug][$eq]=${slug}&populate=*`,
      {
        next: { revalidate: 300 },
      }
    );
    const project = res.data[0] || null;
    if (project?.image?.url && !project.image.url.startsWith('http')) {
      project.image.url = `${STRAPI_URL}${project.image.url}`;
    }
    return project;
  } catch {
    return null;
  }
}

export async function getServices(): Promise<StrapiService[]> {
  try {
    const res = await fetchStrapi<StrapiService[]>(
      '/services?pagination[pageSize]=100',
      {
        next: { revalidate: 300 },
      }
    );
    return res.data;
  } catch {
    return [];
  }
}
