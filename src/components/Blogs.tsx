import Link from "next/link";
import { experience } from "@/lib/resume-data";
import { ArrowUpRight } from "lucide-react";

type Post = {
  title: string;
  excerpt: string;
  category: string;
};

const posts: Post[] = (experience[0]?.highlights ?? []).slice(0, 3).map((highlight, index) => {
  const category = index === 0 ? "App Design" : index === 1 ? "Dashboard" : "Website Design";

  return {
    title: highlight.split(".")[0] ?? highlight,
    excerpt: highlight,
    category,
  };
});

export function Blogs() {
  return (
    <section className="bg-brand-cream py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-green">News & Blogs</p>
            <h2 className="mt-2 text-4xl font-extrabold text-slate-900">
              Our Latest <span className="text-brand-yellow">News & Blogs</span>
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Highlights and learnings from recent builds.
            </p>
          </div>

          <Link
            href="/blogs"
            className="inline-flex items-center gap-3 rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-greenDark"
          >
            View All Blogs
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow text-brand-green">
              +
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.excerpt}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-40 bg-gradient-to-br from-brand-yellow/25 to-brand-yellow/40" />
              <div className="p-6">
                <span className="inline-flex rounded-full bg-brand-yellow/25 px-3 py-1 text-xs font-semibold text-brand-green">
                  {post.category}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {post.excerpt}
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-green transition-colors hover:text-brand-greenDark"
                >
                  Read More
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
