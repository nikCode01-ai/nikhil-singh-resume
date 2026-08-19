import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import { Badge } from '@/components/Badge';
import { Container } from '@/components/Container';
import { ReadingProgress } from '@/components/ReadingProgress';
import { blogPosts, getBlogPostBySlug, type BlogPost } from '@/lib/blog-posts';
import { getBlogBySlug, type StrapiBlog } from '@/lib/strapi';
import { ArrowLeft, ListTree } from 'lucide-react';

function mapStrapiPost(post: StrapiBlog): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    image: post.featured_image?.url || undefined,
    date: post.createdAt,
    readingTime: post.readingTime,
    tags: post.tags || [],
    body: (post.body || []) as BlogPost['body'],
  };
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const { getBlogs } = await import('@/lib/strapi');
  let allSlugs: string[] = [];
  try {
    const strapiBlogs = await getBlogs();
    allSlugs = strapiBlogs.map((b) => b.slug);
  } catch {
    allSlugs = [];
  }
  const localSlugs = blogPosts.map((post) => post.slug);
  const merged = [...new Set([...allSlugs, ...localSlugs])];
  return merged.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let post: BlogPost | null = null;
  try {
    const strapiPost = await getBlogBySlug(slug);
    if (strapiPost) post = mapStrapiPost(strapiPost);
  } catch {}
  if (!post) post = getBlogPostBySlug(slug) || null;

  if (!post) {
    return {
      title: 'Blog',
    };
  }

  return {
    title: `${post.title} | Nikhil Singh Blog`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app'}/blogs/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Nikhil Singh'],
      tags: post.tags,
      images: post.image
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post: BlogPost | null = null;
  try {
    const strapiPost = await getBlogBySlug(slug);
    if (strapiPost) post = mapStrapiPost(strapiPost);
  } catch {}
  if (!post) post = getBlogPostBySlug(slug) || null;

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nikhilsingh-eight.vercel.app/blogs/${slug}`,
    },
    author: {
      '@type': 'Person',
      name: 'Nikhil Singh',
      url: 'https://nikhilsingh-eight.vercel.app',
    },
    publisher: {
      '@type': 'Person',
      name: 'Nikhil Singh',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nikhilsingh-eight.vercel.app/og-image.svg',
      },
    },
  };

  const headings = post.body
    .filter(
      (b): b is Extract<typeof b, { type: 'heading' }> => b.type === 'heading'
    )
    .map((b) => ({
      text: b.text,
      id: b.text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    }));

  return (
    <>
      <ReadingProgress />
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-gradient-to-b from-brand-green/5 to-transparent dark:from-emerald-500/5"
        />
        <Container>
          <div className="relative py-10 motion-safe:animate-fade-in sm:py-14">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-greenDark dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to Blogs</span>
            </Link>

            <header className="mt-6 space-y-3">
              <p className="text-sm font-semibold text-brand-green dark:text-emerald-400">
                {post.category}
              </p>
              <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {post.title}
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300 lg:text-base">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                <span>{post.date}</span>
                <span aria-hidden="true">•</span>
                <span>{post.readingTime}</span>
              </div>

              {post.tags.length ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              ) : null}
            </header>

            {post.image ? (
              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div
                  className="relative w-full"
                  style={{ aspectRatio: '16 / 9' }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    priority
                  />
                </div>
              </div>
            ) : null}

            {headings.length > 1 && (
              <div className="mt-8 rounded-2xl border border-brand-green/20 bg-brand-green/5 p-5 sm:p-6 dark:border-emerald-500/20 dark:bg-emerald-500/5">
                <div className="flex items-center gap-2 text-sm font-bold text-brand-green dark:text-emerald-400 mb-3">
                  <ListTree className="h-4 w-4" />
                  <span>Table of Contents</span>
                </div>
                <nav aria-label="Table of contents">
                  <ol className="space-y-2 text-sm">
                    {headings.map((h, i) => (
                      <li key={h.id} className="flex items-baseline gap-2">
                        <span className="text-xs font-semibold text-brand-green/70 dark:text-emerald-400/70">
                          {i + 1}.
                        </span>
                        <a
                          href={`#${h.id}`}
                          className="text-slate-700 dark:text-slate-300 hover:text-brand-green dark:hover:text-emerald-400 transition-colors font-medium"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            )}

            <div className="mt-10 border-t border-slate-200 dark:border-slate-800" />

            <article className="mt-8">
              {post.body.map((block, index) => {
                if (block.type === 'heading') {
                  const headingId = block.text
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
                  return (
                    <h2
                      key={`${block.type}-${index}`}
                      id={headingId}
                      className="mt-10 scroll-mt-24 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === 'image') {
                  return (
                    <div key={`${block.type}-${index}`} className="mt-8 mb-8">
                      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                        <div
                          className="relative w-full"
                          style={{ aspectRatio: '16 / 9' }}
                        >
                          <Image
                            src={block.src}
                            alt={block.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 80vw"
                          />
                        </div>
                      </div>
                      {block.caption && (
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 text-center">
                          {block.caption}
                        </p>
                      )}
                    </div>
                  );
                }

                if (block.type === 'list') {
                  return (
                    <ul
                      key={`${block.type}-${index}`}
                      className="mt-4 list-disc space-y-1 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300 sm:text-base"
                    >
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                if (block.type === 'links') {
                  return (
                    <div
                      key={`${block.type}-${index}`}
                      className="mt-8 rounded-xl border border-brand-green/20 bg-brand-green/5 p-6 dark:border-emerald-500/20 dark:bg-emerald-500/5"
                    >
                      {block.heading && (
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
                          {block.heading}
                        </h3>
                      )}
                      <ul className="space-y-2">
                        {block.items.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="text-sm font-semibold text-brand-green hover:text-brand-greenDark dark:text-emerald-400 dark:hover:text-emerald-300 underline underline-offset-2"
                            >
                              {link.label} →
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                return (
                  <p
                    key={`${block.type}-${index}`}
                    className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300 sm:text-base"
                  >
                    {block.text}
                  </p>
                );
              })}
            </article>
          </div>
        </Container>
      </div>
    </>
  );
}
