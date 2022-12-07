import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { setEventLocations, EventLocations } from 'state/eventLocation'
import { DefaultNavbar, NavbarContent } from 'components'
import { useMode, ColorModeContext } from 'hooks/useMode'
import HomePage from './pages/Home/HomePage'
import { AppState } from 'state'

const App = () => {
	const dispatch = useDispatch()
	const [theme, colorMode] = useMode()

	return (
		<>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<BrowserRouter>
						<DefaultNavbar>
							<NavbarContent />
						</DefaultNavbar>
						<Routes>
							<Route path="/" element={<HomePage />} />
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</>
	)
}

export default App
