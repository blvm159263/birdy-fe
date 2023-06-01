/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '0.5rem',
        md: '1rem',
        xl: '2rem'
      }
    },
    extend: {},
  },
  plugins: [
  ],
}

