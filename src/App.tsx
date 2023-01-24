import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { NavbarWrapper, RequireAuth } from 'components'
import { AppBar } from 'widgets'
import { useTheme } from 'hooks'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'
import { fetchAvailableThemes } from 'state/availableTheme'
import { changeTheme } from 'state/appTheme'
import { fetchAppConfiguration } from 'state/config'
import { fetchSports } from 'state/sport'
import { fetchEvents } from 'state/sportEvent'
import { AuthProvider } from 'utils/context/AuthContext'

import HomePage from './pages/Home/HomePage'
import UserPage from './pages/User/UserPage'
import AppSettingsPage from './pages/User/Sections/AppSettings'
import HistoryPage from './pages/User/Sections/History'
import ProfileSettingsPage from './pages/User/Sections/ProfileSettings'

const App = () => {
	const dispatch = useDispatch()
	const { palette } = useTheme()
	const { i18n } = useTranslation()

	const appConfig = useSelector((state: AppState) => state.appConfig)
	const availableThemes = useSelector((state: AppState) => state.availableThemes)
	const connectedUser = useSelector((state: AppState) => state.connectedUser)
	const sports = useSelector((state: AppState) => state.sports)

	useEffect(() => {
		if (!availableThemes) {
			dispatch<any>(fetchAvailableThemes())
		}
		if (!sports) {
			dispatch<any>(fetchSports())
		}
		if (!appConfig) {
			dispatch<any>(fetchAppConfiguration())
		}
		dispatch<any>(fetchEvents())
		i18n.changeLanguage(navigator.language)
	}, [])

	useEffect(() => {
		if (connectedUser?.id === appConfig.userId) {
			dispatch<any>(changeTheme(appConfig.defaultTheme?.value))
		}
	}, [connectedUser, appConfig])

	return (
		<AuthProvider>
			<ThemeProvider theme={palette}>
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
		</AuthProvider>
	)
}

export default App
