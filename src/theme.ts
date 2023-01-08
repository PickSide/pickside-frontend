import { orange, red, indigo, grey, yellow, common, green, amber, deepOrange, blue } from '@mui/material/colors'
import { PaletteMode } from '@mui/material'

export const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					primary: {
						contrastText: common.white,
						dark: orange[900],
						main: orange[500],
						light: orange[100],
					},
					secondary: {
						contrastText: common.white,
						dark: amber[900],
						main: amber[500],
						light: amber[100],
					},
					danger: {
						contrastText: common.white,
						dark: red[900],
						main: red[500],
						light: red[100],
					},
					success: {
						contrastText: common.white,
						dark: green[500],
						main: green[300],
						light: green[200],
					},
					info: {
						contrastText: common.white,
						dark: grey[600],
						main: grey[400],
						light: grey[200],
					},
					warning: {
						contrastText: common.white,
						dark: yellow['A200'],
						main: yellow[500],
						light: yellow[300],
					},
					error: {
						contrastText: common.white,
						dark: red['A700'],
						main: red['A400'],
						light: red['A200'],
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
			  }
			: {
					// palette values for dark mode
					primary: {
						contrastText: common.white,
						dark: deepOrange[900],
						main: deepOrange[500],
						light: deepOrange[100],
					},
					secondary: {
						contrastText: common.white,
						dark: indigo[900],
						main: indigo[500],
						light: indigo[100],
					},
					danger: {
						contrastText: common.white,
						dark: indigo[900],
						main: indigo[500],
						light: indigo[100],
					},
					success: {
						contrastText: common.white,
						dark: green[900],
						main: green[600],
						light: green[400],
					},
					info: {
						contrastText: common.white,
						dark: blue[900],
						main: blue[600],
						light: blue[400],
					},
					warning: {
						contrastText: common.white,
						dark: orange[900],
						main: orange[600],
						light: orange[400],
					},
					error: {
						contrastText: common.white,
						dark: red[900],
						main: red[600],
						light: red[400],
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
