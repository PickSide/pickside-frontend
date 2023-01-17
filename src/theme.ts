import { orange, red, indigo, grey, yellow, pink, common, green, amber, deepOrange, blue } from '@mui/material/colors'
import { PaletteMode } from '@mui/material'

export const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					primary: orange,
					secondary: pink,
					danger: {
						main: red[500],
					},
					success: {
						main: green[300],
					},
					info: {
						main: grey[400],
					},
					warning: {
						main: yellow[500],
					},
					error: {
						main: red['A400'],
					},
					divider: orange[600],
					text: {
						primary: grey[800],
						link: blue[600],
					},
					menuItemBorderBottom: {
						primary: grey[300],
						secondary: grey[500],
					},
					subNavbar: common.white,
			  }
			: {
					// palette values for dark mode
					primary: deepOrange,
					secondary: pink,
					danger: {
						main: indigo[500],
					},
					success: {
						main: green[600],
					},
					info: {
						main: blue[600],
					},
					warning: {
						main: orange[600],
					},
					error: {
						main: red[600],
					},
					divider: orange[600],
					text: {
						primary: common.white,
						secondary: grey[500],
						link: blue[600],
					},
					menuItemBorderBottom: {
						primary: grey[500],
						secondary: grey[300],
					},
					subNavbar: grey,
			  }),
	},
	typography: {
		fontFamily: ['--apple-system', 'Roboto'].join(','),
	},
	icon: common.white,
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1250,
			xl: 1536,
		},
	},
	spacing: [0, 4, 8, 12, 16, 32, 64],
	mixins: {
		toolbar: {
			minHeight: 50,
			backgroundColor: common.white,
		},
	},
})

export const getThemedComponents = (mode) => ({
	components: {
		MuiButtonBase: {
			defaultProps: {
				size: 'small',
				disableRipple: true,
				color: 'secondary.main',
			},
			styleOverrides: {
				root: {},
			},
		},
		MuiFormControl: {
			styleOverrides: {
				root: {
					width: '100%',
				},
			},
		},
		MuiInputBase: {
			defaultProps: {
				size: 'small',
			},
			styleOverrides: {
				root: {
					minWidth: 200,
				},
			},
		},
		MuiTypography: {
			defaultProps: {
				variantMapping: {
					h1: 'h1',
					h2: 'h2',
					h3: 'h3',
					h4: 'h4',
					h5: 'h5',
					h6: 'h6',
					subtitle1: 'h2',
					subtitle2: 'h2',
					body1: 'span',
					body2: 'span',
					headerSmall: 'h3',
					headerMedium: 'h2',
					headerLarge: 'h1',
				},
			},
		},
	},
})
