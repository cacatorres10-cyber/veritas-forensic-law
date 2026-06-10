import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark luxe base
        base: '#0a0a0a',
        surface: '#101010',
        // Gold / bronze accent spectrum
        gold: {
          DEFAULT: '#a78b71',
          light: '#c9b8a0',
          hover: '#e8d5b7',
        },
      },
      fontFamily: {
        // Wired up via next/font CSS variables in layout.tsx
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 100px rgba(167, 139, 113, 0.2)',
        'glow-sm': '0 0 60px rgba(167, 139, 113, 0.3)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backgroundImage: {
        'dot-grid':
          'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        dots: '32px 32px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        breathe: 'breathe 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
