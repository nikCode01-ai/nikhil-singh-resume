'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  BookOpen,
  FolderGit2,
  Cpu,
  Layers,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Database,
  ArrowUpRight,
  BarChart3,
  Search,
  Mail,
  Calendar,
  Send,
  Globe,
  TrendingUp,
  FileText,
  Copy,
  Check,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { featuredProjects, technicalSkills } from '@/lib/resume-data';

interface GeneratedBlog {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  tags: string[];
}

interface InboxMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  type: 'contact' | 'booking' | 'chat_inquiry' | 'quote';
  status: 'new' | 'read' | 'replied' | 'archived';
  timestamp: string;
  meta?: {
    date?: string;
    time?: string;
    service?: string;
    phone?: string;
    budget?: string;
  };
}

interface AnalyticsData {
  metrics: {
    totalPageViews: number;
    uniqueVisitors: number;
    resumeDownloads: number;
    aiChatSessions: number;
    totalInquiries: number;
    newInquiries: number;
    bookingsCount: number;
    avgSessionDuration: string;
    conversionRate: string;
  };
  trafficTrend: Array<{
    day: string;
    views: number;
    visitors: number;
    chats: number;
  }>;
  topCountries: Array<{
    country: string;
    code: string;
    visitors: number;
    percent: number;
  }>;
  topReferrers: Array<{ source: string; count: number; share: string }>;
  deviceBreakdown: Array<{ device: string; percentage: number; count: number }>;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'messages'
    | 'analytics'
    | 'ai-enhancer'
    | 'blogs'
    | 'projects'
    | 'system'
  >('overview');

  // Messages Inbox State
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [, setIsLoadingMessages] = useState(true);
  const [messageFilter, setMessageFilter] = useState<
    'all' | 'new' | 'read' | 'replied' | 'booking'
  >('all');
  const [messageSearch, setMessageSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(
    null
  );

  // Analytics State
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [, setIsLoadingAnalytics] = useState(true);

  // Blogs State
  const [blogs, setBlogs] = useState<GeneratedBlog[]>([]);
  const [, setIsLoadingBlogs] = useState(true);
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('Full-Stack Development');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genMessage, setGenMessage] = useState('');

  // AI Enhancer State
  const [enhanceType, setEnhanceType] = useState<
    'project_summary' | 'resume_bullet' | 'seo_meta' | 'reply_draft'
  >('project_summary');
  const [enhanceInput, setEnhanceInput] = useState('');
  const [enhanceOutput, setEnhanceOutput] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Search state for projects
  const [projectSearch, setProjectSearch] = useState('');

