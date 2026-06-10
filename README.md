# Veritas Forensic Law — Bilingual Website

A professional, bilingual (English / Spanish) website for a **forensic legal firm**.
Built with the App Router, fully internationalized, with a SQLite database that runs
locally with **no external services**.

Design: a restrained "dark luxe" system — `#0a0a0a` base, gold/bronze accents,
Playfair Display + Inter typography, subtle glassmorphism — tuned for credibility.

---

## Tech stack

| Concern            | Choice                                              |
| ------------------ | --------------------------------------------------- |
| Framework          | Next.js 14 (App Router) + TypeScript                |
| Styling            | Tailwind CSS                                         |
| Internationalization | next-intl (locale-prefixed routes `/en`, `/es`)   |
| Database / ORM     | SQLite + Prisma                                      |
| Auth               | Modular email + password, signed httpOnly cookie    |
| Validation         | Zod (server-side)                                    |

---

## Quick start

```bash
cp .env.example .env        # local SQLite + dev session secret
npm install                 # installs deps + generates Prisma client
npx prisma migrate dev      # creates prisma/dev.db and applies the schema
npm run prisma:seed         # seeds demo data (already run by migrate dev)
npm run dev                 # http://localhost:3000  (redirects to /en)
```

> `npm install` runs `prisma generate` automatically (postinstall).
> The first `npx prisma migrate dev` both creates the database **and** runs the seed.

### Reset the database

```bash
npm run db:reset            # drops, re-migrates and re-seeds dev.db
```

---

## Demo credentials (client portal)

```
Email:    client@example.com
Password: password123
```

---

## What's included

### Public / marketing
- **Home** (`/[locale]`) — hero with an adapted "neural" visual, service summary,
  trust stats, credentials, CTA.
- **About & Services** (`/[locale]/about`) — firm approach, values, detailed services.
- **Contact** (`/[locale]/contact`) — firm info + validated contact form.

### New clients
- **Book a Consultation** (`/[locale]/appointments`) — date/time picker with
  name, email, phone and reason. Server-side validation. **Double-booking is
  prevented** by a unique `(date, time)` constraint; taken slots are disabled in
  the UI and rejected on the server even under concurrent requests.
- **Legal Q&A board** (`/[locale]/board`) — public questions (name optional,
  question required), newest-first, with pagination. Posts persist to the DB.

### Existing clients
- **Client portal** (`/[locale]/portal`) — behind email/password login.
  - **My Case Files** — seeded example cases with status badges.
  - **Chatbot widget** — fully built UI shell that currently returns
    "Chatbot coming soon." (see integration note below).

---

## Internationalization

- All copy lives in [`messages/en.json`](messages/en.json) and
  [`messages/es.json`](messages/es.json) — **no hardcoded UI strings**.
- Routes are locale-prefixed (`/en/...`, `/es/...`); the language switcher in the
  header persists the choice via the `NEXT_LOCALE` cookie (next-intl middleware).
- To add a locale: add it to [`src/i18n/routing.ts`](src/i18n/routing.ts) and add a
  matching `messages/<locale>.json`.

---

## Where to add the chatbot AI later

The chatbot is intentionally a **shell**. There is exactly **one integration seam**:

> [`src/app/[locale]/portal/chat-actions.ts`](src/app/[locale]/portal/chat-actions.ts) → `sendChatMessage(message)`

It currently returns a localized placeholder. Replace the body with a call to your
AI provider (an Anthropic example is in the file's comments). The chat UI in
[`src/components/ChatWidget.tsx`](src/components/ChatWidget.tsx) only depends on that
function's `(message) => Promise<string>` signature, so **no UI changes are needed**.

---

## Where to harden auth later

Auth is isolated in [`src/lib/auth.ts`](src/lib/auth.ts) (password hashing, HMAC-signed
session cookie, session helpers). Swap it for NextAuth/Auth.js, JWT rotation, 2FA, etc.
without touching the pages — they only call `login()`, `getCurrentClient()` and
`destroySession()`.

---

## Project structure

```
prisma/
  schema.prisma        # Client, CaseFile, Appointment, BoardPost
  seed.ts              # demo client, cases, board posts, sample appointment
messages/
  en.json  es.json     # all UI copy
src/
  i18n/                # next-intl routing, request config, navigation helpers
  middleware.ts        # locale negotiation + persistence
  lib/
    prisma.ts          # singleton Prisma client
    auth.ts            # modular auth (hashing, sessions)
    content.ts         # structural keys (services, stats, time slots)
  components/
    Header.tsx  Footer.tsx  LanguageSwitcher.tsx
    HeroVisual.tsx  ChatWidget.tsx  ui.tsx
    forms/             # ContactForm, BookingForm, AskForm, LoginForm, LogoutButton
  app/[locale]/
    layout.tsx  page.tsx          # root layout + home
    about/  contact/  appointments/  board/  portal/
```

---

## Notes

- Responsive across mobile and desktop; forms use real `<label>`s, required fields,
  and visible focus states for accessibility.
- This is a local demo: the contact form and footer "digest" input validate/accept
  input but are not wired to email/CRM. The `AUTH_SECRET` in `.env` is for development
  only — set a strong secret in production.
- The site footer disclaims that content is general information, not legal advice.
```
