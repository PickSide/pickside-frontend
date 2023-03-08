import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { NavbarWrapper, RequireAuth } from 'components'
import { AppBar, FilterToolbar } from 'widgets'
import { useTheme } from 'hooks'
import { AppState } from 'state'
import { fetchAvailableThemes } from 'state/availableTheme'
import { changeLanguage, changeTheme } from 'state/appConfig'
import { fetchUserConfiguration } from 'state/userConfig'
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
	const userConfig = useSelector((state: AppState) => state.userConfig)
	const availableThemes = useSelector((state: AppState) => state.availableThemes)
	const connectedUser = useSelector((state: AppState) => state.connectedUser)

	useEffect(() => {
		if (!availableThemes) {
			dispatch<any>(fetchAvailableThemes())
		}
		if (!userConfig) {
			dispatch<any>(fetchUserConfiguration())
		}
		dispatch<any>(fetchEvents())
	}, [])

	useEffect(() => {
		if (connectedUser?.id === userConfig?.userId) {
			dispatch<any>(changeTheme(userConfig?.defaultTheme?.value))
			dispatch<any>(changeLanguage(userConfig?.locale))
		}
	}, [connectedUser, dispatch, userConfig])

	useEffect(() => {
		i18n.changeLanguage(appConfig.lang)
	}, [appConfig.lang ,i18n])

	return (
		<AuthProvider>
			<ThemeProvider theme={palette}>
				<CssBaseline />
				<BrowserRouter>
					<NavbarWrapper>
						<AppBar />
					</NavbarWrapper>
					<FilterToolbar />
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
