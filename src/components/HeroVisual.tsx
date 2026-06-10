// Decorative "neural connection" hero visual — adapted for a legal firm:
// a central node (the firm) linked to its four practice areas via pulsing
// bezier curves. Purely presentational, hidden from assistive tech.

type Satellite = {
  label: string;
  img: string;
  // position of the card, in % of the container
  top: string;
  left: string;
  // anchor point the line connects to, in viewBox (0–100) coords
  x: number;
  y: number;
};

export function HeroVisual({ labels }: { labels: string[] }) {
  // Each satellite pairs a practice area with a thematic photo.
  const satellites: Satellite[] = [
    { label: labels[0] ?? '', img: '/images/signing-docs.jpg', top: '2%', left: '0%', x: 16, y: 14 },
    { label: labels[1] ?? '', img: '/images/tech-forensic.jpg', top: '6%', left: '62%', x: 84, y: 20 },
    { label: labels[2] ?? '', img: '/images/justice-scales.jpg', top: '70%', left: '-2%', x: 14, y: 82 },
    { label: labels[3] ?? '', img: '/images/law-books.jpg', top: '74%', left: '58%', x: 86, y: 86 },
  ];

  return (
    <div
      aria-hidden
      className="relative mx-auto hidden aspect-square w-full max-w-[520px] lg:block"
    >
      {/* Connection lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="nodeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="10%" stopColor="#a78b71" />
            <stop offset="90%" stopColor="#c9b8a0" />
          </linearGradient>
        </defs>
        {satellites.map((s, i) => (
          <g key={i}>
            <path
              className="node-line"
              stroke="url(#nodeGrad)"
              d={`M 50 50 C ${(50 + s.x) / 2} 50, ${s.x} ${(50 + s.y) / 2}, ${s.x} ${s.y}`}
            />
            <path
              className="node-line-flow"
              stroke="#c9b8a0"
              strokeOpacity="0.5"
              style={{ animationDelay: `${i * 0.6}s` }}
              d={`M 50 50 C ${(50 + s.x) / 2} 50, ${s.x} ${(50 + s.y) / 2}, ${s.x} ${s.y}`}
            />
          </g>
        ))}
      </svg>

      {/* Central node */}
      <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full">
        <div className="absolute inset-0 rounded-full bg-gold/20 blur-2xl" />
        <div className="glass relative flex h-28 w-28 flex-col items-center justify-center rounded-full text-center shadow-glow">
          <span className="font-serif text-2xl font-bold italic text-white">
            V
          </span>
          <span className="mt-1 text-[8px] uppercase tracking-[0.3em] text-gold-light">
            Veritas
          </span>
        </div>
      </div>

      {/* Satellite media cards — grayscale → color on hover */}
      {satellites.map((s, i) => (
        <div
          key={i}
          className="group/sat absolute w-40"
          style={{ top: s.top, left: s.left }}
        >
          <div className="glass overflow-hidden rounded-2xl p-2 transition-all duration-500 hover:scale-105 hover:shadow-glow-sm">
            <div className="overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.img}
                alt=""
                loading="lazy"
                className="h-20 w-full object-cover grayscale transition-all duration-700 group-hover/sat:grayscale-0"
              />
            </div>
            <p className="mt-2 px-1 pb-1 text-xs font-medium leading-snug text-white/80">
              {s.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
