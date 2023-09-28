const { BREAKPOINTS } = require('./src/utils/constants')

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	important: '#root',
	darkMode: 'class',
	theme: {
		fill: {
			primary: '#68737D',
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
			...BREAKPOINTS,
		},
		extend: {
			boxShadow: {
				md: '0px 0px 7px 5px rgba(20, 74, 117, 0.25)',
			},
			colors: {
				primary: '#144A75', // --blue-blue-700
				secondary: '#208D91',
				tertiary: '#68737D', // --grey-grey-600
				accent: '#FFFFFF',
				sucess: '#46D339',
				error: '#D50000',
				dark: '#0C1615',
			},
			backgroundImage: {
				landing: "url('./assets/landing-page-background.png')",
				'landing-texture': "url('./assets/landing-texture.png')",
				avatar: "url('./assets/avatar-placeholder.png')",
				templogo: "url('./assets/temp-logo.png')",
				templogo2: "url('./assets/temp-logo-2.png')",
			},
			flexGrow: {
				2: '2',
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
}
