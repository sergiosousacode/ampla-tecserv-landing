/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",   // azul
        secondary: "#16a34a", // verde
        dark: "#0f172a",
      },
    },
  },
  plugins: [],
};
