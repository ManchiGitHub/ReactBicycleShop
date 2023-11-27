/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    fontFamily:{
      'sriracha': ['Sriracha', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
}

