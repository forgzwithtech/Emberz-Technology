/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#070709",
        surface: "#121217",
        surfaceBorder: "#23232c",
        ember: {
          light: "#ff7a00",
          DEFAULT: "#ff4500",
          dark: "#a82000",
          glow: "rgba(255, 69, 0, 0.15)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};