/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        surface: "#18181B",
        card: "#111113",
        primary: "#4F7CFF",
        text: "#FFFFFF",
        muted: "#A1A1AA",
        border: "#27272A",
        danger: "#EF4444",
      },

      borderRadius: {
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
      },
    },
  },
  plugins: [],
};