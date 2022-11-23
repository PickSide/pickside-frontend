import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { AppState } from 'state'
import { DefaultNavbar, NavbarContent } from 'components'
import { useMode, ColorModeContext } from 'hooks/useMode'
import HomePage from './pages/Home/HomePage'

const App = () => {
	const [theme, colorMode] = useMode()
	const state = useSelector((state: AppState) => state.appConfig)
	return (
		<>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<BrowserRouter>
						<DefaultNavbar>
							{console.log(state)}
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
