const { BREAKPOINTS } = require('./src/utils/constants')

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	important: ['#root', '#portal'],
	darkMode: 'class',
	theme: {
		container: {
			padding: {
				DEFAULT: '15px',
			},
		},
		content: {
			'img-placeholder': "url('./assets/upload-placeholder.svg')",
		},
		extend: {
			backgroundImage: {
				avatar: "url('./assets/avatar-placeholder.png')",
				'card-placeholder': 'url(./assets/card_placeholder.jpeg)',
				landing: "url('./assets/landing.png')",
				'landing-texture': "url('./assets/landing-texture.png')",
				'soccer-ball': "url('./assets/soccer-ball.png')",
				'logo-with-text': "url('./assets/logo-with-text.svg')",
				logo: "url('./assets/logo.svg')",
			},
			boxShadow: {
				md: '0px 0px 7px 5px rgba(20, 74, 117, 0.25)',
				menu: '2px 2px 8px 0px rgba(0, 0, 0, 0.10), -2px -2px 8px 0px rgba(0, 0, 0, 0.10)',
			},
			colors: {
				ocean: {
					1: '#EDF7FF',
					2: '#5293C7',
					DEFAULT: '#144A75',
					4: '#0F3554',
				},
				secondary: '#17494D',
				tertiary: '#F4FF81',
				info: '#156495',
				success: '#74cd8d',
				error: {
					100: '#ebc8c2',
					200: '#c5a6a4',
					DEFAULT: '#c96972',
				},
				warning: '#eed202',
				dark: '#0C1615',
				light: '#F8F8F8',
				'charcoal-black': '#2F3941',
				grey: {
					100: '#F8F9F9',
					600: '#68737D',
					700: '#49545C',
				},
				cloud: '#FBFBFB',
				'cool-gray': {
					0: '#F8F9F9',
					1: '#EAEAEA',
					2: '#D9D9D9',
					3: '#C2C8CC',
					4: '#68737D',
				},
				duck: {
					1: '#DAEDED',
					2: '#90BBBB',
					3: '#467B7C',
					4: '#17494D',
				},
				kale: {
					200: '#DAEDED',
				},
				pistachio: {
					1: '#DAF6D7',
					2: '#A9EAA3',
					3: '#6BDC61',
					4: '#46D339',
				},
			},
			flexGrow: {
				2: '2',
			},
			gridRow: {
				'span-12': 'span 12 / span 12',
				'span-14': 'span 14 / span 14',
				'span-16': 'span 16 / span 16',
				'span-18': 'span 18 / span 18',
			},
			gridTemplateRows: {
				12: 'repeat(12, minmax(0, 1fr))',
				14: 'repeat(14, minmax(0, 1fr))',
				16: 'repeat(16, minmax(0, 1fr))',
			},
			zIndex: {
				60: '60',
				70: '70',
				80: '80',
				90: '90',
				100: '100',
			},
		},
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
			xs: ['10px', { lineHeight: '1.5' }],
			sm: ['13px', { lineHeight: '1.5' }],
			base: ['16px', { lineHeight: '1.5' }],
			lg: ['20px', { lineHeight: '1.5' }],
		},
		screens: {
			...BREAKPOINTS,
		},
	},
	plugins: [require('tailwind-scrollbar')],
}
