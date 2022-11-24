import { amber, deepOrange, grey, teal, blueGrey, common } from '@mui/material/colors'
import { PaletteMode } from '@mui/material'

export const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					primary: amber,
					divider: amber[200],
					text: {
						primary: grey[900],
						secondary: grey[800],
					},
			  }
			: {
					// palette values for dark mode
					primary: deepOrange,
					divider: deepOrange[700],
					background: {
						default: deepOrange[900],
						paper: deepOrange[900],
					},
					text: {
						primary: '#fff',
						secondary: grey[500],
					},
			  }),
		typography: {
			fontFamily: ['--apple-system', 'Roboto'].join(','),
		},
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
			},
		},
	},
})

export const getThemedComponents = (mode) => ({
	components: {
		MuiButton: {
			defaultProps: {
				size: 'small',
			},
		},
		MuiAutocomplete: {
			defaultProps: {
				size: 'small',
			},
			styleOverrides: {
				root: {
					minWidth: 200,
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
		MuiSelect: {
			defaultProps: {
				size: 'small',
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					color: common.white,
				},
			},
			defaultProps: {
				size: 'medium',
			},
		},
		MuiTypography: {},
	},
})
