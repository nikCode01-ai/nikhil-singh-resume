'use client';

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Bot, Send, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  featuredProjects,
  person,
  professionalSummary,
  technicalSkills,
} from '@/lib/resume-data';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type MenuKey = 'main' | 'skills' | 'projects' | 'contact' | 'resume';

type MenuOption = {
  key: string;
  label: string;
  action: () => void;
};

type ChatMode = 'menu' | 'ai';

export function Chatbot() {
  const idBase = useId();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey>('main');
  const [mode, setMode] = useState<ChatMode>('menu');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: `${idBase}-welcome`,
      role: 'assistant',
      content: `Hi! Choose an option below to learn about ${person.name}, or switch to AI Chat to ask anything.`,
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const pushTurn = useCallback(
    (userText: string, assistantText: string) => {
      const now = Date.now();
      const userMessage: ChatMessage = {
        id: `${idBase}-u-${now}`,
        role: 'user',
        content: userText,
      };

      const botMessage: ChatMessage = {
        id: `${idBase}-a-${now + 1}`,
        role: 'assistant',
        content: assistantText,
      };

      setMessages((prev) => [...prev, userMessage, botMessage]);
    },
    [idBase]
  );

  const sendMessage = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `${idBase}-u-${Date.now()}`,
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const apiMessages = [...messages, userMessage]
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(-12)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const botMessage: ChatMessage = {
        id: `${idBase}-a-${Date.now() + 1}`,
        role: 'assistant',
        content: data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: `${idBase}-a-${Date.now() + 1}`,
        role: 'assistant',
        content: `Sorry, something went wrong. ${err instanceof Error ? err.message : 'Please try again later.'}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages, idBase]);

  const openResume = useCallback(
    (template: '1' | '2', format: 'pdf' | 'docx') => {
      const url = `/api/resume?template=${template}&format=${format}&disposition=attachment`;
      window.open(url, '_blank', 'noopener,noreferrer');
    },
    []
  );

  const menuOptions = useMemo<MenuOption[]>(() => {
    const skillsEntries = Object.entries(technicalSkills) as Array<
      [string, string[]]
    >;

    if (menu === 'skills') {
      return [
        ...skillsEntries.map(([category, skills]) => ({
          key: `skill-${category}`,
          label: category,
          action: () => {
            pushTurn(category, skills.join(', '));
          },
        })),
        {
          key: 'back-main',
          label: 'Back',
          action: () => setMenu('main'),
        },
      ];
    }

    if (menu === 'projects') {
      const projectOptions: MenuOption[] = featuredProjects.map((p) => ({
        key: `project-${p.name}`,
        label: p.name,
        action: () => {
          const lines = [p.description];
          if (p.tech?.length) lines.push(`Tech: ${p.tech.join(', ')}`);
          if ('url' in p && p.url) lines.push(p.url);
          if ('date' in p && p.date) lines.push(p.date);
          pushTurn(p.name, lines.join('\n'));
        },
      }));

      return [
        ...projectOptions,
        {
          key: 'back-main',
          label: 'Back',
          action: () => setMenu('main'),
        },
      ];
    }

    if (menu === 'contact') {
      const options: MenuOption[] = [
        {
          key: 'email',
          label: 'Email',
          action: () => pushTurn('Email', person.email),
        },
        {
          key: 'phone',
          label: 'Phone',
          action: () => pushTurn('Phone', person.phone),
        },
        {
          key: 'linkedin',
          label: 'LinkedIn',
          action: () => {
            pushTurn('LinkedIn', person.linkedinUrl);
            window.open(person.linkedinUrl, '_blank', 'noopener,noreferrer');
          },
        },
        {
          key: 'gitlab',
          label: 'GitLab',
          action: () => {
            pushTurn('GitLab', `${person.gitlabUrl} (${person.gitlabHandle})`);
            window.open(person.gitlabUrl, '_blank', 'noopener,noreferrer');
          },
        },
      ];

      if (person.location) {
        options.push({
          key: 'location',
          label: 'Location',
          action: () => pushTurn('Location', person.location),
        });
      }

      options.push({
        key: 'back-main',
        label: 'Back',
        action: () => setMenu('main'),
      });

      return options;
    }

    if (menu === 'resume') {
      return [
        {
          key: 'pdf-t1',
          label: 'Download PDF (Template 1)',
          action: () => {
            pushTurn('Download PDF (Template 1)', 'Opening download...');
            openResume('1', 'pdf');
          },
        },
        {
          key: 'pdf-t2',
          label: 'Download PDF (Template 2)',
          action: () => {
            pushTurn('Download PDF (Template 2)', 'Opening download...');
            openResume('2', 'pdf');
          },
        },
        {
          key: 'docx-t1',
          label: 'Download DOCX (Template 1)',
          action: () => {
            pushTurn('Download DOCX (Template 1)', 'Opening download...');
            openResume('1', 'docx');
          },
        },
        {
          key: 'docx-t2',
          label: 'Download DOCX (Template 2)',
          action: () => {
            pushTurn('Download DOCX (Template 2)', 'Opening download...');
            openResume('2', 'docx');
          },
        },
        {
          key: 'back-main',
          label: 'Back',
          action: () => setMenu('main'),
        },
      ];
    }

    return [
      {
        key: 'about',
        label: 'About / Summary',
        action: () => pushTurn('About / Summary', professionalSummary),
      },
      {
        key: 'skills',
        label: 'Skills',
        action: () => {
          pushTurn('Skills', 'Choose a skill category:');
          setMenu('skills');
        },
      },
      {
        key: 'projects',
        label: 'Projects',
        action: () => {
          pushTurn('Projects', 'Choose a project:');
          setMenu('projects');
        },
      },
      {
        key: 'contact',
        label: 'Contact',
        action: () => {
          pushTurn('Contact', 'Choose a contact method:');
          setMenu('contact');
        },
      },
      {
        key: 'resume',
        label: 'Download Resume',
        action: () => {
          pushTurn('Download Resume', 'Choose a format:');
          setMenu('resume');
        },
      },
    ];
  }, [menu, openResume, pushTurn]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [open, messages.length]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open && mode === 'ai') {
      inputRef.current?.focus();
    }
  }, [open, mode]);

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      {open ? (
        <div
          role="dialog"
          aria-label="Chatbot"
          className={cn(
            'flex h-[540px] max-h-[75vh] w-[92vw] max-w-[420px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10',
            'origin-bottom-right animate-fade-up',
            'dark:bg-slate-950 dark:ring-white/10'
          )}
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-gradient-to-r from-brand-green to-brand-greenDark px-4 py-3 text-white">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">Ask Nikhil</div>
              <div className="text-xs text-white/80">
                {mode === 'ai'
                  ? 'AI-powered answers'
                  : 'Quick answers from this portfolio'}
              </div>
            </div>

            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-full',
                'bg-white/10 text-white transition-colors hover:bg-white/20',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-greenDark'
              )}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={listRef}
            className="flex-1 overflow-y-auto bg-slate-50 px-4 py-3 dark:bg-slate-900/40"
          >
            <div className="space-y-2">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    'flex',
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[86%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm',
                      m.role === 'user'
                        ? 'rounded-br-md bg-brand-green text-white'
                        : 'rounded-bl-md bg-white text-slate-900 ring-1 ring-black/5 dark:bg-slate-950 dark:text-slate-100 dark:ring-white/10'
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-bl-md rounded-2xl bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-black/5 dark:bg-slate-950 dark:ring-white/10">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white/90 p-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
            <div className="mb-2 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setMode('menu');
                  setMenu('main');
                }}
                className={cn(
                  'flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
                  mode === 'menu'
                    ? 'bg-brand-green text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                )}
              >
                Menu
              </button>
              <button
                type="button"
                onClick={() => setMode('ai')}
                className={cn(
                  'flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
                  mode === 'ai'
                    ? 'bg-brand-green text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                )}
              >
                AI Chat
              </button>
            </div>

            {mode === 'menu' ? (
              <div className="flex max-h-28 flex-wrap gap-2 overflow-y-auto pr-1">
                {menuOptions.map((o) => (
                  <button
                    key={o.key}
                    type="button"
                    onClick={o.action}
                    className={cn(
                      'inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm',
                      'transition-colors hover:bg-slate-50 active:scale-[0.98]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                      'dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus-visible:ring-offset-slate-950'
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className={cn(
                    'flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400',
                    'focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500',
                    'dark:focus:border-brand-green dark:focus:ring-brand-green/20'
                  )}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className={cn(
                    'inline-flex h-9 w-9 items-center justify-center rounded-full',
                    'bg-brand-green text-white shadow-sm transition-colors hover:bg-brand-greenDark',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-white'
                  )}
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}

      {!open ? (
        <button
          type="button"
          aria-label={open ? 'Close chat' : 'Open chat'}
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className={cn(
            'group relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full',
            'bg-gradient-to-br from-brand-green to-brand-greenDark text-white',
            'shadow-xl ring-1 ring-black/10',
            'transition-all duration-200 ease-out',
            'hover:-translate-y-0.5 hover:shadow-2xl',
            'active:translate-y-0 active:scale-[0.98]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-white',
            'dark:ring-white/10 dark:focus-visible:ring-offset-slate-950'
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 rounded-full',
              'bg-white/15 opacity-0 transition-opacity duration-200',
              'group-hover:opacity-100'
            )}
          />

          <Bot className="relative h-6 w-6" />
        </button>
      ) : null}
    </div>
  );
}
