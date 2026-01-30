import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-posts";
import { ButtonLink } from "@/components/Button";
import { ArrowUpRight } from "lucide-react";

type BlogsProps = {
  limit?: number;
};

export function Blogs({ limit }: BlogsProps) {
  const posts = typeof limit === "number" ? blogPosts.slice(0, limit) : blogPosts;
  const showViewAllButton = typeof limit === "number" && blogPosts.length > limit;

  return (
    <section className="bg-brand-cream py-20 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-green dark:text-brand-yellow">News & Blogs</p>
            <h2 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-slate-100">
              Our Latest <span className="text-brand-yellow">News & Blogs</span>
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              Highlights and learnings from recent builds.
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
              className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-slate-900/60 dark:ring-white/10 dark:focus-visible:ring-offset-slate-950"
            >
              <article>
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-brand-yellow/25 to-brand-yellow/40">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <span className="inline-flex rounded-full bg-brand-yellow/25 px-3 py-1 text-xs font-semibold text-brand-green dark:bg-brand-yellow/15 dark:text-brand-yellow">
                    {post.category}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-slate-100">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-green transition-colors group-hover:text-brand-greenDark dark:text-brand-yellow dark:group-hover:text-brand-yellow/80">
                    Read More
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
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
