import {
  featuredProjects,
  person,
  professionalSummary,
  technicalSkills,
} from '@/lib/resume-data';
import { createIssue, getIssue, listIssues } from '@/lib/github';

export const runtime = 'nodejs';

function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type'))
    headers.set('Content-Type', 'application/json');
  if (!headers.has('Cache-Control')) headers.set('Cache-Control', 'no-store');

  return new Response(JSON.stringify(data), {
    ...init,
    headers,
  });
}

function buildSystemPrompt() {
  const skills = Object.entries(technicalSkills)
    .map(([k, v]) => `${k}: ${v.join(', ')}`)
    .join('\n');

  const projects = featuredProjects
    .slice(0, 4)
    .map((p) => {
      const url = 'url' in p && p.url ? ` (${p.url})` : '';
      return `- ${p.name}${url}: ${p.description}`;
    })
    .join('\n');

  const githubToolsSection = `
You have access to GitHub issue management tools for this repository:
- create_issue: Create a new issue (requires title and body, auto-tagged with 'ai-generated')
- list_issues: View existing issues (optional: state='open'|'closed'|'all', limit)
- get_issue: Get details of a specific issue (requires issue_number)

When the user asks to create, view, or manage issues, use the appropriate tool.
Be helpful and proactive in using these tools when the user's intent involves issue management.
`;

  const lines = [
    `You are a helpful assistant for ${person.name}'s portfolio website.`,
    'Answer concisely and professionally.',
    'If asked for contact details, provide them.',
    'Prefer using the portfolio data below; if something is unknown, say so.',
    githubToolsSection,
    '',
    `Name: ${person.name}`,
    `Role: ${person.role}`,
    ...(person.location ? [`Location: ${person.location}`] : []),
    `Email: ${person.email}`,
    `Phone: ${person.phone}`,
    `LinkedIn: ${person.linkedinUrl}`,
    `GitLab: ${person.gitlabUrl} (${person.gitlabHandle})`,
    '',
    `Summary: ${professionalSummary}`,
    '',
    `Skills:\n${skills}`,
    '',
    `Featured projects:\n${projects}`,
  ];

  return lines.join('\n');
}

type OpenAIChatRole = 'system' | 'user' | 'assistant' | 'tool';

type ChatMessage = {
  role: Exclude<OpenAIChatRole, 'system' | 'tool'>;
  content: string;
};

type OpenAIChatMessage = {
  role: OpenAIChatRole;
  content: string;
  tool_call_id?: string;
  name?: string;
};

const TOOLS = [
  {
    type: 'function' as const,
    function: {
      name: 'create_issue',
      description: 'Create a new GitHub issue in the repository',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'The title of the issue',
          },
          body: {
            type: 'string',
            description: 'The body/description of the issue',
          },
        },
        required: ['title', 'body'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'list_issues',
      description: 'List GitHub issues in the repository',
      parameters: {
        type: 'object',
        properties: {
          state: {
            type: 'string',
            enum: ['open', 'closed', 'all'],
            description: 'Filter by issue state',
          },
          limit: {
            type: 'number',
            description: 'Maximum number of issues to return',
          },
        },
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_issue',
      description: 'Get details of a specific GitHub issue',
      parameters: {
        type: 'object',
        properties: {
          issue_number: {
            type: 'number',
            description: 'The issue number',
          },
        },
        required: ['issue_number'],
      },
    },
  },
];

async function executeToolCall(
  name: string,
  args: Record<string, unknown>
): Promise<string> {
  try {
    switch (name) {
      case 'create_issue': {
        const title = String(args.title || '');
        const body = String(args.body || '');
        if (!title || !body) {
          return 'Error: Both title and body are required for creating an issue.';
        }
        const result = await createIssue(title, body);
        return JSON.stringify({
          success: true,
          issue: result,
          message: `Issue #${result.number} created successfully`,
        });
      }
      case 'list_issues': {
        const state = (args.state as 'open' | 'closed' | 'all') || 'open';
        const limit = Number(args.limit) || 10;
        const result = await listIssues(state, limit);
        return JSON.stringify(result);
      }
      case 'get_issue': {
        const issueNumber = Number(args.issue_number);
        if (!issueNumber) {
          return 'Error: issue_number is required.';
        }
        const result = await getIssue(issueNumber);
        return JSON.stringify(result);
      }
      default:
        return `Error: Unknown tool '${name}'`;
    }
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

async function handleOpenAIWithTools(
  messages: OpenAIChatMessage[],
  openAIKey: string,
  baseUrl = 'https://api.openai.com/v1',
  modelName?: string
): Promise<string> {
  const model = modelName || process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const currentMessages = [...messages];

  for (let iteration = 0; iteration < 5; iteration++) {
    const upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        messages: currentMessages,
        tools: TOOLS,
        tool_choice: 'auto',
      }),
    });

    if (!upstream.ok) {
      throw new Error('AI provider request failed');
    }

    const data = (await upstream.json()) as {
      choices?: Array<{
        message?: {
          content?: string;
          tool_calls?: Array<{
            id: string;
            function: { name: string; arguments: string };
          }>;
        };
        finish_reason?: string;
      }>;
    };

    const choice = data.choices?.[0];
    if (!choice?.message) {
      throw new Error('AI provider returned invalid response');
    }

    const toolCalls = choice.message.tool_calls;

    if (toolCalls && toolCalls.length > 0) {
      currentMessages.push({
        role: 'assistant',
        content: choice.message.content || '',
        tool_call_id: undefined,
      });

      for (const toolCall of toolCalls) {
        let args: Record<string, unknown> = {};
        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch {
          args = {};
        }

        const result = await executeToolCall(toolCall.function.name, args);

        currentMessages.push({
          role: 'tool',
          content: result,
          tool_call_id: toolCall.id,
        } as OpenAIChatMessage);
      }
    } else {
      const reply = choice.message.content;
      if (typeof reply === 'string' && reply.trim()) {
        return reply.trim();
      }
      throw new Error('AI provider returned empty response');
    }
  }

  throw new Error('Maximum tool iterations reached');
}

