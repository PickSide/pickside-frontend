import { useAsync } from 'react-use'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { NavbarWrapper, RequireAuth } from 'components'
import { AppBar, FilterToolbar } from 'widgets'
import { useTheme } from 'hooks'
import { AppState } from 'state'
import { AccountContext } from 'context'

import HomePage from './pages/Home/HomePage'
import UserPage from './pages/User/UserPage'
import AppSettingsPage from './pages/User/Sections/AppSettings'
import HistoryPage from './pages/User/Sections/History'
import ProfileSettingsPage from './pages/User/Sections/ProfileSettings'

const App = () => {
	const { palette } = useTheme()

	const user = useSelector((state: AppState) => state.account)

	return (
		<AccountContext.Provider value={{ user }}>
			<ThemeProvider theme={palette}>
				<CssBaseline />
				<NavbarWrapper>
					<AppBar />
				</NavbarWrapper>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route element={<RequireAuth />}>
							<FilterToolbar />
							<Route path="/user/" element={<UserPage />}>
								<Route path="app-settings" element={<AppSettingsPage />} />
								<Route path="history" element={<HistoryPage />} />
								<Route path="profile" element={<ProfileSettingsPage />} />
							</Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</AccountContext.Provider>
	)
}

export default App
