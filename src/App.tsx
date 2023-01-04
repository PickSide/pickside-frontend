import { useEffect } from 'react'
import { useAsync } from 'react-use'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { DefaultNavbar, NavbarContent } from 'components'
import { useMode, ColorModeContext } from 'hooks/useMode'
import HomePage from './pages/Home/HomePage'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'
import { fetchAppConfiguration } from 'state/config'

const App = () => {
	const dispatch = useDispatch()
	const [theme, colorMode] = useMode()
	const { i18n } = useTranslation()
	const appConfig = useSelector((state: AppState) => state.appConfig)

	useAsync(async () => {
		const lng = navigator.language
		i18n.changeLanguage(lng)

		if (!appConfig) {
			await dispatch<any>(fetchAppConfiguration())
			colorMode.toggleColorMode()
		}
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
