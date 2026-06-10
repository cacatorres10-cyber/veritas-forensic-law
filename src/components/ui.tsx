import type { ReactNode } from 'react';

// Centered max-width container with consistent horizontal padding.
export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

// Small uppercase gold eyebrow label.
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      <span className="text-[11px] uppercase tracking-[0.25em] text-gold-light">
        {children}
      </span>
    </span>
  );
}

// Standard intro block for inner pages: eyebrow + serif title + subtitle.
export function PageIntro({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl animate-fade-up">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-6 font-serif text-4xl italic leading-[1.1] text-white sm:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-6 text-lg leading-relaxed text-white/60">{subtitle}</p>
      )}
    </div>
  );
}

// Glassmorphic card wrapper.
export function GlassCard({
  children,
  className = '',
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`glass rounded-3xl ${hover ? 'glass-hover' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
