const { daisyUI } = require('daisyui');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Example primary color
        secondary: '#FBBF24', // Example secondary color
      },
    },
  },
  plugins: [daisyUI],
};