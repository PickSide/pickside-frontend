const { BREAKPOINTS } = require('./src/utils/constants')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html',],
  important: '#root',
  darkMode: 'class',
  theme: {
    fill: {
      primary: 'white',
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
        primary: 'black',
        secondary: '#208D91',
        tertiary: '#F4FF81',
        accent: '#159546',
        sucess: '#46D339',
        error: '#D50000',
        dark: '#0C1615'
      },
      backgroundImage: {
        landing: "url('./assets/landing-page-background.png')",
        avatar: "url('./assets/avatar-placeholder.png')",
        templogo: "url('./assets/temp-logo.png')",
        templogo2: "url('./assets/temp-logo-2.png')",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
