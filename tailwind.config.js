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
        main: "url('/main/background.png')",

        "stage-1": "url('/background/stage-1.jpg')",
        "stage-2": "url('/background/stage-2.jpg')",
        "stage-3": "url('/background/stage-3.jpg')",
        "stage-4": "url('/background/stage-4.jpg')",
        "stage-5": "url('/background/stage-5.jpg')",
        "stage-6": "url('/background/stage-6.jpg')",
        "stage-7": "url('/background/stage-7.jpg')",
        "stage-8": "url('/background/stage-8.jpg')",
        "stage-9": "url('/background/stage-9.jpg')",
        "stage-10": "url('/background/stage-10.jpg')",
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
      colors: {
        twitter: "#0796ed",
        "twitter-hover": "#096dab",

        base: "#fffcf5",
        first: "#ffca47",
        second: "#fff2d8",
        third: "#718cb0",
      },
    },
  },
};
