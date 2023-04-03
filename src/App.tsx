import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { NavbarWrapper, RequireAuth } from 'components'
import { AppBar, FilterToolbar, GlobalAppStatusAlert } from 'widgets'
import { useTheme } from 'hooks'
import { AccountProvider } from 'context/AccountContext'
import { IdleTimeOutProvider } from 'context/IdleTimeOutContext'

import HomePage from './pages/Home/HomePage'
import UserPage from './pages/User/UserPage'
import AppSettingsPage from './pages/User/Sections/AppSettings'
import HistoryPage from './pages/User/Sections/History'
import ProfileSettingsPage from './pages/User/Sections/ProfileSettings'

const App = () => {
	const { palette } = useTheme()

	return (
		<IdleTimeOutProvider>
			<AccountProvider>
				<ThemeProvider theme={palette}>
					<CssBaseline />
					<GlobalAppStatusAlert />
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
			</AccountProvider>
		</IdleTimeOutProvider>
	)
}

export default App
