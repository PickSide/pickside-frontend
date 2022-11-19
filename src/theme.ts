import { teal, blueGrey, common } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
	interface Theme {}
	interface ThemeOptions {}
}

export default createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1250,
			xl: 1536,
		},
	},
	components: {
		MuiButton: {
			defaultProps: {
				size: 'small',
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
	palette: {
		primary: {
			light: blueGrey[200],
			main: blueGrey[900],
			dark: teal[900],
			contrastText: blueGrey[50],
		},
		common: {
			white: '#FFFFFF',
			black: '#000000',
		},
	},
	mixins: {
		toolbar: {
			minHeight: 50,
		},
	},
	spacing: [0, 4, 8, 12, 16, 32, 64],
	typography: {
		fontFamily: ['--apple-system', 'Roboto'].join(','),
	},
})
