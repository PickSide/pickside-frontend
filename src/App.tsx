import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { DefaultNavbar, NavbarContent } from 'components'
import { useMode, ColorModeContext } from 'hooks/useMode'
import HomePage from './pages/Home/HomePage'

const App = () => {
	const [theme, colorMode] = useMode()
	const { i18n } = useTranslation()

	useEffect(() => {
		const lng = navigator.language
		i18n.changeLanguage(lng)
	}, [])

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
