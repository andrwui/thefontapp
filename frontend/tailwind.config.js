/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        mainLayout: '250px 1fr',
      },
      gridTemplateRows: {
        mainLayout: '1fr 20fr;',
      },
      fontFamily: {
        inter: ['"Inter"'],
      },
    },
  },
  plugins: [],
}
