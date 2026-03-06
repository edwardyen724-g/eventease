const { grayscale, colors } = require('tailwindcss/colors');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}', 
    './pages/**/*.{js,ts,jsx,tsx}', 
    './public/**/*.{html}', 
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue['500'],
        secondary: colors.green['500'],
        accent: colors.orange['400'],
        background: colors.gray['50'],
        text: colors.gray['800'],
        muted: colors.gray['600'],
      },
      fontFamily: {
        sans: ['Nunito Sans', 'ui-sans-serif', 'system-ui'],
        serif: ['Merriweather', 'ui-serif', 'Georgia'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};