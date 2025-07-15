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
        'bg-light': '#f7f9fa',
        'bg-dark': '#171717',
        'element-dark': '#383838',
        'element-light': '#FFFFFF',
        'text-dark': '#171717',
        'text-light': '#f7f9fa',
      },
    },
  },
  plugins: [],
};
