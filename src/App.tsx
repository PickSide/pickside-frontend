import { AppBar, GlobalAppStatusAlert } from '@components'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import About from '@pages/Home/components/About'
import AccountManagement from '@pages/UserSettings/Sections/AccountManagement'
import { AccountProvider } from '@context/AccountContext'
import ActivityHistory from '@pages/UserSettings/Sections/ActivityHistory'
import { AppThemeProvider } from '@context/AppThemeContext'
import { AxiosProvider } from '@context/AxiosContext'
import CreateEvent from '@pages/NewEvent/CreateEvent'
import EditProfile from '@pages/UserSettings/Sections/EditProfile'
import { GoogleMapApiProvider } from '@context/GoogleMapApiContext'
import Groups from '@pages/UserGroups/Groups'
import Home from '@pages/Home/Home'
import { IdleTimeOutProvider } from '@context/IdleTimeOutContext'
import { InitialAppStateProvider } from '@context/InitialAppStateContext'
import LandingPage from '@pages/Home/components/LandingPage'
import Listing from '@pages/Listing/Listing'
import Login from '@pages/Login/Login'
import { NotificationProvider } from '@context/NotificationContext'
import PersonalInfo from '@pages/UserSettings/Sections/PersonalInfo'
import Privacy from '@pages/UserSettings/Sections/Privacy'
import { QueryClientProvider } from '@tanstack/react-query'
import { RequireAuth } from '@components'
import Settings from '@pages/UserSettings/UserSettings'
import SignUp from '@pages/Signup/SignUp'
import SocialMedia from '@pages/UserSettings/Sections/SocialMedia'
import { ToastProvider } from '@context/ToastContext'
import UpcomingEvents from '@pages/UserUpcomingEvents/UpcomingEvents'
import { WindowProvider } from '@context/WindowContext'
import { Wrapper } from '@googlemaps/react-wrapper'
import queryClient from '@client'

const App = () => {
	return (
		<AxiosProvider>
			<QueryClientProvider client={queryClient}>
				<InitialAppStateProvider>
					<Wrapper apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
						<IdleTimeOutProvider>
							<AccountProvider>
								<NotificationProvider>
									<AppThemeProvider>
										<GlobalAppStatusAlert />
										<WindowProvider>
											<BrowserRouter>
												<AppBar />
												<ToastProvider>
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
												</ToastProvider>
											</BrowserRouter>
										</WindowProvider>
									</AppThemeProvider>
								</NotificationProvider>
							</AccountProvider>
						</IdleTimeOutProvider>
					</Wrapper>
				</InitialAppStateProvider>
			</QueryClientProvider>
		</AxiosProvider>
	)
}

export default App
