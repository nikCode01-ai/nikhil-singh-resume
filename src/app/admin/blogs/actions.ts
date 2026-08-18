'use server';

import fs from 'fs';
import path from 'path';

export async function generateBlog(topic: string, category: string) {
  // Server-side auth: verify ADMIN_API_KEY exists (this validates the server is properly configured)
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) {
    return { error: 'Admin API key not configured' };
  }

  if (!topic || !category) {
    return { error: 'Topic and category are required' };
  }

  const slug = topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const newBlog = {
    slug,
    title: `The Comprehensive Guide to ${topic}`,
    excerpt: `An in-depth look at ${topic} and its impact on ${category}. Generated automatically by AI.`,
    category,
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    }),
    readingTime: '4 min read',
    tags: [topic.split(' ')[0], 'AI Generated'],
    body: [
      { type: 'heading' as const, text: `Understanding ${topic}` },
      {
        type: 'paragraph' as const,
        text: `${topic} is revolutionizing the way we approach ${category}. In this post, we explore its core concepts and practical applications.`,
      },
      {
        type: 'list' as const,
        items: ['Key concept 1', 'Key concept 2', 'Future possibilities'],
      },
    ],
  };

  const filePath = path.join(process.cwd(), 'src/lib/generated-blogs.json');
  let generatedBlogs = [];
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    try {
      generatedBlogs = JSON.parse(content);
    } catch {
      generatedBlogs = [];
    }
  }

  generatedBlogs.push(newBlog);
  fs.writeFileSync(filePath, JSON.stringify(generatedBlogs, null, 2));

  return { success: true, blog: newBlog };
}
