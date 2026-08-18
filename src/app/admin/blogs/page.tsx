'use client';

import { useState } from 'react';
import type { BlogPostBodyBlock } from '@/lib/blog-posts';
import { generateBlog } from './actions';

interface GeneratedBlogPreview {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  tags: string[];
  body: BlogPostBodyBlock[];
}

export default function AdminBlogsPage() {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<GeneratedBlogPreview | null>(null);
  const [message, setMessage] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !category) return;

    setIsLoading(true);
    setMessage('');
    setPreview(null);

    try {
      const result = await generateBlog(topic, category);
      if ('error' in result) {
        setMessage(result.error || 'Failed to generate blog');
      } else {
        setPreview(result.blog);
        setMessage('Blog generated and saved successfully!');
      }
    } catch {
      setMessage('Error connecting to the server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
          Auto Blog Generator
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Generate and preview AI-written blog posts.
        </p>
      </header>

      <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Blog Topic
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Next.js Performance Optimization"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2 text-slate-900 dark:text-white focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Frontend Development"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2 text-slate-900 dark:text-white focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !topic || !category}
            className="w-full rounded-lg bg-brand-green hover:bg-brand-greenDark px-4 py-2.5 font-bold text-white shadow-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? 'Generating...' : 'Generate & Save Blog'}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm font-medium text-brand-green dark:text-emerald-400">
            {message}
          </p>
        )}
      </section>

      {preview && (
        <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Preview
          </h2>
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <h1>{preview.title}</h1>
            <div className="flex gap-2 text-sm text-slate-500 mb-6">
              <span>{preview.date}</span>
              <span>•</span>
              <span>{preview.readingTime}</span>
              <span>•</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 rounded-md">
                {preview.category}
              </span>
            </div>
            <p className="lead italic">{preview.excerpt}</p>

            {preview.body.map((block: BlogPostBodyBlock, idx: number) => {
              if (block.type === 'heading')
                return <h3 key={idx}>{block.text}</h3>;
              if (block.type === 'paragraph')
                return <p key={idx}>{block.text}</p>;
              if (block.type === 'list')
                return (
                  <ul key={idx}>
                    {block.items.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              return null;
            })}
          </article>
        </section>
      )}
    </div>
  );
}
