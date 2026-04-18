import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        /* ─── Core light palette ─── */
        parchment: {
          DEFAULT: '#F5F0E8',
          warm:    '#FAF7F0',
          soft:    '#EDE8DF',
          deep:    '#E5DDD3',
        },
        obsidian: '#0C0A08',
        stone: {
          DEFAULT: '#7A7068',
          light:   '#A09890',
        },
        dune:     '#B5A898',
        hairline: '#D8D0C5',

        /* ─── Legacy tokens (remapped to light theme) ─── */
        ink: {
          DEFAULT: '#F5F0E8',
          900:     '#FAF7F0',
          800:     '#EDE8DF',
          700:     '#E5DDD3',
          600:     '#D8D0C5',
          500:     '#C8BDB0',
        },
        ivory: {
          DEFAULT: '#0C0A08',
          warm:    '#1A1512',
          soft:    '#2C2520',
        },
        charcoal: '#E5DDD3',
        ash:      '#D8D0C5',
        sand:     '#0C0A08',
        clay:     '#7A7068',
        flare:    '#0C0A08',
        pulse:    '#A09890',
        tide:     '#9A8E84',
        line:     '#D8D0C5',
        muted:    '#7A7068',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-serif', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 7vw, 6.25rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(2.5rem, 5.5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.015em' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        ultra: '0.35em',
        wide: '0.24em',
      },
      borderRadius: {
        xs: '0.25rem',
        sm: '0.375rem',
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at 14% 4%, rgba(255,255,255,0.14), transparent 46%), radial-gradient(circle at 88% 12%, rgba(255,255,255,0.09), transparent 42%), linear-gradient(155deg,#080808 0%,#151515 60%,#0a0a0a 100%)',
        'grid-lines':
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 18px 40px rgba(255,255,255,0.14)',
        depth: '0 24px 46px rgba(0,0,0,0.55)',
        'inner-hairline': 'inset 0 0 0 1px rgba(255,255,255,0.08)',
      },
      transitionTimingFunction: {
        emphasized: 'cubic-bezier(0.17, 0.67, 0.36, 0.99)',
      },
      animation: {
        marquee: 'marquee 24s linear infinite',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.17, 0.67, 0.36, 0.99)',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to: { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
