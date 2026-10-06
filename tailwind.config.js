/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agit: {
          burgundy: {
            DEFAULT: '#7A003C',
            hover: '#610030',
            dark: '#4A0024',
            light: '#FDF2F7',
            border: '#F2CCE0',
          },
          magenta: {
            DEFAULT: '#7A003C',
            hover: '#610030',
            dark: '#4A0024',
            light: '#FDF2F7',
            border: '#F2CCE0',
          },
          orange: {
            DEFAULT: '#F26522',
            hover: '#D95210',
            light: '#FFF5F0',
          },
          navy: {
            DEFAULT: '#1E293B',
            dark: '#0F172A',
            light: '#334155',
          },
          gray: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'card-hover': '0 4px 12px -2px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
