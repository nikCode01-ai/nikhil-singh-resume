import {
  featuredProjects,
  person,
  professionalSummary,
  technicalSkills,
} from "@/lib/resume-data";

export const runtime = "nodejs";

function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (!headers.has("Cache-Control")) headers.set("Cache-Control", "no-store");

  return new Response(JSON.stringify(data), {
    ...init,
    headers,
  });
}

function buildSystemPrompt() {
  const skills = Object.entries(technicalSkills)
    .map(([k, v]) => `${k}: ${v.join(", ")}`)
    .join("\n");

  const projects = featuredProjects
    .slice(0, 4)
    .map((p) => {
      const url = "url" in p && p.url ? ` (${p.url})` : "";
      return `- ${p.name}${url}: ${p.description}`;
    })
    .join("\n");

  const lines = [
    `You are a helpful assistant for ${person.name}'s portfolio website.`,
    "Answer concisely and professionally.",
    "If asked for contact details, provide them.",
    "Prefer using the portfolio data below; if something is unknown, say so.",
    "",
    `Name: ${person.name}`,
    `Role: ${person.role}`,
    ...(person.location ? [`Location: ${person.location}`] : []),
    `Email: ${person.email}`,
    `Phone: ${person.phone}`,
    `LinkedIn: ${person.linkedinUrl}`,
    `GitLab: ${person.gitlabUrl} (${person.gitlabHandle})`,
    "",
    `Summary: ${professionalSummary}`,
    "",
    `Skills:\n${skills}`,
    "",
    `Featured projects:\n${projects}`,
  ];

  return lines.join("\n");
}

type OpenAIChatRole = "system" | "user" | "assistant";

type ChatMessage = {
  role: Exclude<OpenAIChatRole, "system">;
  content: string;
};

type OpenAIChatMessage = {
  role: OpenAIChatRole;
  content: string;
};

export async function POST(request: Request) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openAIKey = process.env.OPENAI_API_KEY;
  if (!geminiKey && !openAIKey) {
    return json(
      {
        error: "No AI API key is configured",
      },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return json({ error: "Invalid request body" }, { status: 400 });
  }

  const bodyRecord = body as Record<string, unknown>;
  const incomingMessages: unknown = bodyRecord.messages;
  const singleMessage: unknown = bodyRecord.message;

  let messages: ChatMessage[] = [];

  if (Array.isArray(incomingMessages)) {
    messages = incomingMessages
      .filter(
        (m): m is ChatMessage =>
          !!m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0,
      )
      .slice(-12);
  } else if (typeof singleMessage === "string" && singleMessage.trim()) {
    messages = [{ role: "user", content: singleMessage.trim() }];
  } else {
    return json({ error: "Missing messages" }, { status: 400 });
  }

  if (geminiKey) {
    const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      model,
    )}:generateContent`;

    const upstream = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": geminiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: buildSystemPrompt() }],
        },
        contents: messages.map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          temperature: 0.3,
        },
      }),
    });

    if (!upstream.ok) {
      return json(
        {
          error: "AI provider request failed",
        },
        { status: 502 },
      );
    }

    let data: unknown;
    try {
      data = await upstream.json();
    } catch {
      return json({ error: "AI provider returned invalid JSON" }, { status: 502 });
    }

    const reply = (data as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: unknown }>;
        };
      }>;
    })?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof reply !== "string" || !reply.trim()) {
      return json({ error: "AI provider returned empty response" }, { status: 502 });
    }

    return json({ reply: reply.trim() });
  }

  if (!openAIKey) {
    return json(
      {
        error: "OPENAI_API_KEY is not configured",
      },
      { status: 500 },
    );
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const openAIMessages: OpenAIChatMessage[] = [
    { role: "system", content: buildSystemPrompt() },
    ...messages,
  ];

  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAIKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      messages: openAIMessages,
    }),
  });

  if (!upstream.ok) {
    return json(
      {
        error: "AI provider request failed",
      },
      { status: 502 },
    );
  }

  let data: unknown;
  try {
    data = await upstream.json();
  } catch {
    return json({ error: "AI provider returned invalid JSON" }, { status: 502 });
  }

  if (typeof data !== "object" || data === null) {
    return json({ error: "AI provider returned invalid JSON" }, { status: 502 });
  }

  const reply = (data as {
    choices?: Array<{
      message?: {
        content?: unknown;
      };
    }>;
  })?.choices?.[0]?.message?.content;
  if (typeof reply !== "string" || !reply.trim()) {
    return json({ error: "AI provider returned empty response" }, { status: 502 });
  }

  return json({ reply: reply.trim() });
}
