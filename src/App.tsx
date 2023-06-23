import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { RequireAuth } from 'components'
import { AppBar, GlobalAppStatusAlert } from 'widgets'
import { AccountProvider } from 'context/AccountContext'
import { AppThemeProvider } from 'context/AppThemeContext'
import { IdleTimeOutProvider } from 'context/IdleTimeOutContext'
import { InitialAppStateProvider } from 'context/InitialAppStateContext'

import Listing from './pages/Listing/Listing'
import LandingPage from './pages/Home/Sections/LandingPage'
import UserPage from './pages/User/UserPage'
import AppSettingsPage from './pages/User/Sections/AppSettings'
import HistoryPage from './pages/User/Sections/History'
import ProfileSettingsPage from './pages/User/Sections/ProfileSettings'
import SportSelection from './pages/Home/Sections/ServiceDescription'
import About from './pages/Home/Sections/About'
import Home from './pages/Home/Home'
import Login from './pages/Authentication/Login'
import SignUp from './pages/Authentication/SignUp'
import CreateEvent from './pages/Event/CreateEvent'
import { ToastProvider } from 'context/ToastContext'

const App = () => {
	return (
		<InitialAppStateProvider>
			<IdleTimeOutProvider>
				<AccountProvider>
					<AppThemeProvider>
						<GlobalAppStatusAlert />
						<BrowserRouter>
							<AppBar />
							<ToastProvider>
								<AnimatePresence mode="wait">
									<Routes>
										<Route path="/" element={<Home />}>
											<Route path="home" element={<LandingPage />} />
											<Route path="selection" element={<SportSelection />} />
											<Route path="about" element={<About />} />
										</Route>
										<Route path="/login" element={<Login />} />
										<Route path="/signup" element={<SignUp />} />
										<Route path="/listing" element={<Listing />} />
										<Route path="/new-event" element={<CreateEvent />} />
										<Route element={<RequireAuth />}>
											<Route path="/user/" element={<UserPage />}>
												<Route path="app-settings" element={<AppSettingsPage />} />
												<Route path="history" element={<HistoryPage />} />
												<Route path="profile" element={<ProfileSettingsPage />} />
											</Route>
										</Route>
									</Routes>
								</AnimatePresence>
							</ToastProvider>
						</BrowserRouter>
					</AppThemeProvider>
				</AccountProvider>
			</IdleTimeOutProvider>
		</InitialAppStateProvider>
	)
}

export default App
