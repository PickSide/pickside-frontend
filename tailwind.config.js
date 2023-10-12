const { BREAKPOINTS } = require('./src/utils/constants')

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	important: '#root',
	darkMode: 'class',
	theme: {
		fill: {
			primary: '#144A75',
			secondary: '#17494D',
			tertiary: '#F4FF81',
		},
		fontFamily: {
			primary: ['Roboto', 'sans-serif'],
			secondary: '"Roboto Slab"',
			tertiary: 'Aldrich',
		},
		fontSize: {
			xs: ["10px", { lineHeight: "1.5" }],
			sm: ["13px", { lineHeight: "1.5" }],
			base: ["16px", { lineHeight: "1.5" }],
			lg: ["20px", { lineHeight: "1.5" }],
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
				primary: '#144A75',
				secondary: '#17494D',
				tertiary: '#F4FF81',
				sucess: '#46D339',
				error: '#D50000',
				dark: '#0C1615',
				light: '#F8F8F8',
				'charcoal-black': '#2F3941',
				'grey': {
					600: '#68737D'
				},
				'cool-gray': {
					1: '#EAEAEA',
					2: '#D9D9D9',
					3: '#C2C8CC',
					4: '#68737D'
				},
				'duck': {
					1: '#DAEDED',
					2: '#90BBBB',
					3: '#467B7C',
					4: '#17494D'
				},
				'kale': {
					200: '#DAEDED'
				},
				'ocean': {
					1: '#EDF7FF',
					2: '#5293C7',
					3: '#144A75',
					4: '#0F3554'
				},
				'pistachio': {
					1: '#DAF6D7',
					2: '#A9EAA3',
					3: '#6BDC61',
					4: '#46D339'
				},
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
