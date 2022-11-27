/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['"Inter"', defaultTheme.fontFamily.sans],
    },
    extend: {
      screens: {
        'fhd': '1720px',
        '2xl': '1580px',
        'xl': '1448px',
      },
      animation: {
        'fadeinspecial': 'fadein .5s ease-out'
      },
      keyframes: {
        fadein: {
          '0%': { opacity: '0%', marginTop: '3rem' },
          '100%': { opacity: '100%', marginTop: '0' }
        }
      }
    },
  },
  plugins: [],
};
