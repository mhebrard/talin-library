/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        xmen: {
          gold: '#eab308',
          blue: '#1d4ed8',
          red: '#dc2626',
          dark: '#090a0f',
          surface: '#12141c',
          border: '#232736',
        }
      }
    },
  },
  plugins: [],
}
