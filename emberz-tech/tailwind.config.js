/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ember: {
          dark: '#050505',
          copper: '#B87333',
          amber: '#FFBF00',
          molten: '#FF4500',
        }
      }
    },
  },
  plugins: [],
}