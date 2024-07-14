/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "300px",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
  darkMode: "class",
};
