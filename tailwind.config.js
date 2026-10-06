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
          magenta: {
            DEFAULT: '#9E1B5D',
            hover: '#82154B',
            dark: '#66103A',
            light: '#FDF2F7',
            border: '#F4CEDF',
          },
          orange: {
            DEFAULT: '#F37021',
            hover: '#D95C12',
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
          },
          status: {
            opportunity: '#3B82F6',
            qualification: '#6366F1',
            proposal: '#8B5CF6',
            negotiation: '#F59E0B',
            closing: '#10B981',
            won: '#059669',
            lost: '#EF4444',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }
    },
  },
  plugins: [],
}
