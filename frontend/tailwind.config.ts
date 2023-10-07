/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      sm: { min: "480px" },

      md: { min: "801px", max: "1023px" },

      lg: { min: "1280px" },
      all: { min: "481px" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
