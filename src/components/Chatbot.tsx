'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  Bot,
  Send,
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Calendar,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { person } from '@/lib/resume-data';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

interface ISpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: ISpeechEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}

interface ISpeechEvent {
  results: Array<Array<{ transcript: string }>>;
}

function formatChatMessage(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^###?\s+/gm, '');
}

export function Chatbot() {
  const idBase = useId();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: `${idBase}-welcome`,
      role: 'assistant',
      content: `Hi! 👋 I'm Nikhil's AI Assistant. Ask me anything about his projects, skills, pricing, or click below to schedule a call!`,
    },
  ]);

  // Voice Speech-to-Text state
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<ISpeechRecognitionInstance | null>(null);

  // Voice Text-to-Speech state
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(
    null
  );

  // Booking Modal State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('04:00 PM');
  const [bookingTopic, setBookingTopic] = useState(
    'Senior Full-Stack Role / Consultation'
  );
  const [bookingNotes, setBookingNotes] = useState('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [gcalUrl, setGcalUrl] = useState('');

  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionConstructor =
        (
          window as unknown as {
            SpeechRecognition?: new () => ISpeechRecognitionInstance;
          }
        ).SpeechRecognition ||
        (
          window as unknown as {
            webkitSpeechRecognition?: new () => ISpeechRecognitionInstance;
          }
        ).webkitSpeechRecognition;

      if (SpeechRecognitionConstructor) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognitionConstructor();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: ISpeechEvent) => {
          const transcript = event.results?.[0]?.[0]?.transcript;
          if (transcript) {
            setInputValue(transcript);
          }
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert(
        'Speech recognition is not supported in this browser. Please use Chrome or Edge.'
      );
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Speech recognition error:', err);
      }
    }
  };

  const speakText = useCallback(
    (text: string, msgId: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window))
        return;

      if (currentlySpeakingId === msgId) {
        window.speechSynthesis.cancel();
        setCurrentlySpeakingId(null);
        return;
      }

      window.speechSynthesis.cancel();
      const cleanText = formatChatMessage(text);
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => setCurrentlySpeakingId(null);
      utterance.onerror = () => setCurrentlySpeakingId(null);

      setCurrentlySpeakingId(msgId);
      window.speechSynthesis.speak(utterance);
    },
    [currentlySpeakingId]
  );

  const sendMessage = useCallback(
    async (customText?: string) => {
      const text = (customText || inputValue).trim();
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

        const botId = `${idBase}-a-${Date.now() + 1}`;
        const botMessage: ChatMessage = {
          id: botId,
          role: 'assistant',
          content: data.reply,
        };

        setMessages((prev) => [...prev, botMessage]);

        if (voiceEnabled) {
          speakText(data.reply, botId);
        }
      } catch (err) {
        const errorMessage: ChatMessage = {
          id: `${idBase}-a-${Date.now() + 1}`,
          role: 'assistant',
          content: `Sorry, something went wrong. ${
            err instanceof Error ? err.message : 'Please try again later.'
          }`,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [inputValue, isLoading, messages, idBase, voiceEnabled, speakText]
  );

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingDate || !bookingTime) return;

    setIsSubmittingBooking(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingName,
          email: bookingEmail,
          date: bookingDate,
          time: bookingTime,
          topic: bookingTopic,
          notes: bookingNotes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBookingSuccess(true);
        setGcalUrl(data.gcalUrl || '');

        const botMessage: ChatMessage = {
          id: `${idBase}-a-booking-${Date.now()}`,
          role: 'assistant',
          content: `🎉 Awesome! Call requested for **${bookingDate} at ${bookingTime}**.\n\nA calendar invite request has been sent to ${person.name}'s command center. You can also add it to your Google Calendar directly.`,
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (err) {
      console.error('Booking failed:', err);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  // Auto-scroll messages list
  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [open, messages, isLoading]);

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <motion.button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 p-3.5 text-white shadow-xl shadow-emerald-600/30 hover:shadow-emerald-500/50 transition-all duration-300 border border-emerald-400/40 cursor-pointer"
          aria-label={open ? 'Close Chat' : 'Open AI Assistant'}
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <div className="relative">
                <Bot className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
              </div>
              <span className="hidden sm:inline-block pr-1 text-xs font-bold tracking-wide">
                Ask AI or Book Call
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* Main Chat Interface Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[82vh] h-[640px] flex flex-col rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 shadow-2xl backdrop-blur-xl overflow-hidden font-sans"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      Nikhil AI
                    </h3>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Voice & Scheduling Enabled
                  </p>
                </div>
              </div>

              {/* Action Buttons in Header */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(true)}
                  title="Schedule a Call"
                  className="p-2 rounded-xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline">Book</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  title={
                    voiceEnabled ? 'Mute AI Voice' : 'Enable AI Voice Reply'
                  }
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    voiceEnabled
                      ? 'bg-emerald-500/20 text-emerald-500'
                      : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {voiceEnabled ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Action Prompt Chips */}
            <div className="relative z-10 px-3.5 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setShowBookingModal(true)}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 whitespace-nowrap flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
              >
                <Calendar className="w-3 h-3 text-emerald-500" />
                <span>📅 Book a 1:1 Call</span>
              </button>

              <button
                onClick={() =>
                  sendMessage('What is your full-stack & airline tech stack?')
                }
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                🚀 Tech Stack
              </button>

              <button
                onClick={() =>
                  sendMessage(
                    'Tell me about your NDC airline booking projects.'
                  )
                }
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                ✈️ NDC Projects
              </button>

              <button
                onClick={() =>
                  sendMessage(
                    'What are your freelance pricing and retainer packages?'
                  )
                }
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                💰 Pricing Rates
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div
              ref={listRef}
              className="relative z-10 flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm"
            >
              {messages.map((m) => {
                const isUser = m.role === 'user';
                const isSpeaking = currentlySpeakingId === m.id;

                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`relative max-w-[85%] rounded-2xl px-4 py-2.5 shadow-xs leading-relaxed ${
                        isUser
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-xs'
                          : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 rounded-bl-xs'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{m.content}</div>

                      {/* Assistant message tools (Voice playback & Copy) */}
                      {!isUser && (
                        <div className="flex items-center gap-2 mt-2 pt-1.5 border-t border-slate-200/50 dark:border-slate-700/50 text-[10px] text-slate-400">
                          <button
                            type="button"
                            onClick={() => speakText(m.content, m.id)}
                            className="flex items-center gap-1 hover:text-emerald-500 transition-colors cursor-pointer"
                            title="Listen to this reply"
                          >
                            <Volume2
                              className={`w-3 h-3 ${isSpeaking ? 'text-emerald-500 animate-pulse' : ''}`}
                            />
                            <span>{isSpeaking ? 'Speaking...' : 'Listen'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopy(m.content, m.id)}
                            className="flex items-center gap-1 hover:text-emerald-500 transition-colors cursor-pointer"
                            title="Copy reply"
                          >
                            {copiedMsgId === m.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-500">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] ml-1 font-mono text-emerald-600 dark:text-emerald-400">
                    Thinking...
                  </span>
                </div>
              )}
            </div>

            {/* In-Chat Meeting Booking Form Overlay */}
            <AnimatePresence>
              {showBookingModal && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="relative z-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      <span>Schedule a 1:1 Intro Call</span>
                    </h4>
                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {bookingSuccess ? (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                      <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500" />
                      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                        Meeting Request Dispatched to Admin!
                      </p>
                      {gcalUrl && (
                        <a
                          href={gcalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors"
                        >
                          <span>Add to Google Calendar</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <div>
                        <button
                          onClick={() => {
                            setShowBookingModal(false);
                            setBookingSuccess(false);
                          }}
                          className="text-[11px] text-slate-500 underline hover:text-slate-700 cursor-pointer"
                        >
                          Return to Chat
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleBookingSubmit}
                      className="space-y-2.5 text-xs"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Your Email"
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="date"
                          required
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                        <select
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                          <option value="11:00 AM">11:00 AM IST</option>
                          <option value="02:00 PM">02:00 PM IST</option>
                          <option value="04:00 PM">04:00 PM IST</option>
                          <option value="07:00 PM">07:00 PM IST</option>
                          <option value="09:30 PM">
                            09:30 PM IST (US ET Morning)
                          </option>
                        </select>
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Discussion Topic / Role"
                          value={bookingTopic}
                          onChange={(e) => setBookingTopic(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <textarea
                          rows={2}
                          placeholder="Additional Notes or requirements..."
                          value={bookingNotes}
                          onChange={(e) => setBookingNotes(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingBooking}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                      >
                        {isSubmittingBooking
                          ? 'Scheduling...'
                          : 'Confirm Call Request'}
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Bar */}
            <div className="relative z-10 p-3 border-t border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
              {isListening && (
                <div className="flex items-center justify-between mb-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Listening... speak now</span>
                  </div>
                  <button
                    type="button"
                    onClick={toggleListening}
                    className="text-[10px] uppercase font-bold underline cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2">
                {/* Voice Input Microphone Button */}
                <button
                  type="button"
                  onClick={toggleListening}
                  title={
                    isListening
                      ? 'Stop Listening'
                      : 'Voice Input (Speak to Bot)'
                  }
                  className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse shadow-md shadow-red-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-500'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>

                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask a question or speak..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
                />

                <button
                  type="button"
                  onClick={() => sendMessage()}
                  disabled={isLoading || !inputValue.trim()}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white shadow-md transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
