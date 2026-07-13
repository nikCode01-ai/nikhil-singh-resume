'use client';

import dynamic from 'next/dynamic';

const ChatbotInner = dynamic(
  () => import('@/components/Chatbot').then((mod) => mod.Chatbot),
  { ssr: false }
);

export function LazyChatbot() {
  return <ChatbotInner />;
}
