import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import { Badge } from '@/components/Badge';
import { Container } from '@/components/Container';
import { blogPosts, getBlogPostBySlug } from '@/lib/blog-posts';
import { ArrowLeft } from 'lucide-react';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

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
      canonical: `https://nikhilsingh-eight.vercel.app/blogs/${slug}`,
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
  const post = getBlogPostBySlug(slug);

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

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-gradient-to-b from-amber-50 to-transparent dark:from-amber-950/30"
        />
        <Container>
          <div className="relative py-10 motion-safe:animate-fade-in sm:py-14">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to Blogs</span>
            </Link>

            <header className="mt-6 space-y-3">
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">
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

            <div className="mt-10 border-t border-slate-200 dark:border-slate-800" />

            <article className="mt-8">
              {post.body.map((block, index) => {
                if (block.type === 'heading') {
                  return (
                    <h2
                      key={`${block.type}-${index}`}
                      className="mt-10 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl"
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
