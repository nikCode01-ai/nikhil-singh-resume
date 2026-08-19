import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    if (process.env.ADMIN_API_KEY && token !== process.env.ADMIN_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { topic, category } = await request.json();

    if (!topic || !category) {
      return NextResponse.json(
        { error: 'Topic and category are required' },
        { status: 400 }
      );
    }

    const groqKey = process.env.GROQ_API_KEY;
    const baseSlug = topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    let generatedPost = null;

    if (groqKey) {
      try {
        const prompt = `You are a senior full-stack engineer and technical writer. Write an in-depth, production-ready technical blog post on "${topic}" under the category "${category}".
Format your response as a valid JSON object matching this exact schema:
{
  "title": "A compelling, professional title for the blog post",
  "excerpt": "A 2-3 sentence overview highlighting the practical value and architecture insights",
  "readingTime": "e.g. 6 min read",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "body": [
    { "type": "heading", "text": "Section Heading" },
    { "type": "paragraph", "text": "Detailed technical explanation..." },
    { "type": "list", "items": ["Key point 1", "Key point 2", "Key point 3"] }
  ]
}
Ensure the body contains at least 3-4 sections with detailed paragraphs and practical takeaways. Output ONLY the JSON object, with no markdown code fences or conversational text.`;

        const groqRes = await fetch(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${groqKey}`,
            },
            body: JSON.stringify({
              model: 'llama-3.3-70b-versatile',
              messages: [{ role: 'user', content: prompt }],
              temperature: 0.7,
              response_format: { type: 'json_object' },
            }),
          }
        );

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const content = groqData.choices?.[0]?.message?.content;
          if (content) {
            const parsed = JSON.parse(content);
            generatedPost = {
              slug: baseSlug,
              title: parsed.title || `Mastering ${topic}: A Practical Guide`,
              excerpt:
                parsed.excerpt ||
                `An in-depth look at ${topic} and practical architectural implementations for ${category}.`,
              category,
              date: new Date().toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              }),
              readingTime: parsed.readingTime || '5 min read',
              tags: Array.isArray(parsed.tags)
                ? parsed.tags
                : [topic.split(' ')[0], category, 'Engineering'],
              body: Array.isArray(parsed.body)
                ? parsed.body
                : [
                    { type: 'heading', text: `Deep Dive into ${topic}` },
                    {
                      type: 'paragraph',
                      text: `${topic} is transforming modern full-stack workflows in ${category}.`,
                    },
                  ],
            };
          }
        }
      } catch (err) {
        console.error('Groq blog generation error:', err);
      }
    }

    if (!generatedPost) {
      generatedPost = {
        slug: baseSlug,
        title: `The Comprehensive Guide to ${topic}`,
        excerpt: `An in-depth look at ${topic} and its impact on modern ${category} development.`,
        category,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
        readingTime: '5 min read',
        tags: [topic.split(' ')[0], category, 'Architecture', 'Best Practices'],
        body: [
          { type: 'heading', text: `Understanding ${topic}` },
          {
            type: 'paragraph',
            text: `${topic} is reshaping how we build scalable applications in ${category}. Understanding the underlying principles allows engineers to create resilient, maintainable systems.`,
          },
          { type: 'heading', text: 'Core Architecture & Implementation' },
          {
            type: 'paragraph',
            text: `When implementing ${topic} in production, key considerations include latency, fault tolerance, and developer experience.`,
          },
          {
            type: 'list',
            items: [
              'Zero-latency caching strategies',
              'Modular component boundaries',
              'Automated verification and error tracking',
            ],
          },
          { type: 'heading', text: 'Summary & Best Practices' },
          {
            type: 'paragraph',
            text: `Adopting ${topic} with proper best practices ensures long-term scalability and robust developer velocity.`,
          },
        ],
      };
    }

    // Save to generated-blogs.json
    const filePath = path.join(process.cwd(), 'src/lib/generated-blogs.json');
    let generatedBlogs = [];
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        generatedBlogs = JSON.parse(content);
        if (!Array.isArray(generatedBlogs)) generatedBlogs = [];
      } catch {
        generatedBlogs = [];
      }
    }

    // Replace existing if slug matches or prepend
    const existingIndex = generatedBlogs.findIndex(
      (b: { slug: string }) => b.slug === generatedPost.slug
    );
    if (existingIndex >= 0) {
      generatedBlogs[existingIndex] = generatedPost;
    } else {
      generatedBlogs.unshift(generatedPost);
    }

    fs.writeFileSync(filePath, JSON.stringify(generatedBlogs, null, 2));

    return NextResponse.json({ success: true, blog: generatedPost });
  } catch (error) {
    console.error('Blog generation endpoint error:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog' },
      { status: 500 }
    );
  }
}
