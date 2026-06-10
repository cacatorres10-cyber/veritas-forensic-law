'use server';

import { getTranslations } from 'next-intl/server';

/**
 * ============================================================================
 *  CHATBOT INTEGRATION POINT
 * ============================================================================
 *  This is the single seam where a real AI backend gets wired in.
 *  The portal Chat widget (src/components/ChatWidget.tsx) only knows about
 *  this function's signature — `(message) => Promise<string>` — so you can
 *  replace the body below with a call to your model/provider WITHOUT touching
 *  any UI code.
 *
 *  Example of a future implementation:
 *
 *    import Anthropic from '@anthropic-ai/sdk';
 *    const client = new Anthropic();
 *    export async function sendChatMessage(message: string) {
 *      const res = await client.messages.create({
 *        model: 'claude-opus-4-8',
 *        max_tokens: 1024,
 *        messages: [{ role: 'user', content: message }],
 *      });
 *      return res.content[0].type === 'text' ? res.content[0].text : '';
 *    }
 *
 *  For now it returns a localized placeholder ("Chatbot coming soon.").
 * ============================================================================
 */
export async function sendChatMessage(_message: string): Promise<string> {
  const t = await getTranslations('portal.chat');
  // Simulate network latency so the UI's pending state is visible.
  await new Promise((r) => setTimeout(r, 500));
  return t('placeholderReply');
}
