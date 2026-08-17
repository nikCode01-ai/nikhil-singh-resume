'use client';

import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { person } from '@/lib/resume-data';

type CommandLog = {
  id: string;
  command: string;
  output: React.ReactNode;
};

export function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: 'init',
      command: '',
      output: (
        <div>
          <span className="text-brand-green dark:text-emerald-400">
            nikhil-os v1.0.0
          </span>
          <br />
          Type <span className="text-blue-400">&apos;help&apos;</span> to see
          available commands.
        </div>
      ),
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();

    let output: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="text-slate-300">
            Available commands:
            <ul className="mt-1 ml-4 list-disc space-y-1">
              <li>
                <span className="text-blue-400">whoami</span> - Display identity
                info
              </li>
              <li>
                <span className="text-blue-400">skills</span> - List core
                technologies
              </li>
              <li>
                <span className="text-blue-400">contact</span> - Get contact
                details
              </li>
              <li>
                <span className="text-blue-400">clear</span> - Clear terminal
              </li>
              <li>
                <span className="text-blue-400">sudo rm -rf /</span> - Do not
                try this
              </li>
            </ul>
          </div>
        );
        break;
      case 'whoami':
        output = (
          <div>
            Name: {person.name}
            <br />
            Role: {person.role}
            <br />
            Location: {person.location}
          </div>
        );
        break;
      case 'skills':
        output = (
          <div className="text-emerald-400">
            TypeScript, Next.js, React, Node.js, Fastify, AWS, PostgreSQL,
            MongoDB, AI/LLM
          </div>
        );
        break;
      case 'contact':
        output = (
          <div>
            Email:{' '}
            <a
              href={`mailto:${person.email}`}
              className="text-blue-400 underline"
            >
              {person.email}
            </a>
            <br />
            LinkedIn:{' '}
            <a
              href={person.linkedinUrl}
              target="_blank"
              className="text-blue-400 underline"
            >
              Profile
            </a>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'sudo rm -rf /':
        output = (
          <div className="text-red-500">Permission denied. Nice try!</div>
        );
        break;
      case '':
        output = '';
        break;
      default:
        output = (
          <div className="text-red-400">
            Command not found: {cmd}. Type &apos;help&apos; for a list of
            commands.
          </div>
        );
    }

    if (cmd !== '') {
      setHistory((prev) => [
        ...prev,
        { id: Math.random().toString(), command: cmd, output },
      ]);
    }
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 lg:right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-elevated transition-transform hover:scale-110 dark:bg-slate-800 dark:border dark:border-slate-700"
        title="Open Developer Terminal"
      >
        <TerminalIcon className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-36 right-6 lg:right-8 z-50 w-[350px] sm:w-[450px] rounded-xl bg-slate-950 shadow-2xl border border-slate-800 overflow-hidden font-mono text-sm"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between bg-slate-900 px-4 py-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <TerminalIcon className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-300">
                  nikhil@dev-machine:~
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-3 w-3 rounded-full bg-amber-500/80 hover:bg-amber-400" />
                <button className="h-3 w-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-3 w-3 items-center justify-center rounded-full bg-red-500/80 hover:bg-red-400 text-transparent hover:text-red-950"
                >
                  <X className="h-2 w-2" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              className="h-[300px] overflow-y-auto p-4 text-slate-300 bg-slate-950 scrollbar-thin scrollbar-thumb-slate-700"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((log) => (
                <div key={log.id} className="mb-2">
                  {log.command && (
                    <div className="flex gap-2">
                      <span className="text-brand-green dark:text-emerald-400">
                        ➜
                      </span>
                      <span className="text-blue-400">~</span>
                      <span className="text-white">{log.command}</span>
                    </div>
                  )}
                  <div className="mt-1 opacity-90">{log.output}</div>
                </div>
              ))}

              <form onSubmit={handleCommand} className="flex gap-2 mt-2">
                <span className="text-brand-green dark:text-emerald-400">
                  ➜
                </span>
                <span className="text-blue-400">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 m-0"
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
