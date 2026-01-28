import Link from "next/link";
import Image from "next/image";
import { experience } from "@/lib/resume-data";
import { ButtonLink } from "@/components/Button";
import { ArrowUpRight } from "lucide-react";

type Post = {
  title: string;
  excerpt: string;
  category: string;
  image?: string;
};

const posts: Post[] = (experience[0]?.highlights ?? []).slice(0, 3).map((highlight, index) => {
  const category = index === 0 ? "App Design" : index === 1 ? "Dashboard" : "Website Design";
  const image = index === 0 ? "/images/blog-1.png" : index === 1 ? "/images/blog-2.png" : undefined;

  return {
    title: highlight.split(".")[0] ?? highlight,
    excerpt: highlight,
    category,
    image,
  };
});

export function Blogs() {
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

          <ButtonLink href="/blogs" variant="primary" size="sm">
            View All Blogs
          </ButtonLink>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.excerpt}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900/60 dark:ring-white/10"
            >
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
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-green transition-colors hover:text-brand-greenDark dark:text-brand-yellow dark:hover:text-brand-yellow/80"
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
