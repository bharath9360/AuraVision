 /**@type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'iris-bg': '#0D0D0D',
        'iris-surface': '#1C1C1E',
        'iris-surface-light': '#2C2C2E',
        'iris-primary-blue': '#0A84FF',
        'iris-primary-cyan': '#64D2FF',
        'iris-accent-yellow': '#FFD60A',
        'iris-accent-red': '#FF453A',
        'iris-text-primary': '#FFFFFF',
        'iris-text-secondary': '#8E8E93',
        'iris-text-tertiary': '#48484A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}