/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "Outfit":['Outfit']
      }
      },
      boxShadow: {
        'shad': ' 0px 1px 1px rgba(0, 0, 0, 0.10)',
      }
  },
  plugins: [],
}
