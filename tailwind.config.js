/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        panel: 'rgba(11, 28, 56, 0.55)',
        glassBorder: 'rgba(56, 189, 248, 0.25)',
        neon: '#38bdf8'
      },
      boxShadow: {
        neon: '0 0 20px rgba(56, 189, 248, 0.35)'
      }
    }
  },
  plugins: []
};