type GeminiPart = Record<string, unknown>;

type GeminiContent = {
  role: 'user' | 'model';
  parts: GeminiPart[];
};

async function handleGeminiWithTools(
  messages: ChatMessage[],
  geminiKey: string,
  systemPrompt: string
): Promise<string> {
  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent`;

  const functionDeclarations = TOOLS.map((t) => ({
    name: t.function.name,
    description: t.function.description,
    parameters: t.function.parameters,
  }));

  const currentContents: GeminiContent[] = messages.map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));

  for (let iteration = 0; iteration < 5; iteration++) {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: currentContents,
        tools: [{ functionDeclarations }],
        generationConfig: {
          temperature: 0.3,
        },
      }),
    });

    if (!upstream.ok) {
      throw new Error('AI provider request failed');
    }

    const data = (await upstream.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<
            | { text?: string }
            | {
                functionCall?: { name: string; args?: Record<string, unknown> };
              }
          >;
        };
      }>;
    };

    const parts = data.candidates?.[0]?.content?.parts as
      | Array<
          | { text?: string }
          | { functionCall?: { name: string; args?: Record<string, unknown> } }
        >
      | undefined;
    if (!parts || parts.length === 0) {
      throw new Error('AI provider returned empty response');
    }

    const functionCall = parts.find(
      (
        p
      ): p is {
        functionCall: { name: string; args?: Record<string, unknown> };
      } => 'functionCall' in p && p.functionCall !== undefined
    );

    if (functionCall) {
      const { name, args = {} } = functionCall.functionCall;
      const result = await executeToolCall(name, args);

      const lastContent = currentContents[currentContents.length - 1];
      if (lastContent.role === 'user') {
        currentContents.push({
          role: 'model',
          parts: [{ functionCall }],
        });
      }

      currentContents.push({
        role: 'user',
        parts: [
          {
            functionResponse: {
              name,
              response: JSON.parse(result),
            },
          },
        ],
      });
    } else {
      const textPart = parts.find(
        (p): p is { text: string } => 'text' in p && typeof p.text === 'string'
      );
      if (textPart && textPart.text.trim()) {
        return textPart.text.trim();
      }
      throw new Error('AI provider returned empty response');
    }
  }

  throw new Error('Maximum tool iterations reached');
}

function hasImageContent(content: unknown): boolean {
  if (typeof content === 'string') return false;
  if (!Array.isArray(content)) return false;
  return content.some(
    (part) =>
      part &&
      typeof part === 'object' &&
      ('image_url' in part ||
        'image' in part ||
        part.type === 'image_url' ||
        part.type === 'image')
  );
}

function validateMessagesForImages(messages: unknown): string | null {
  if (!Array.isArray(messages)) return null;
  for (const msg of messages) {
    if (msg && typeof msg === 'object' && 'content' in msg) {
      if (hasImageContent(msg.content)) {
        return 'Image uploads are not supported. Please use text only.';
      }
    }
  }
  return null;
}

export async function POST(request: Request) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openAIKey = process.env.OPENAI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;
  if (!geminiKey && !openAIKey && !groqKey) {
    return json(
      {
        error: 'No AI API key is configured',
      },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return json({ error: 'Invalid request body' }, { status: 400 });
  }

  const bodyRecord = body as Record<string, unknown>;
  const incomingMessages: unknown = bodyRecord.messages;
  const singleMessage: unknown = bodyRecord.message;

  const imageError = validateMessagesForImages(incomingMessages);
  if (imageError) {
    return json({ error: imageError }, { status: 400 });
  }

  if (
    typeof singleMessage === 'object' &&
    singleMessage !== null &&
    'image' in singleMessage
  ) {
    return json(
      { error: 'Image uploads are not supported. Please use text only.' },
      { status: 400 }
    );
  }

  let messages: ChatMessage[] = [];

  if (Array.isArray(incomingMessages)) {
    messages = incomingMessages
      .filter(
        (m): m is ChatMessage =>
          !!m &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.trim().length > 0
      )
      .slice(-12);
  } else if (typeof singleMessage === 'string' && singleMessage.trim()) {
    messages = [{ role: 'user', content: singleMessage.trim() }];
  } else {
    return json({ error: 'Missing messages' }, { status: 400 });
  }

  try {
    if (geminiKey) {
      const reply = await handleGeminiWithTools(
        messages,
        geminiKey,
        buildSystemPrompt()
      );
      return json({ reply });
    }

    if (groqKey) {
      const groqMessages: OpenAIChatMessage[] = [
        { role: 'system', content: buildSystemPrompt() },
        ...messages,
      ];
      const reply = await handleOpenAIWithTools(
        groqMessages,
        groqKey,
        'https://api.groq.com/openai/v1',
        process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
      );
      return json({ reply });
    }

    if (openAIKey) {
      const openAIMessages: OpenAIChatMessage[] = [
        { role: 'system', content: buildSystemPrompt() },
        ...messages,
      ];
      const reply = await handleOpenAIWithTools(openAIMessages, openAIKey);
      return json({ reply });
    }

    return json({ error: 'No AI API key is configured' }, { status: 500 });
  } catch (error) {
    console.error('Chat API error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred';
    if (
      errorMessage.includes('image') &&
      errorMessage.includes('not support')
    ) {
      return json(
        { error: 'Image uploads are not supported. Please use text only.' },
        { status: 400 }
      );
    }
    return json({ error: errorMessage }, { status: 500 });
  }
}
