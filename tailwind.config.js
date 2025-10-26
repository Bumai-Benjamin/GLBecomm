/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0b0a0a',
        charcoal: '#161517',
        ash: '#1f1e20',
        sand: '#f5f1ea',
        clay: '#c2bdb4',
        flare: '#ff6b3d',
        pulse: '#f6c54d',
        tide: '#62d2ff',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.35em',
        wide: '0.24em',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 20% -10%, rgba(255,107,61,0.22), transparent 55%), radial-gradient(circle at 80% 10%, rgba(246,197,77,0.15), transparent 50%), linear-gradient(160deg,#050505 0%,#121112 100%)',
      },
      boxShadow: {
        glow: '0 20px 45px rgba(255,107,61,0.25)',
        depth: '0 18px 32px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [],
}
