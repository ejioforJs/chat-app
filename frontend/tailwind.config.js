/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "corekColor1": "#73d9bc",
        "corekColor2": "#002fff",
        "corekColor3": "#1a1a1a",
      }
    },
  },
  plugins: [
    require("tailwindcss-inner-border"),
  ],
}
