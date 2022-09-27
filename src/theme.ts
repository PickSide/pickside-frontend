import { teal, blueGrey } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export default createTheme({
	palette: {
		primary: {
			light: blueGrey[200],
			main: blueGrey[900],
			dark: teal[900],
			contrastText: blueGrey[50],
		},
	},
})
