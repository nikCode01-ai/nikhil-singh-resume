'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Search,
  Home,
  User,
  Briefcase,
  FileText,
  Mail,
  Terminal,
  Command,
} from 'lucide-react';

const commands = [
  { id: 'home', title: 'Home', icon: Home, href: '/' },
  { id: 'about', title: 'About Me', icon: User, href: '/about' },
  { id: 'projects', title: 'Projects', icon: Briefcase, href: '/projects' },
  { id: 'skills', title: 'Skills & Tech', icon: Terminal, href: '/skills' },
  { id: 'blogs', title: 'Blogs', icon: FileText, href: '/blogs' },
  { id: 'contact', title: 'Contact', icon: Mail, href: '/contact' },
  { id: 'tools', title: 'Tools', icon: Command, href: '/tools' },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setSearch('');
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[15vh] pointer-events-none px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200/50 dark:border-white/10 pointer-events-auto"
            >
              <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
                <Search className="h-5 w-5 text-brand-green dark:text-emerald-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="What are you looking for?..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent border-0 px-4 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0 outline-none text-lg"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 uppercase">
                  ESC
                </kbd>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-3">
                {filteredCommands.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 font-medium">
                    No results found for &quot;{search}&quot;
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredCommands.map((cmd) => (
                      <button
                        key={cmd.id}
                        onClick={() => handleSelect(cmd.href)}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-left transition-all duration-200 group"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-brand-green group-hover:shadow-[0_0_15px_rgba(31,77,55,0.4)] dark:group-hover:bg-emerald-500 dark:group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300">
                          <cmd.icon className="h-5 w-5 text-slate-500 group-hover:text-white dark:group-hover:text-slate-950 transition-colors" />
                        </div>
                        <span className="flex-1 text-base font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                          {cmd.title}
                        </span>
                        <div className="opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <span className="text-xs font-bold uppercase tracking-wider text-brand-green dark:text-emerald-400">
                            Jump to
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-xs text-slate-500 dark:text-slate-400 flex justify-between items-center font-medium">
                <span>Start typing to filter results</span>
                <span className="flex items-center gap-1">
                  Powered by{' '}
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    Nikhil&apos;s OS
                  </span>
                </span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
