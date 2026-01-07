"use client";

import { useMemo, useState } from "react";

export function ContactForm({
  toEmail,
}: {
  toEmail: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = `Portfolio contact from ${name || ""}`.trim();
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");

    const params = new URLSearchParams({
      subject,
      body,
    });

    return `mailto:${toEmail}?${params.toString()}`;
  }, [toEmail, name, email, message]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailtoHref;
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-amber-500 focus:ring-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-amber-500 focus:ring-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
          />
        </label>
      </div>
      <label className="space-y-1 block">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-32 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-amber-500 focus:ring-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          placeholder="Tell me what you are looking to build, timelines, and any context."
        />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold !text-white shadow-sm transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:!bg-white dark:!text-slate-900 dark:hover:bg-slate-50 dark:focus:ring-slate-400"
        >
          Send email
        </button>
        <a
          className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
          href={mailtoHref}
        >
          Open in your email client
        </a>
      </div>
    </form>
  );
}
