/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Muy importante para detectar clases
  ],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        'bg-light': '#F5EDF0',
        'bg-dark': '#171717',
        'text-dark': '#171717',
        'text-light': '#F5EDF0',
      },
    },
  },
  plugins: [],
};
