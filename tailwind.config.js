/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cardinal-red': '#8C1515',
        'cardinal-dark': '#660C0C',
      },
    },
  },
  plugins: [],
};