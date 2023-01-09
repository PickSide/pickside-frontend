import { useAsync } from 'react-use'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { NavbarWrapper } from 'components'
import { AppBar } from 'widgets'
import { useMode, ColorModeContext } from 'hooks/useMode'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'
import { fetchAppConfiguration } from 'state/config'
import HomePage from './pages/Home/HomePage'
import UserPage from './pages/User/UserPage'
import AppSettingsPage from './pages/User/Sections/AppSettings'
import HistoryPage from './pages/User/Sections/History'
import ProfileSettingsPage from './pages/User/Sections/ProfileSettings'

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
						<NavbarWrapper>
							<AppBar />
						</NavbarWrapper>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/user/" element={<UserPage />}>
								<Route path="app-settings" element={<AppSettingsPage />} />
								<Route path="history" element={<HistoryPage />} />
								<Route path="profile" element={<ProfileSettingsPage />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</>
	)
}

export default App
