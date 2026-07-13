import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#1f4d37',
          greenDark: '#173a2a',
          yellow: '#f4b400',
          cream: '#f8f9fa',
          muted: '#6b7280',
        },
      },
      borderRadius: {
        btn: '12px',
        card: '20px',
        input: '14px',
        img: '24px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
        counter: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(31, 77, 55, 0.1)' },
          '50%': { borderColor: 'rgba(244, 180, 0, 0.3)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-down': 'fade-down 0.6s ease-out both',
        'scale-in': 'scale-in 0.5s ease-out both',
        'slide-left': 'slide-left 0.6s ease-out both',
        'slide-right': 'slide-right 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        ripple: 'ripple 0.6s linear',
        'border-glow': 'border-glow 3s ease-in-out infinite',
      },
      spacing: {
        section: '120px',
        'section-sm': '80px',
        card: '24px',
        'card-lg': '32px',
      },
      maxWidth: {
        content: '1280px',
        prose: '72ch',
      },
      fontSize: {
        display: [
          '3.5rem',
          { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' },
        ],
        heading: [
          '2.5rem',
          { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' },
        ],
        subheading: [
          '1.5rem',
          { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' },
        ],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        body: ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        caption: ['0.75rem', { lineHeight: '1.5' }],
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0,0,0,0.04)',
        card: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)',
        'card-hover':
          '0 10px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)',
        navbar: '0 1px 3px rgba(0,0,0,0.05)',
        'navbar-scrolled': '0 4px 20px rgba(0,0,0,0.08)',
        elevated: '0 20px 40px rgba(0,0,0,0.08)',
        premium: '0 25px 50px -12px rgba(0,0,0,0.12)',
        'glow-green': '0 0 20px rgba(31, 77, 55, 0.15)',
        'glow-yellow': '0 0 20px rgba(244, 180, 0, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
