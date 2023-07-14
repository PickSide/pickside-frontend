import { AppBar, GlobalAppStatusAlert } from 'widgets'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import About from './pages/Home/Sections/About'
import AccountManagement from './pages/User/Sections/AccountManagement'
import { AccountProvider } from 'context/AccountContext'
import ActivityHistory from './pages/User/Sections/ActivityHistory'
import { AnimatePresence } from 'framer-motion'
import { AppThemeProvider } from 'context/AppThemeContext'
import CreateEvent from './pages/Event/CreateEvent'
import EditProfile from './pages/User/Sections/EditProfile'
import Groups from './pages/User/Groups'
import Home from './pages/Home/Home'
import { IdleTimeOutProvider } from 'context/IdleTimeOutContext'
import { InitialAppStateProvider } from 'context/InitialAppStateContext'
import LandingPage from './pages/Home/Sections/LandingPage'
import Listing from './pages/Listing/Listing'
import Login from './pages/Authentication/Login'
import PersonalInfo from './pages/User/Sections/PersonalInfo'
import Privacy from './pages/User/Sections/Privacy'
import { RequireAuth } from 'components'
import Settings from './pages/User/Settings'
import SignUp from './pages/Authentication/SignUp'
import SocialMedia from './pages/User/Sections/SocialMedia'
import { ToastProvider } from 'context/ToastContext'
import UpcomingEvents from './pages/User/UpcomingEvents'

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
											<Route path="about" element={<About />} />
										</Route>
										<Route path="/login" element={<Login />} />
										<Route path="/signup" element={<SignUp />} />
										<Route path="/listing" element={<Listing />} />
										<Route path="/new-event" element={<CreateEvent />} />
										<Route element={<RequireAuth />}>
											<Route path="/user/">
												<Route path="upcoming-events/" element={<UpcomingEvents />} />
												<Route path="groups/" element={<Groups />} />
												<Route path="settings/" element={<Settings />}>
													<Route index element={<Navigate to="/user/settings/edit-profile" />} />
													<Route path="edit-profile" element={<EditProfile />} />
													<Route path="personal-info" element={<PersonalInfo />} />
													<Route path="account-management" element={<AccountManagement />} />
													<Route path="activity-history" element={<ActivityHistory />} />
													<Route path="privacy" element={<Privacy />} />
													<Route path="social-media" element={<SocialMedia />} />
												</Route>
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
