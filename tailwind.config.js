/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: '#2C5F2D',
        secondary: '#97BC62',
        accent: '#FF6B35',
        surface: '#1A1A1A',
        background: '#0D0D0D',
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
        info: '#2196F3',
      },
      fontFamily: {
        'display': ['Bebas Neue', 'sans-serif'],
        'body': ['Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        'mobile-display': ['2.5rem', { lineHeight: '1.1' }],
        'mobile-heading': ['1.75rem', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        'mobile': '1rem',
        'mobile-lg': '1.5rem',
        'touch-target': '2.75rem',
      },
      minHeight: {
        'touch': '44px',
        'button': '48px',
      },
      maxWidth: {
        'mobile': '100vw',
        'mobile-safe': 'calc(100vw - 2rem)',
        'compass': '320px',
        'compass-mobile': '280px',
      },
      screens: {
        'xs': '475px',
        'touch': '768px',
      },
      animation: {
        'spin-smooth': 'spin 1s linear infinite',
        'pulse-gentle': 'pulse 2s ease-in-out infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}