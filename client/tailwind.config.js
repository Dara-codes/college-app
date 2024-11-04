/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "Inter", "sans-serif"],
      },
      dropShadow: {
        number: "0 8px 12px #2F6E9E, 0 4px 4px #30709F",
      },
      colors: {
        "primary-blue": "#2B6CB0",
        "primary-yellow": "#FCD34D",
        "button-yellow": "#F6AD37",
      },
      maxWidth: {
        375: "375px",
      },
    },
  },
  plugins: [],
};
