/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/ index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        jade: {
          50: "#eafff5",
          100: "#cdfee5",
          200: "#a0fad1",
          300: "#63f2b9",
          400: "#25e29d",
          500: "#00bd7e",
          600: "#00a46e",
          700: "#00835c",
          800: "#00674a",
          900: "#00553e",
        },
      },
    },
  },
  plugins: [],
};
