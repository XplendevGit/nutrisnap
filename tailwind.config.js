/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3CC4B9",
        secondary: {
          1: "#23C55E",
          2: "#ea580b",
        },
      },
      fontFamily: {
        body: ["Nunito"],
      },
    },
    extend: {
      elevation: {
        1: '1',
        2: '2',
        4: '4',
        8: '8',
      },
    },
  },
  plugins: [],
}

