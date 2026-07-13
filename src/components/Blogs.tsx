'use client';

import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog-posts';
import { ButtonLink } from '@/components/Button';
import { ArrowUpRight, Clock, Tag } from 'lucide-react';

type BlogsProps = {
  limit?: number;
};

export function Blogs({ limit }: BlogsProps) {
  const posts =
    typeof limit === 'number' ? blogPosts.slice(0, limit) : blogPosts;
  const showViewAllButton =
    typeof limit === 'number' && blogPosts.length > limit;

  return (
    <section className="bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-950 dark:to-slate-900/50 section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green dark:text-brand-yellow">
              <span className="h-px w-8 bg-brand-green/20 dark:bg-brand-yellow/20" />
              News & Blogs
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
              Latest{' '}
              <span className="text-brand-green dark:text-brand-yellow">
                Insights
              </span>
            </h2>
            <p className="mt-4 text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Explore technical insights, case studies, and best practices from
              recent projects.
            </p>
          </div>

          {showViewAllButton && (
            <ButtonLink href="/blogs" variant="primary" size="sm">
              View All Blogs
            </ButtonLink>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group block card-premium overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green dark:focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
            >
              <article>
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-green/8 dark:bg-brand-yellow/8 text-brand-green dark:text-brand-yellow text-xs font-semibold">
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-green dark:group-hover:text-brand-yellow transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-slate-100 dark:bg-white/6 text-slate-600 dark:text-slate-300 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green dark:text-brand-yellow group-hover:gap-2.5 transition-all">
                      Read More
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
