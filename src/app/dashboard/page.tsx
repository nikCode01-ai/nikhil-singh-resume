'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Clock,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Play,
  RefreshCw,
  Send,
  Square,
  Terminal,
  Upload,
  XCircle,
  AlertCircle,
} from 'lucide-react';

interface Message {
  id: string;
  from: 'user' | 'ai';
  content: string;
  timestamp: string;
  type: 'requirement' | 'question' | 'status' | 'reply';
}

interface Phase {
  id: string;
  name: string;
  status: 'done' | 'in-progress' | 'pending' | 'error';
  progress: number;
  description: string;
  files: string[];
  lastModified: string;
}

interface PhaseData {
  phases: Phase[];
  requirements: string;
  summary: {
    totalPhases: number;
    completed: number;
    inProgress: number;
    pending: number;
    overallProgress: number;
  };
}

interface DocFile {
  name: string;
  slug: string;
  title: string;
  description: string;
  lines: number;
  size: string;
  status: 'pass' | 'warn' | 'pending' | 'error';
  progress: number;
  category: string;
  lastModified: string;
}

interface DashboardData {
  docs: DocFile[];
  summary: {
    totalFiles: number;
    passCount: number;
    errorCount: number;
    pendingCount: number;
    warnCount: number;
    overallProgress: number;
    timestamp: string;
  };
}

const phaseStatusStyles: Record<string, string> = {
  done: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  'in-progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  pending: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  error: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const phaseIcons: Record<string, string> = {
  done: '✅',
  'in-progress': '🔄',
  pending: '⏳',
  error: '❌',
};

