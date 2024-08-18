/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  // When you set darkMode: 'class', it allows you to toggle dark mode by simply adding or removing the dark class on the root element (usually the <html> or <body> tag). 
  theme: {
    extend: {},
  },
  plugins: [],
}

