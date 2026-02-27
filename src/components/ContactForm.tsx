'use client';

import { useState } from 'react';

import { Button } from '@/components/Button';

export function ContactForm({ toEmail }: { toEmail: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! I will get back to you soon.',
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status && (
        <div
          className={`p-4 rounded-lg ${
            status.type === 'success'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
          }`}
        >
          {status.message}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Name *
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-amber-500 focus:ring-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Email *
          </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-amber-500 focus:ring-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
            type="email"
            required
          />
        </label>
      </div>
      <label className="space-y-1 block">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Message *
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-32 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-amber-500 focus:ring-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          placeholder="Tell me what you are looking to build, timelines, and any context."
          required
        />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="primary" size="sm" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
        <a
          className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
          href={`mailto:${toEmail}`}
        >
          Or email directly
        </a>
      </div>
    </form>
  );
}
