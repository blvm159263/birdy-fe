/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    },
    container: {
      padding: {
        DEFAULT: '0.5rem',
        md: '4rem',
        lg: '8rem',
        xl: '10rem'
      }
    },
    extend: {},
  },
  plugins: [
  ],
}

