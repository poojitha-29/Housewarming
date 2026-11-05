/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Cormorant Garamond'", "serif"],
        script: ["'Great Vibes'", "cursive"],
        sans: ["'Inter'", "sans-serif"],
      },
      colors: {
        gold: {
          50: "#fdf8e7",
          100: "#faefc4",
          200: "#f5de8a",
          300: "#efc64e",
          400: "#e8ad28",
          500: "#d4a017",
          600: "#b8880f",
          700: "#946b0c",
          800: "#7a560e",
          900: "#664711",
        },
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}
