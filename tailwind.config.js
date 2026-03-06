const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#FBBF24',
        accent: '#A78BFA',
        background: '#F9FAFB',
        surface: '#FFFFFF',
        error: '#EF4444',
        onPrimary: '#FFFFFF',
        onSecondary: '#000000',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        serif: ['Merriweather', ...fontFamily.serif],
      },
      spacing: {
        18: '4.5rem',
        72: '18rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};