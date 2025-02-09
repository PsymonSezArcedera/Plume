/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#00FF00', // Define your custom green color
      },
      fontFamily: {
        sans : ['"Outfit"', 'sans-serif'],
      },
      underlineOffset: {
        '4': '4px', 
      },
    },
  },
  plugins: [],
}

