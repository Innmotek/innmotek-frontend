/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: {
          DEFAULT: '#121212',
          subtle: '#161616',
          elevated: '#1A1A1A',
        },
        gold: {
          DEFAULT: '#C5A880',
          hover: '#D4B890',
          dark: '#A88B63',
          subtle: 'rgba(197, 168, 128, 0.12)',
          border: 'rgba(197, 168, 128, 0.35)',
        },
        border: {
          subtle: '#222222',
          strong: '#333333',
        },
        content: {
          primary: '#FFFFFF',
          secondary: '#B3B3B3',
          muted: '#737373',
          inverse: '#0A0A0A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        widest: '0.15em',
        tightest: '-0.02em',
      },
      animation: {
        fadeIn: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideUp: 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
