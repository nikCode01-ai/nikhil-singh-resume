import { NextRequest, NextResponse } from 'next/server';
import { person } from '@/lib/resume-data';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { promptType, content, tone = 'impactful' } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    const systemPrompt = `You are a high-caliber technical resume and portfolio copywriter for ${person.name}, a Senior Full-Stack & Airline NDC Developer (4+ years experience, Next.js, Node.js, Fastify, AWS, NDC APIs).
Your task is to rewrite, enhance, and transform raw developer inputs into high-impact, metrics-driven, concise, and professional portfolio content.
Tone: ${tone}. Output only the enhanced markdown result without conversational filler.`;

    let userPrompt = '';
    switch (promptType) {
      case 'project_summary':
        userPrompt = `Rewrite this project summary into a crisp, compelling 3-4 sentence showcase highlighting technical architecture, problem solved, and business impact:\n\n${content}`;
        break;
      case 'resume_bullet':
        userPrompt = `Transform these notes/bullets into 3-4 high-impact STAR method resume bullet points starting with strong action verbs (e.g., Engineered, Architected, Reduced, Accelerated) with realistic metrics and technical depth:\n\n${content}`;
        break;
      case 'seo_meta':
        userPrompt = `Generate a high-converting SEO Title (under 60 chars), Meta Description (under 155 chars), and 5 high-intent Search Keywords for this portfolio page/project:\n\n${content}`;
        break;
      case 'reply_draft':
        userPrompt = `Draft a polite, professional, and enthusiastic client response email from Nikhil Singh addressing this inquiry/feedback. Offer next steps (e.g. Google Meet link, availability):\n\n${content}`;
        break;
      default:
        userPrompt = `Polish and improve this developer portfolio content for clarity, engagement, and authority:\n\n${content}`;
    }

    // 1. Try Groq
    if (groqKey) {
      try {
        const groqRes = await fetch(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${groqKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
              ],
              temperature: 0.6,
            }),
          }
        );

        if (groqRes.ok) {
          const data = await groqRes.json();
          const result = data.choices?.[0]?.message?.content;
          if (result) {
            return NextResponse.json({ success: true, result });
          }
        }
      } catch (err) {
        console.error('Groq enhance error:', err);
      }
    }

    // 2. Try Gemini
    if (geminiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;
        const geminiRes = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': geminiKey,
          },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
            generationConfig: { temperature: 0.6 },
          }),
        });

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (result) {
            return NextResponse.json({ success: true, result });
          }
        }
      } catch (err) {
        console.error('Gemini enhance error:', err);
      }
    }

    // 3. Smart local template fallback if keys aren't reachable
    let fallbackResult = '';
    if (promptType === 'resume_bullet') {
      fallbackResult = `• Architected resilient microservices utilizing Node.js, Fastify, and Redis, scaling transaction throughput by 45% with sub-100ms P99 latencies.\n• Engineered real-time flight search aggregator integrating American & United Airlines NDC 21.3 schema with 99.9% uptime.\n• Implemented automated CI/CD pipeline reducing deployment cycle from 40 mins to under 6 mins with zero-downtime rolling updates.`;
    } else if (promptType === 'reply_draft') {
      fallbackResult = `Hi there,\n\nThank you for reaching out! I would love to collaborate on this project. With 4+ years of experience in enterprise Next.js, airline NDC integrations, and high-concurrency systems, I am confident we can deliver outstanding results.\n\nAre you available for a quick 15-minute introductory call this week? Feel free to propose a time or book directly.\n\nBest regards,\nNikhil Singh\nSenior Full-Stack Developer`;
    } else {
      fallbackResult = `### High-Performance Enterprise Architecture\n\nDesigned and engineered a production-grade application utilizing modern Next.js 15 App Router, TypeScript, and distributed caching. Achieved sub-second page loads and 99.9% availability across high-volume traffic surges.`;
    }

    return NextResponse.json({
      success: true,
      result: fallbackResult,
      fallback: true,
    });
  } catch (error) {
    console.error('Error enhancing content:', error);
    return NextResponse.json(
      { error: 'Failed to process AI enhancement' },
      { status: 500 }
    );
  }
}
