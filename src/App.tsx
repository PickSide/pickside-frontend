import { useEffect } from 'react'
import { useAsync } from 'react-use'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { NavbarWrapper, RequireAuth } from 'components'
import { AppBar } from 'widgets'
import { useMode, ColorModeContext } from 'hooks/useMode'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'
import { fetchAppConfiguration } from 'state/config'
import { fetchSports } from 'state/sport'
import { fetchEvents } from 'state/sportEvent'
import { AuthContext, AuthProvider } from 'utils'
import { useAuth } from 'hooks'
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
	const connectedUser = useSelector((state: AppState) => state.connectedUser)

	useEffect(() => {
		dispatch<any>(fetchAppConfiguration())
		dispatch<any>(fetchEvents())
		dispatch<any>(fetchSports())
		i18n.changeLanguage(navigator.language)
	}, [])

	useEffect(() => {
		dispatch<any>(fetchAppConfiguration())
	}, [connectedUser])

	useEffect(() => {
		console.log(theme)
	}, [theme])

	useAsync(async () => {
		if (!appConfig) {
			colorMode.toggleColorMode()
		}
	}, [])

	return (
		<AuthProvider>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<BrowserRouter>
						<NavbarWrapper>
							<AppBar />
						</NavbarWrapper>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route element={<RequireAuth />}>
								<Route path="/user/" element={<UserPage />}>
									<Route path="app-settings" element={<AppSettingsPage />} />
									<Route path="history" element={<HistoryPage />} />
									<Route path="profile" element={<ProfileSettingsPage />} />
								</Route>
							</Route>
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</AuthProvider>
	)
}

export default App
