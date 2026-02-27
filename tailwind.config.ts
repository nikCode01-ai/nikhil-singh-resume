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
          cream: '#f7f5ef',
        },
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 400ms ease-out both',
        'fade-up': 'fade-up 500ms ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
