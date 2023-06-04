/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mochiypop: ["Mochiy Pop P One", "sans-serif"],
      },
      backgroundImage: {
        "main-bg": "url('/main-bg.png')",
      },
      width: {
        120: "30rem",
        180: "45rem",
      },
      spacing: {
        120: "30rem",
        144: "37rem",
        320: "80rem",
      },
    },
  },
};
