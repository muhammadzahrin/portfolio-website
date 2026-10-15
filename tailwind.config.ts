import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          'system-ui',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        aero: {
          sky: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
          },
          cyan: {
            50: '#ecfeff',
            100: '#cffafe',
            200: '#a5f3fc',
            300: '#67e8f9',
            400: '#22d3ee',
            500: '#06b6d4',
            600: '#0891b2',
          },
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
          },
          dark: {
            950: '#050c14',
            900: '#0a1524',
            850: '#0f1f33',
            800: '#152942',
            700: '#1f3b5c',
          },
        },
      },
      boxShadow: {
        'glass-sm': '0 2px 10px rgba(0, 50, 100, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        'glass-md': '0 8px 30px rgba(0, 50, 100, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
        'glass-lg': '0 20px 40px rgba(0, 50, 100, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        'glass-dark-sm': '0 2px 10px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        'glass-dark-md': '0 8px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        'glass-dark-lg': '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
      },
      transitionTimingFunction: {
        'apple-spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'apple-snap': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      keyframes: {
        'breathe-slow': {
          '0%, 100%': { transform: 'scale(1) translate(0, 0)', opacity: '0.45' },
          '50%': { transform: 'scale(1.25) translate(15px, -12px)', opacity: '0.9' },
        },
        'breathe-medium': {
          '0%, 100%': { transform: 'scale(1.15) translate(0, 0)', opacity: '0.85' },
          '50%': { transform: 'scale(0.9) translate(-15px, 15px)', opacity: '0.4' },
        },
        'breathe-fast': {
          '0%, 100%': { transform: 'scale(0.95) translate(0, 0)', opacity: '0.5' },
          '50%': { transform: 'scale(1.2) translate(10px, 18px)', opacity: '0.85' },
        },
      },
      animation: {
        'breathe-slow': 'breathe-slow 14s ease-in-out infinite',
        'breathe-medium': 'breathe-medium 10s ease-in-out infinite',
        'breathe-fast': 'breathe-fast 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
