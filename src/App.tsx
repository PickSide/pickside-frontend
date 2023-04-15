import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { NavbarWrapper, RequireAuth } from 'components'
import { AppBar, FilterToolbar, GlobalAppStatusAlert } from 'widgets'
import { AccountProvider } from 'context/AccountContext'
import { AppThemeProvider } from 'context/AppThemeContext'
import { IdleTimeOutProvider } from 'context/IdleTimeOutContext'

import HomePage from './pages/Home/HomePage'
import LandingPage from './pages/Home/LandingPage'
import UserPage from './pages/User/UserPage'
import AppSettingsPage from './pages/User/Sections/AppSettings'
import HistoryPage from './pages/User/Sections/History'
import ProfileSettingsPage from './pages/User/Sections/ProfileSettings'

const App = () => {
	return (
		<IdleTimeOutProvider>
			<AccountProvider>
				<AppThemeProvider>
					<CssBaseline />
					<GlobalAppStatusAlert />
					<BrowserRouter>
						<NavbarWrapper>
							<AppBar />
						</NavbarWrapper>
						{/* <FilterToolbar /> */}
						<Routes>
							<Route path="/" element={<LandingPage />} />
							<Route element={<RequireAuth />}>
								<Route path="/home" element={<HomePage />} />
								<Route path="/user/" element={<UserPage />}>
									<Route path="app-settings" element={<AppSettingsPage />} />
									<Route path="history" element={<HistoryPage />} />
									<Route path="profile" element={<ProfileSettingsPage />} />
								</Route>
							</Route>
						</Routes>
					</BrowserRouter>
				</AppThemeProvider>
			</AccountProvider>
		</IdleTimeOutProvider>
	)
}

export default App
