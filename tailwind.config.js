const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
      },
      colors: {
        primary: '#4F46E5', // Indigo 600
        secondary: '#FBBF24', // Yellow 400
        accent: '#3B82F6', // Blue 500
        background: '#F9FAFB', // Gray 200
        surface: '#FFFFFF', // White
        error: '#EF4444', // Red 600
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      screens: {
        '3xl': '1792px',
      },
    },
  },
  plugins: [],
};