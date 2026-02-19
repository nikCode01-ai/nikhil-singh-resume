'use client';

import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-posts";
import { ButtonLink } from "@/components/Button";
import { ArrowUpRight, Clock, Tag } from "lucide-react";

type BlogsProps = {
  limit?: number;
};

export function Blogs({ limit }: BlogsProps) {
  const posts = typeof limit === "number" ? blogPosts.slice(0, limit) : blogPosts;
  const showViewAllButton = typeof limit === "number" && blogPosts.length > limit;

  return (
    <section className="bg-gradient-to-b from-slate-50 to-brand-cream dark:from-slate-950 dark:to-slate-900 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-green dark:text-brand-yellow">News & Blogs</p>
            <h2 className="mt-2 text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
              Latest <span className="text-brand-yellow">Insights & Stories</span>
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              Explore technical insights, case studies, and best practices from recent projects.
            </p>
          </div>

          {showViewAllButton ? (
            <ButtonLink href="/blogs" variant="primary" size="sm">
              View All Blogs
            </ButtonLink>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group block overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl ring-1 ring-slate-900/5 transition-all hover:-translate-y-2 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:ring-white/10 dark:focus-visible:ring-offset-slate-950"
            >
              <article>
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-brand-yellow/25 to-brand-yellow/40">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green dark:bg-brand-yellow/20 dark:text-brand-yellow text-sm font-semibold">
                      <Tag className="w-4 h-4" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-green dark:group-hover:text-brand-yellow transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green transition-colors group-hover:text-brand-greenDark dark:text-brand-yellow dark:group-hover:text-brand-yellow/80">
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