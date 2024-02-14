/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: `'Montserrat', sans-serif`,
        merriweather: `'Merriweather', serif`,
        raleway: `'Raleway', sans-serif`,
        lexend: `'Lexend', sans-serif`,
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("prettier-plugin-tailwindcss"),
    // require('flowbite/plugin')
  ],
};