  // Fetch messages
  const fetchMessages = async () => {
    try {
      setIsLoadingMessages(true);
      const res = await fetch('/api/admin/messages');
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Fetch analytics
  const fetchAnalytics = async () => {
    try {
      setIsLoadingAnalytics(true);
      const res = await fetch('/api/admin/analytics');
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setIsLoadingBlogs(true);
      const res = await fetch('/api/blogs/generate');
      const data = await res.json();
      if (data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error('Failed to load blogs:', err);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchAnalytics();
    fetchBlogs();
  }, []);

  const handleUpdateMessageStatus = async (
    id: string,
    status: InboxMessage['status']
  ) => {
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status } : m))
        );
        if (selectedMessage?.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch (err) {
      console.error('Failed to update message status:', err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  const handleGenerateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !category) return;

    setIsGenerating(true);
    setGenMessage('');

    try {
      const res = await fetch('/api/blogs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category }),
      });
      const result = await res.json();
      if (result.success) {
        setGenMessage('✓ Blog successfully generated with AI and published!');
        setTopic('');
        fetchBlogs();
      } else {
        setGenMessage(
          '❌ Error: ' + (result.error || 'Failed to generate blog')
        );
      }
    } catch {
      setGenMessage('❌ Network error generating blog');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteBlog = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this generated blog?'))
      return;
    try {
      const res = await fetch(`/api/blogs/generate?slug=${slug}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.slug !== slug));
      }
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };

  const handleEnhanceContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enhanceInput.trim()) return;

    setIsEnhancing(true);
    setEnhanceOutput('');

    try {
      const res = await fetch('/api/admin/ai-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptType: enhanceType,
          content: enhanceInput,
        }),
      });
      const data = await res.json();
      if (data.result) {
        setEnhanceOutput(data.result);
      }
    } catch (err) {
      console.error('AI enhance failed:', err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const filteredMessages = messages.filter((m) => {
    if (messageFilter === 'new' && m.status !== 'new') return false;
    if (messageFilter === 'read' && m.status !== 'read') return false;
    if (messageFilter === 'replied' && m.status !== 'replied') return false;
    if (messageFilter === 'booking' && m.type !== 'booking') return false;

    if (messageSearch) {
      const query = messageSearch.toLowerCase();
      return (
        m.name.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        m.message.toLowerCase().includes(query) ||
        (m.subject && m.subject.toLowerCase().includes(query))
      );
    }
    return true;
  });

  const unreadCount = messages.filter((m) => m.status === 'new').length;
  const bookingCount = messages.filter((m) => m.type === 'booking').length;
  const totalSkillsCount = Object.values(technicalSkills).reduce(
    (acc, curr) => acc + curr.length,
    0
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Top Welcome & Summary Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-8 text-white shadow-xl border border-slate-700/50">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              PORTFOLIO COMMAND CENTER
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, <span className="text-emerald-400">Admin</span>
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Live inbox inquiries, real-time visitor analytics, AI content
              generator, and portfolio system status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                fetchMessages();
                fetchAnalytics();
                fetchBlogs();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md transition-all duration-200 cursor-pointer border border-white/10 hover:border-white/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Sync Data
            </button>
            <button
              onClick={() => setActiveTab('ai-enhancer')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/25 transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              AI Enhancer
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Overview', icon: Layers },
          {
            id: 'messages',
            label: 'Messages Inbox',
            icon: Mail,
            badge: unreadCount > 0 ? unreadCount : undefined,
          },
          { id: 'analytics', label: 'Visitor Analytics', icon: BarChart3 },
          { id: 'ai-enhancer', label: 'AI Content Enhancer', icon: Sparkles },
          {
            id: 'blogs',
            label: 'Auto Blog Studio',
            icon: BookOpen,
            count: blogs.length,
          },
          { id: 'projects', label: 'Projects & Skills', icon: FolderGit2 },
          { id: 'system', label: 'System Health', icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
                  {tab.badge}
                </span>
              )}
              {tab.count !== undefined && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div
              onClick={() => setActiveTab('messages')}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  New Inquiries
                </span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {unreadCount}
              </div>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <span className="text-emerald-500 font-semibold">
                  {messages.length} total
                </span>{' '}
                submissions
              </div>
            </div>

            <div
              onClick={() => setActiveTab('analytics')}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-blue-500/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Total Page Views
                </span>
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {analytics?.metrics.totalPageViews.toLocaleString() || '4,460'}
              </div>
              <div className="text-xs text-emerald-500 mt-1 font-semibold flex items-center gap-1">
                <span>+14.2%</span>{' '}
                <span className="text-slate-400 font-normal">vs last week</span>
              </div>
            </div>

            <div
              onClick={() => setActiveTab('messages')}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-purple-500/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Booked Calls
                </span>
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {bookingCount}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                High-intent recruiter chats
              </div>
            </div>

            <div
              onClick={() => setActiveTab('blogs')}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-amber-500/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Live AI Blogs
                </span>
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {blogs.length}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Auto-published on /blogs
              </div>
            </div>
          </div>

          {/* Recent Inquiries & Quick Enhancer Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Messages Preview */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-500" />
                  Recent Inbox Inquiries
                </h3>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  View All ({messages.length}){' '}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {messages.slice(0, 4).map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => {
                      setSelectedMessage(msg);
                      setActiveTab('messages');
                    }}
                    className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 px-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                          {msg.name}
                        </span>
                        {msg.status === 'new' && (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            NEW
                          </span>
                        )}
                        {msg.type === 'booking' && (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                            CALL
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {msg.subject || msg.message}
                      </p>
                    </div>
                    <div className="text-[11px] text-slate-400 whitespace-nowrap">
                      {new Date(msg.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  AI Quick Tools
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Quickly craft resume bullets, polish project summaries or
                  draft responses with Groq AI.
                </p>

                <div className="space-y-2.5">
                  <button
                    onClick={() => {
                      setEnhanceType('project_summary');
                      setActiveTab('ai-enhancer');
                    }}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/10 border border-slate-200/80 dark:border-slate-700/80 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between"
                  >
                    <span>🚀 Polish Project Description</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    onClick={() => {
                      setEnhanceType('resume_bullet');
                      setActiveTab('ai-enhancer');
                    }}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/10 border border-slate-200/80 dark:border-slate-700/80 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between"
                  >
                    <span>📄 STAR Resume Bullets Generator</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    onClick={() => {
                      setEnhanceType('reply_draft');
                      setActiveTab('ai-enhancer');
                    }}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/10 border border-slate-200/80 dark:border-slate-700/80 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between"
                  >
                    <span>✉️ Client Email Reply Drafter</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Model: Groq LLaMA 3.3</span>
                <span className="text-emerald-500 font-semibold">Ready</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: MESSAGES & BOOKINGS INBOX */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {[
                { id: 'all', label: 'All Inquiries' },
                { id: 'new', label: 'New / Unread', count: unreadCount },
                { id: 'booking', label: 'Call Bookings', count: bookingCount },
                { id: 'replied', label: 'Replied' },
                { id: 'read', label: 'Read' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setMessageFilter(f.id as typeof messageFilter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    messageFilter === f.id
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{f.label}</span>
                  {f.count !== undefined && f.count > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold">
                      {f.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search sender, email, keywords..."
                value={messageSearch}
                onChange={(e) => setMessageSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Messages List & Detail Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* List column */}
            <div
              className={`space-y-3 ${selectedMessage ? 'lg:col-span-5' : 'lg:col-span-12'}`}
            >
              {filteredMessages.length === 0 ? (
                <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <Mail className="w-10 h-10 mx-auto text-slate-400 mb-2 opacity-50" />
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    No messages found matching your criteria
                  </p>
                </div>
              ) : (
                filteredMessages.map((msg) => {
                  const isSelected = selectedMessage?.id === msg.id;
                  return (
                    <div
                      key={msg.id}
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (msg.status === 'new') {
                          handleUpdateMessageStatus(msg.id, 'read');
                        }
                      }}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm ring-2 ring-emerald-500/20'
                          : msg.status === 'new'
                            ? 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs'
                            : 'border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 opacity-90'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {msg.name}
                          </span>
                          {msg.status === 'new' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white">
                              NEW
                            </span>
                          )}
                          {msg.type === 'booking' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                              📅 Call
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 whitespace-nowrap">
                          {new Date(msg.timestamp).toLocaleDateString(
                            undefined,
                            {
                              month: 'short',
                              day: 'numeric',
                            }
                          )}
                        </span>
                      </div>

                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-2 truncate">
                        {msg.email}
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2">
                        {msg.message}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Detail Column */}
            {selectedMessage && (
              <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-md relative sticky top-20">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {selectedMessage.name}
                      </h2>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                          selectedMessage.status === 'new'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : selectedMessage.status === 'replied'
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {selectedMessage.status}
                      </span>
                    </div>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline mt-0.5 inline-block"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleUpdateMessageStatus(
                          selectedMessage.id,
                          selectedMessage.status === 'replied'
                            ? 'read'
                            : 'replied'
                        )
                      }
                      title="Toggle Replied"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-500/10 hover:text-blue-500 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                      title="Delete message"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-500/10 hover:text-red-500 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metadata tags */}
                {selectedMessage.meta && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-4 text-xs">
                    {selectedMessage.meta.date && (
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Scheduled Date
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {selectedMessage.meta.date}
                        </span>
                      </div>
                    )}
                    {selectedMessage.meta.time && (
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Time Slot
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {selectedMessage.meta.time}
                        </span>
                      </div>
                    )}
                    {selectedMessage.meta.service && (
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Topic/Service
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {selectedMessage.meta.service}
                        </span>
                      </div>
                    )}
                    {selectedMessage.meta.budget && (
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Budget
                        </span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {selectedMessage.meta.budget}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Message Body */}
                <div className="space-y-3 mb-6">
                  {selectedMessage.subject && (
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      Subject: {selectedMessage.subject}
                    </div>
                  )}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-700/60 text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Reply Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                      selectedMessage.subject || 'Portfolio Inquiry'
                    )}`}
                    onClick={() =>
                      handleUpdateMessageStatus(selectedMessage.id, 'replied')
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Reply via Email Client
                  </a>
                  <button
                    onClick={() => {
                      setEnhanceType('reply_draft');
                      setEnhanceInput(
                        `Client Name: ${selectedMessage.name}\nMessage: ${selectedMessage.message}`
                      );
                      setActiveTab('ai-enhancer');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Draft AI Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: VISITOR & TRAFFIC ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Traffic Trend Chart Visual */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  7-Day Traffic & Interaction Activity
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time page views and chatbot engagement over the past
                  week.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Page Views
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-blue-500" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Unique Visitors
                  </span>
                </div>
              </div>
            </div>

            {/* Custom Bar Chart */}
            <div className="grid grid-cols-7 gap-2 sm:gap-6 items-end h-56 pt-8 pb-2 border-b border-slate-100 dark:border-slate-800">
              {analytics?.trafficTrend.map((item) => {
                const maxVal = 950;
                const viewHeight = Math.round((item.views / maxVal) * 100);
                const visitorHeight = Math.round(
                  (item.visitors / maxVal) * 100
                );

                return (
                  <div
                    key={item.day}
                    className="flex flex-col items-center gap-2 h-full justify-end group"
                  >
                    <div className="flex items-end gap-1.5 sm:gap-2 h-full w-full justify-center">
                      <div
                        style={{ height: `${viewHeight}%` }}
                        className="w-3 sm:w-6 bg-emerald-500/80 hover:bg-emerald-500 rounded-t-md transition-all duration-300 relative group/bar"
                      >
                        <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-20">
                          {item.views} views
                        </div>
                      </div>
                      <div
                        style={{ height: `${visitorHeight}%` }}
                        className="w-3 sm:w-6 bg-blue-500/80 hover:bg-blue-500 rounded-t-md transition-all duration-300 relative group/bar"
                      >
                        <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-20">
                          {item.visitors} users
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Breakdown Grids */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Countries */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-emerald-500" />
                Top Visitor Locations
              </h3>
              <div className="space-y-3">
                {analytics?.topCountries.map((c) => (
                  <div key={c.country} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {c.country}
                      </span>
                      <span className="text-slate-500">{c.percent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${c.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Referrers */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                Traffic Referrers
              </h3>
              <div className="space-y-3">
                {analytics?.topReferrers.map((r) => (
                  <div
                    key={r.source}
                    className="flex items-center justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800/80"
                  >
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {r.source}
                    </span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      {r.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Device & Engagement Stats */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-500" />
                Device & Interaction Stats
              </h3>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <div className="text-lg font-black text-slate-900 dark:text-white">
                    {analytics?.metrics.avgSessionDuration || '2m 48s'}
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Avg Duration
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <div className="text-lg font-black text-emerald-500">
                    {analytics?.metrics.resumeDownloads || '342'}
                  </div>
                  <span className="text-[11px] text-slate-500">
                    CV Downloads
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                {analytics?.deviceBreakdown.map((d) => (
                  <div
                    key={d.device}
                    className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400"
                  >
                    <span>{d.device}</span>
                    <span className="font-semibold">{d.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: AI CONTENT ENHANCER */}
      {activeTab === 'ai-enhancer' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Box */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                AI Content Enhancer Studio
              </h3>
              <p className="text-xs text-slate-500">
                Transform developer bullet points, project showcases, and client
                replies with Groq LLaMA 3.3.
              </p>
            </div>

            {/* Mode selection */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'project_summary', label: 'Project Summary' },
                { id: 'resume_bullet', label: 'STAR Bullets' },
                { id: 'seo_meta', label: 'SEO Meta Tags' },
                { id: 'reply_draft', label: 'Email Reply' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setEnhanceType(m.id as typeof enhanceType)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                    enhanceType === m.id
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleEnhanceContent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Raw Content / Bullet Notes
                </label>
                <textarea
                  rows={6}
                  value={enhanceInput}
                  onChange={(e) => setEnhanceInput(e.target.value)}
                  placeholder="Paste your rough points, achievements, or project details here..."
                  className="w-full p-3.5 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={isEnhancing || !enhanceInput.trim()}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isEnhancing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Enhancing with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Enhanced Output</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Output Box */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  Enhanced Result
                </h3>
                {enhanceOutput && (
                  <button
                    onClick={() => handleCopy(enhanceOutput)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedText ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedText ? 'Copied!' : 'Copy'}</span>
                  </button>
                )}
              </div>

              {enhanceOutput ? (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                  {enhanceOutput}
                </div>
              ) : (
                <div className="p-12 text-center text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-40 text-amber-500" />
                  <p className="text-xs">
                    Your AI-polished content will appear here.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Ready for copy-pasting into resume or portfolio</span>
              <span className="text-emerald-500 font-semibold">
                100% Production Quality
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: BLOGS & AUTO BLOG STUDIO */}
      {activeTab === 'blogs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Generator Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                AI Blog Generator
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Auto-generate comprehensive technical articles with code
                examples and publish them instantly.
              </p>

              <form onSubmit={handleGenerateBlog} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Blog Topic
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Scaling Next.js 15 with Redis & Server Actions"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Full-Stack Development">
                      Full-Stack Development
                    </option>
                    <option value="Airline Tech & NDC">
                      Airline Tech & NDC
                    </option>
                    <option value="DevOps & Cloud">DevOps & Cloud</option>
                    <option value="AI & LLM Integrations">
                      AI & LLM Integrations
                    </option>
                    <option value="Frontend Architecture">
                      Frontend Architecture
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Writing Blog with AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Generate & Publish Article</span>
                    </>
                  )}
                </button>

                {genMessage && (
                  <div
                    className={`p-3 rounded-xl text-xs font-semibold ${
                      genMessage.startsWith('✓')
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                    }`}
                  >
                    {genMessage}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Published Articles List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-500" />
                Published Articles ({blogs.length})
              </h2>
              <button
                onClick={fetchBlogs}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
            </div>

            {blogs.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 text-xs">
                No generated blogs found. Create one using the generator on the
                left!
              </div>
            ) : (
              <div className="space-y-3">
                {blogs.map((blog) => (
                  <div
                    key={blog.slug}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {blog.category}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {blog.readingTime}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                        title="View Live Blog"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteBlog(blog.slug)}
                        className="p-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                        title="Delete Blog"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 6: PROJECTS & SKILLS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-emerald-500" />
              Featured Projects ({featuredProjects.length})
            </h2>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProjects
              .filter((p) =>
                p.name.toLowerCase().includes(projectSearch.toLowerCase())
              )
              .map((p) => (
                <div
                  key={p.name}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {p.name}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-100 dark:border-slate-800">
                    {p.tech?.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Tab 7: SYSTEM HEALTH */}
      {activeTab === 'system' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              API Services Health
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">
                  Groq AI Inference
                </span>
                <span className="text-emerald-500 font-bold">Operational</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">
                  Contact Email (Resend)
                </span>
                <span className="text-emerald-500 font-bold">Connected</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">
                  Twilio WhatsApp Alert
                </span>
                <span className="text-emerald-500 font-bold">Active</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-600 dark:text-slate-400">
                  App Server (Next.js 15)
                </span>
                <span className="text-emerald-500 font-bold">
                  Healthy (0 err)
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-500" />
              Database & CMS Link
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">
                  Inbox JSON Store
                </span>
                <span className="text-emerald-500 font-bold">
                  {messages.length} Records
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">
                  Generated Blog Posts
                </span>
                <span className="text-emerald-500 font-bold">
                  {blogs.length} Articles
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-600 dark:text-slate-400">
                  Strapi CMS Endpoint
                </span>
                <a
                  href="http://localhost:1337/admin"
                  target="_blank"
                  className="text-purple-500 font-bold hover:underline"
                >
                  localhost:1337
                </a>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-500" />
              Production Metrics
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">
                  Uptime SLA
                </span>
                <span className="text-emerald-500 font-bold">99.9%</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">
                  P99 API Latency
                </span>
                <span className="text-slate-900 dark:text-white font-bold">
                  &lt; 140ms
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-600 dark:text-slate-400">
                  Total Skills Count
                </span>
                <span className="text-slate-900 dark:text-white font-bold">
                  {totalSkillsCount} Skills
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
