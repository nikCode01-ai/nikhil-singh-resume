import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { topic, category } = await request.json();

    if (!topic || !category) {
      return NextResponse.json(
        { error: 'Topic and category are required' },
        { status: 400 }
      );
    }

    // Dummy AI Generation for now (Can be replaced with actual OpenAI/Gemini call)
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
        { type: 'heading', text: `Understanding ${topic}` },
        {
          type: 'paragraph',
          text: `${topic} is revolutionizing the way we approach ${category}. In this post, we explore its core concepts and practical applications.`,
        },
        {
          type: 'list',
          items: ['Key concept 1', 'Key concept 2', 'Future possibilities'],
        },
      ],
    };

    // Save to generated-blogs.json
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

    return NextResponse.json({ success: true, blog: newBlog });
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate blog' },
      { status: 500 }
    );
  }
}
