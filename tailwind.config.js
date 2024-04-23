/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "Ubuntu":["Ubuntu Condensed", "sans-serif"],
        "Dosis":["Dosis", "sans-serif"]
      },
      fontSize:{
        my:"2.5rem"
      },
      colors:{
        "myBlue":'#592DD1'
      },
      screens:{
        "mobile":"509px"
      }
    },
  },
  plugins: [],
}

