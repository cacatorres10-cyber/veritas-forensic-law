// Shared, translation-key-driven content maps.
// UI text lives in messages/*.json — these only hold structural keys + icons.

export const SERVICE_KEYS = [
  'forensicAccounting',
  'digitalForensics',
  'expertTestimony',
  'litigationSupport',
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

// Minimal inline glyphs (kept as simple unicode to avoid an icon dependency).
export const SERVICE_ICON: Record<ServiceKey, string> = {
  forensicAccounting: '§',
  digitalForensics: '⌘',
  expertTestimony: '⚖',
  litigationSupport: '✦',
};

// Thematic photo for each service (files in /public/images).
export const SERVICE_IMAGE: Record<ServiceKey, string> = {
  forensicAccounting: '/images/signing-docs.jpg',
  digitalForensics: '/images/tech-forensic.jpg',
  expertTestimony: '/images/justice-scales.jpg',
  litigationSupport: '/images/law-books.jpg',
};

export const STAT_KEYS = ['years', 'cases', 'experts', 'rate'] as const;

export const STAT_VALUES: Record<(typeof STAT_KEYS)[number], string> = {
  years: '20+',
  cases: '1,400+',
  experts: '35',
  rate: '98%',
};

export const CREDENTIAL_KEYS = ['bar', 'cfe', 'cpa', 'iso'] as const;

export const VALUE_KEYS = [
  'independence',
  'rigor',
  'clarity',
  'confidentiality',
] as const;

// Bookable consultation time slots (local firm hours).
export const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
] as const;
