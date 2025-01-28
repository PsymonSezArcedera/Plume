/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans : ['"Outfit"', 'sans-serif'],
      },
      underlineOffset: {
        '2': '2px', 
      },
    },
  },
  plugins: [],
}

