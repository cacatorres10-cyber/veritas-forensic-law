// Site-wide configuration values.

/**
 * WhatsApp number in INTERNATIONAL format, digits only (no +, spaces or dashes).
 * Example: a US number +1 (555) 014-2200 → "15550142200".
 *
 * ⚠️ Replace this with the firm's real WhatsApp business number.
 */
export const WHATSAPP_NUMBER = '15550142200';

/** Builds a WhatsApp deep link with a prefilled message. */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
