'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { sendChatMessage } from '@/app/[locale]/portal/chat-actions';

type Message = { id: number; role: 'user' | 'assistant'; text: string };

/**
 * Chat widget SHELL.
 * The UI (message list, input, send button, pending state) is complete.
 * Replies are produced by sendChatMessage() — the documented integration
 * seam. Swapping in a real AI backend there requires no changes here.
 */
export function ChatWidget() {
  const t = useTranslations('portal.chat');
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'assistant', text: t('greeting') },
  ]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Keep the conversation scrolled to the latest message.
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, pending]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text || pending) return;

    const userMsg: Message = { id: Date.now(), role: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setPending(true);

    try {
      const reply = await sendChatMessage(text);
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: 'assistant', text: reply },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="glass flex h-[28rem] flex-col rounded-3xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <h3 className="font-medium text-white">{t('title')}</h3>
          <p className="text-xs text-white/45">{t('subtitle')}</p>
        </div>
        <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gold-light">
          {t('comingSoonBadge')}
        </span>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        className="flex-1 space-y-3 overflow-y-auto px-5 py-4"
        aria-live="polite"
        aria-label={t('title')}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-white text-black'
                  : 'border border-white/10 bg-white/[0.03] text-white/80'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {pending && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/40">
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/40" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/40 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/40 [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 border-t border-white/10 p-3"
      >
        <label htmlFor="chat-input" className="sr-only">
          {t('placeholder')}
        </label>
        <input
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('placeholder')}
          className="field !rounded-full !py-2.5"
        />
        <button
          type="submit"
          disabled={pending || !input.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-gold-hover disabled:opacity-40"
          aria-label={t('send')}
        >
          ↑
        </button>
      </form>
    </div>
  );
}
