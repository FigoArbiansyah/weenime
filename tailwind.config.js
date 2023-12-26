/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-light": "rgb(30 41 59)",
        "primary-dark": "rgb(248 250 252)",
      },
    },
  },
  plugins: [],
};
