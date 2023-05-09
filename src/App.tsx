import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { NavbarWrapper, RequireAuth } from 'components'
import { AppBar, FilterToolbar, GlobalAppStatusAlert } from 'widgets'
import { AccountProvider } from 'context/AccountContext'
import { AppThemeProvider } from 'context/AppThemeContext'
import { IdleTimeOutProvider } from 'context/IdleTimeOutContext'
import { InitialAppStateProvider } from 'context/InitialAppStateContext'

import HomePage from './pages/Listing/HomePage'
import LandingPage from './pages/Home/Sections/LandingPage'
import UserPage from './pages/User/UserPage'
import AppSettingsPage from './pages/User/Sections/AppSettings'
import HistoryPage from './pages/User/Sections/History'
import ProfileSettingsPage from './pages/User/Sections/ProfileSettings'
import SportSelection from './pages/Home/Sections/SportSelection'
import About from './pages/Home/Sections/About'
import Home from './pages/Home/Home'

const App = () => {
	return (
		<InitialAppStateProvider>
			<IdleTimeOutProvider>
				<AccountProvider>
					<AppThemeProvider>
						<GlobalAppStatusAlert />
						<BrowserRouter>
							<AppBar />
							{/* <FilterToolbar /> */}
							<Routes>
								<Route path="/" element={<Home />}>
									<Route path="home" element={<LandingPage />} />
									<Route path="selection" element={<SportSelection />} />
									<Route path="about" element={<About />} />
								</Route>
								<Route path="/listing" element={<HomePage />} />
								<Route element={<RequireAuth />}>
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
		</InitialAppStateProvider>
	)
}

export default App
