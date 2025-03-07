/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Incluye el archivo HTML principal
    "./src/**/*.{js,ts,jsx,tsx}", // Archivos en src con React y TypeScript
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cabin', 'sans-serif'], // Agrega tu fuente aquí
      },
    },
  },
  plugins: [],
};