const docStatusStyles: Record<string, string> = {
  pass: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  warn: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  pending: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  error: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const commands = [
  { key: 'build', label: 'Build', color: 'bg-violet-500 hover:bg-violet-600' },
  { key: 'lint', label: 'Lint', color: 'bg-sky-500 hover:bg-sky-600' },
  {
    key: 'typecheck',
    label: 'TypeCheck',
    color: 'bg-amber-500 hover:bg-amber-600',
  },
  {
    key: 'format',
    label: 'Format',
    color: 'bg-emerald-500 hover:bg-emerald-600',
  },
  {
    key: 'verify-doc',
    label: 'Verify Doc',
    color: 'bg-rose-500 hover:bg-rose-600',
  },
  {
    key: 'list-docs',
    label: 'List Docs',
    color: 'bg-teal-500 hover:bg-teal-600',
  },
];

type TaskStatus = 'idle' | 'running' | 'success' | 'error';

export default function DashboardPage() {
  const [phaseData, setPhaseData] = useState<PhaseData | null>(null);
  const [docData, setDocData] = useState<DashboardData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [taskStatus, setTaskStatus] = useState<Record<string, TaskStatus>>({});
  const [log, setLog] = useState<string[]>([]);
  const [requirements, setRequirements] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<
    'phases' | 'docs' | 'req' | 'log' | 'messages'
  >('phases');
  const logRef = useRef<HTMLPreElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchPhaseData = useCallback(async () => {
    try {
      const res = await fetch('/api/phases');
      if (!res.ok) throw new Error(`Phase API failed: ${res.status}`);
      const json = await res.json();
      setPhaseData(json);
      if (json.requirements) {
        setRequirements(json.requirements);
      }
    } catch (error) {
      console.error('Failed to fetch phase data', error);
      setPhaseData({
        phases: [],
        requirements: '',
        summary: {
          totalPhases: 0,
          completed: 0,
          inProgress: 0,
          pending: 0,
          overallProgress: 0,
        },
      });
    }
  }, []);

  const fetchDocData = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard');
      if (!res.ok) throw new Error(`Dashboard API failed: ${res.status}`);
      const json = await res.json();
      setDocData(json);
    } catch (error) {
      console.error('Failed to fetch doc data', error);
      setDocData({
        docs: [],
        summary: {
          totalFiles: 0,
          passCount: 0,
          errorCount: 0,
          pendingCount: 0,
          warnCount: 0,
          overallProgress: 0,
          timestamp: new Date().toISOString(),
        },
      });
    }
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch('/api/messages');
      if (!res.ok) throw new Error(`Messages API failed: ${res.status}`);
      const json = await res.json();
      setMessages(json.messages || []);
    } catch (error) {
      console.error('Failed to fetch messages', error);
      setMessages([]);
    }
  }, []);

  const fetchAll = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchPhaseData(), fetchDocData(), fetchMessages()]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [fetchPhaseData, fetchDocData, fetchMessages]);

  useEffect(() => {
    void fetchAll();
    // Auto-refresh every 5 seconds for messages
    const interval = setInterval(() => {
      void fetchMessages();
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchAll, fetchMessages]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const runCommand = useCallback(async (cmd: string) => {
    setTaskStatus((p) => ({ ...p, [cmd]: 'running' }));
    setLog((p) => [...p, `\n$ ${cmd}\n`]);
    setActiveTab('log');

    try {
      const res = await fetch(`/api/run?cmd=${cmd}`);
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split('\n\n');
        buffer = events.pop()!;

        for (const evt of events) {
          const type = evt.match(/^event: (.+)$/m)?.[1];
          const payload = evt.match(/^data: (.+)$/m)?.[1];
          if (!type || !payload) continue;

          if (type === 'stdout' || type === 'stderr') {
            setLog((p) => [...p, payload]);
          } else if (type === 'done') {
            const { success } = JSON.parse(payload);
            setTaskStatus((p) => ({
              ...p,
              [cmd]: success ? 'success' : 'error',
            }));
            setLog((p) => [
              ...p,
              success ? '\n✅ Command completed\n' : '\n❌ Command failed\n',
            ]);
          }
        }
      }
    } catch {
      setTaskStatus((p) => ({ ...p, [cmd]: 'error' }));
      setLog((p) => [...p, `\n❌ Failed to run ${cmd}\n`]);
    }
  }, []);

  const stopAll = useCallback(() => {
    setTaskStatus({});
    setLog([]);
  }, []);

  const sendMessage = useCallback(async () => {
    if (!newMessage.trim()) return;

    const msg = newMessage.trim();
    setNewMessage('');

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'user',
          content: msg,
          type: 'requirement',
        }),
      });
      await fetchMessages();
    } catch {
      console.error('Failed to send message');
    }
  }, [newMessage, fetchMessages]);

  const handleRequirementsSubmit = useCallback(async () => {
    if (!requirements.trim()) return;

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'user',
          content: requirements,
          type: 'requirement',
        }),
      });
      setRequirements('');
      await fetchMessages();
      setActiveTab('messages');
    } catch {
      console.error('Failed to submit requirements');
    }
  }, [requirements, fetchMessages]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-12 h-12 mx-auto mb-3">
            <div className="absolute inset-0 rounded-full border-2 border-brand-green/20 dark:border-brand-yellow/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-green dark:border-t-brand-yellow animate-spin" />
          </div>
          <p className="text-sm text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const phases = phaseData?.phases || [];
  const phaseSummary = phaseData?.summary;
  const docs = docData?.docs || [];
  const overallProgress = phaseSummary?.overallProgress || 0;

  return (
    <main className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10 dark:bg-brand-yellow/10">
                  <LayoutDashboard className="h-5 w-5 text-brand-green dark:text-brand-yellow" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                    Process Dashboard
                  </h1>
                  <p className="text-xs text-slate-400">
                    Live tracking • {phases.length} phases • {docs.length} docs
                    • {messages.length} messages
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchAll}
                  disabled={refreshing}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  <RefreshCw
                    className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`}
                  />
                  Refresh
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 rounded-lg bg-brand-green px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-greenDark dark:bg-brand-yellow dark:text-slate-900 transition-colors"
                >
                  Home <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              {
                label: 'Completed',
                value: phaseSummary?.completed || 0,
                color: 'text-emerald-500',
                icon: CheckCircle2,
              },
              {
                label: 'In Progress',
                value: phaseSummary?.inProgress || 0,
                color: 'text-blue-500',
                icon: Clock,
              },
              {
                label: 'Pending',
                value: phaseSummary?.pending || 0,
                color: 'text-slate-400',
                icon: AlertCircle,
              },
              {
                label: 'Docs',
                value: docs.length,
                color: 'text-brand-green dark:text-brand-yellow',
                icon: FileText,
              },
              {
                label: 'Messages',
                value: messages.length,
                color: 'text-purple-500',
                icon: MessageSquare,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-slate-200/70 bg-white/80 p-3 text-center backdrop-blur dark:border-white/10 dark:bg-slate-900/70"
              >
                <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[11px] text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Overall Progress</span>
              <span className="font-bold text-brand-green dark:text-brand-yellow">
                {overallProgress}%
              </span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.8 }}
                className="h-full bg-gradient-to-r from-brand-green to-emerald-400 dark:from-brand-yellow dark:to-amber-400 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto">
            {[
              {
                key: 'messages' as const,
                label: 'Messages',
                count: messages.length,
                icon: MessageSquare,
              },
              {
                key: 'phases' as const,
                label: 'Phases',
                count: phases.length,
                icon: Clock,
              },
              {
                key: 'docs' as const,
                label: 'Docs',
                count: docs.length,
                icon: FileText,
              },
              {
                key: 'req' as const,
                label: 'Requirements',
                count: 0,
                icon: Upload,
              },
              {
                key: 'log' as const,
                label: 'Live Log',
                count: log.length,
                icon: Terminal,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
                {tab.count > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-600">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-brand-green dark:text-brand-yellow" />
                Messages ({messages.length})
              </h2>

              {/* Messages List */}
              <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.from === 'user'
                          ? 'bg-brand-green dark:bg-brand-yellow text-white dark:text-slate-900 rounded-br-md'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-md'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-bold opacity-70">
                          {msg.from === 'user' ? 'You' : 'AI'}
                        </span>
                        <span className="text-[10px] opacity-50">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green dark:focus:ring-brand-yellow focus:ring-offset-2"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-greenDark dark:bg-brand-yellow dark:text-slate-900 transition-colors disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Phases Tab */}
        {activeTab === 'phases' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-brand-green dark:text-brand-yellow" />
                Phases ({phases.length})
              </h2>
              <div className="space-y-3">
                {phases.map((phase) => (
                  <div
                    key={phase.id}
                    className="rounded-xl border border-slate-200/70 bg-white/50 p-4 dark:border-white/5 dark:bg-slate-800/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {phaseIcons[phase.status]}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-white">
                            {phase.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {phase.description}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${phaseStatusStyles[phase.status]}`}
                      >
                        {phase.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-green dark:bg-brand-yellow rounded-full transition-all duration-500"
                          style={{ width: `${phase.progress}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">
                        {phase.progress}%
                      </span>
                    </div>
                    {phase.files.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {phase.files.slice(0, 3).map((f) => (
                          <span
                            key={f}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 font-mono"
                          >
                            {f}
                          </span>
                        ))}
                        {phase.files.length > 3 && (
                          <span className="text-[10px] text-slate-400">
                            +{phase.files.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {phases.length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-sm">
                    No phases found in phases.md
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Docs Tab */}
        {activeTab === 'docs' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-green dark:text-brand-yellow" />
                  Docs ({docs.length})
                </h2>
                <div className="flex gap-2">
                  {(['pass', 'warn', 'pending', 'error'] as const).map((s) => {
                    const count = docs.filter((d) => d.status === s).length;
                    if (count === 0) return null;
                    return (
                      <span
                        key={s}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${docStatusStyles[s]}`}
                      >
                        {count} {s.toUpperCase()}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2">
                {docs.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-white/50 p-3 hover:border-slate-300 dark:border-white/5 dark:bg-slate-800/50 dark:hover:border-white/15 transition-all group"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-800 dark:text-white truncate group-hover:text-brand-green dark:group-hover:text-brand-yellow transition-colors">
                        {doc.title}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {doc.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                      <span className="text-[10px] text-slate-400">
                        {doc.lines} lines • {doc.size}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${docStatusStyles[doc.status]}`}
                      >
                        {doc.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Requirements Tab */}
        {activeTab === 'req' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Upload className="h-4 w-4 text-brand-green dark:text-brand-yellow" />
                Submit Requirements
              </h2>
              <p className="text-xs text-slate-400 mb-3">
                Describe what you need. It will be sent as a message and I will
                process it.
              </p>
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder={`# New Requirement\n\nDescribe what you want here...\n\nExamples:\n- Convert Hindi docx to English\n- Add new page for services\n- Fix SEO issues\n- Create new blog post`}
                className="w-full h-48 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-sm text-slate-800 dark:text-slate-200 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-brand-green dark:focus:ring-brand-yellow focus:ring-offset-2"
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleRequirementsSubmit}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-green px-4 py-2 text-xs font-semibold text-white hover:bg-brand-greenDark dark:bg-brand-yellow dark:text-slate-900 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                  Submit Requirement
                </button>
                <button
                  onClick={() => setRequirements('')}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Live Log Tab */}
        {activeTab === 'log' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-brand-green dark:text-brand-yellow" />
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    Live Log
                  </h2>
                </div>
                <button
                  onClick={stopAll}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Square className="h-3 w-3" /> Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {commands.map((cmd) => {
                  const st = taskStatus[cmd.key] || 'idle';
                  return (
                    <button
                      key={cmd.key}
                      onClick={() => runCommand(cmd.key)}
                      disabled={st === 'running'}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed ${cmd.color}`}
                    >
                      {st === 'running' ? (
                        <div className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      ) : st === 'success' ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : st === 'error' ? (
                        <XCircle className="h-3.5 w-3.5" />
                      ) : (
                        <Play className="h-3 w-3" />
                      )}
                      {cmd.label}
                    </button>
                  );
                })}
              </div>
              {log.length > 0 ? (
                <pre
                  ref={logRef}
                  className="max-h-96 overflow-y-auto rounded-xl bg-slate-950 p-4 text-[11px] leading-relaxed text-slate-300 font-mono whitespace-pre-wrap"
                >
                  {log.join('')}
                </pre>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
                  <Terminal className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">
                    Click a button above to run a command
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Output will appear here in real-time
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Quick Commands (always visible) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-brand-green dark:text-brand-yellow" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Quick Commands
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {commands.map((cmd) => {
                const st = taskStatus[cmd.key] || 'idle';
                return (
                  <button
                    key={cmd.key}
                    onClick={() => runCommand(cmd.key)}
                    disabled={st === 'running'}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed ${cmd.color}`}
                  >
                    {st === 'running' ? (
                      <div className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : st === 'success' ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : st === 'error' ? (
                      <XCircle className="h-3.5 w-3.5" />
                    ) : (
                      <Play className="h-3 w-3" />
                    )}
                    {cmd.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <p className="text-center text-[11px] text-slate-400 pb-4">
          Dashboard by Nikhil Singh • Messages auto-refresh every 5s
        </p>
      </div>
    </main>
  );
}
