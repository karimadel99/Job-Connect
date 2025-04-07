const colors = require("tailwindcss/colors");
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"], 
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        // Dark Mode Colors
        dark: {
          primary: {
            50: '#1E1B4B',   // Primary50
            100: '#312E81',  // Primary100
            200: '#3730A3',  // Primary200
            300: '#4338CA',  // Primary300
            400: '#4F46E5',  // Primary400
            500: '#6366F1',  // Primary500
            600: '#4F46E5',  // For buttons and active states
            700: '#4338CA',  // Darker shade for hover states
            800: '#3730A3',  // Even darker for pressed states
            900: '#312E81',  // Darkest shade
          },
          text: {
            primary: '#F8FAFC',    // Primary text
            secondary: '#C7D2FE',  // Secondary text
            tertiary: '#94A3B8',   // Tertiary text
            inverse: '#FFFFFF',    // Inverse text (for buttons)
          },
          background: {
            primary: '#0F172A',    // Primary background
            secondary: '#1E293B',  // Secondary background
            tertiary: '#334155',   // Tertiary background
          },
          accent: {
            primary: '#818CF8',    // Primary accent
            secondary: '#6366F1',  // Secondary accent
            tertiary: '#4F46E5',   // Tertiary accent
          },
          neutral: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          },
          error: {
            light: '#FCA5A5',    // Light error
            DEFAULT: '#EF4444',  // Default error
            dark: '#B91C1C',     // Dark error
          },
          success: {
            light: '#86EFAC',    // Light success
            DEFAULT: '#22C55E',  // Default success
            dark: '#15803D',     // Dark success
          },
        },
        // Light Mode Colors
        light: {
          primary: {
            50: '#EEF2FF',   // Primary50
            100: '#E0E7FF',  // Primary100
            200: '#C7D2FE',  // Primary200
            300: '#A5B4FC',  // Primary300
            400: '#818CF8',  // Primary400
            500: '#6366F1',  // Primary500
            600: '#4F46E5',  // For buttons and active states
            700: '#4338CA',  // Darker shade for hover states
            800: '#3730A3',  // Even darker for pressed states
            900: '#312E81',  // Darkest shade
          },
          text: {
            primary: '#1E1B4B',    // Primary text
            secondary: '#4338CA',  // Secondary text
            tertiary: '#6B7280',   // Tertiary text
            inverse: '#FFFFFF',    // Inverse text (for buttons)
          },
          background: {
            primary: '#FFFFFF',    // Primary background
            secondary: '#F9FAFB',  // Secondary background
            tertiary: '#F3F4F6',   // Tertiary background
          },
          accent: {
            primary: '#4F46E5',    // Primary accent
            secondary: '#4338CA',  // Secondary accent
            tertiary: '#3730A3',   // Tertiary accent
          },
          neutral: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          },
          error: {
            light: '#FEE2E2',    // Light error
            DEFAULT: '#EF4444',  // Default error
            dark: '#B91C1C',     // Dark error
          },
          success: {
            light: '#DCFCE7',    // Light success
            DEFAULT: '#22C55E',  // Default success
            dark: '#15803D',     // Dark success
          },
        },
      },
      fontSize: {
        'display-1': ['56px', { lineHeight: '1.2', fontWeight: '700' }],
        'h1': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'h4': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'p1': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'p2': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      screens: {
        'xs': '475px',
        ...defaultTheme.screens,
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
