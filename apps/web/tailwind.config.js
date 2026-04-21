/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          50: '#f2fbdf',
          100: '#e0f6b4',
          200: '#c6ed83',
          300: '#a6df52',
          400: '#8cce2e',
          500: '#6eb11b',
          600: '#538a11',
          700: '#406911',
          800: '#345312',
          900: '#2d4514',
          950: '#142505',
        },
        dark: {
          bg: '#0F172A',
          card: 'rgba(30, 41, 59, 0.7)'
        }
      }
    },
  },
  plugins: [],
}
