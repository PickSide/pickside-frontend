const { BREAKPOINTS } = require('./src/utils/constants')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  important: '#root',
  theme: {
    fill: {
      primary: '#F1F4F3',
      secondary: '#D3F9F6',
      tertiary: 'black',
    },
    fontFamily: {
      primary: ['roboto', 'sans-serif'],
      secondary: '"Roboto Slab"',
      tertiary: 'Aldrich',
    },
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      ...BREAKPOINTS
    },
    extend: {
      colors: {
        primary: '#159585',
        secondary: '#208D91',
        tertiary: '#F4FF81',
        accent: '#159546',
        sucess: '#46D339',
        error: '#D50000',
        dark: '#0C1615'
      },
      backgroundImage: {
        landing: "url('./assets/sport-color.png')",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
