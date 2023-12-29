import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import About from '@pages/Home/sections/HowItWorks'
import AccountManagement from '@pages/UserSettings/Sections/AccountManagement'
import ActivityHistory from '@pages/UserSettings/Sections/ActivityHistory'
import AppBar from '@pages/Appbar/AppBar'
import { AppThemeProvider } from '@context/AppThemeContext'
import { AxiosProvider } from '@context/AxiosContext'
import ChatroomContainer from '@components/global/ChatroomContainer'
import CreateEvent from '@pages/NewEvent/CreateEvent'
import EditProfile from '@pages/UserSettings/Sections/EditProfile'
import { EmailVerificationProvider } from '@context/EmailVerificationContext'
import Favorites from '@pages/UserSettings/Sections/Favorites'
import Groups from '@pages/UserSettings/Sections/Groups'
import Home from '@pages/Home/Home'
import { IdleTimeOutProvider } from '@context/IdleTimeOutContext'
import { InitialAppStateProvider } from '@context/InitialAppStateContext'
import LandingPage from '@pages/Home/sections/LandingPage'
import Listing from '@pages/Listing/Listing'
import Login from '@pages/Login/Login'
import PersonalInfo from '@pages/UserSettings/Sections/PersonalInfo'
import Privacy from '@pages/UserSettings/Sections/Privacy'
import { ProtectedRoute } from '@components'
import { QueryClientProvider } from '@tanstack/react-query'
import { RTAContentProvider } from '@context/RTAContentContext'
import { RequireAuth } from '@components'
import Settings from '@pages/UserSettings/UserSettings'
import { SidenavProvider } from '@context/SidenavContext'
import SignUp from '@pages/Signup/SignUp'
import SocialMedia from '@pages/UserSettings/Sections/SocialMedia'
import { ToastProvider } from '@context/ToastContext'
import { USER_PERMISSIONS } from '@state/user/constants'
import UpcomingEvents from '@pages/UserUpcomingEvents/UpcomingEvents'
import UserDetail from '@pages/UserDetail/UserDetail'
import { WindowProvider } from '@context/WindowContext'
import queryClient from '@client'

const App = () => {
	return (
		<AxiosProvider>
			<QueryClientProvider client={queryClient}>
				<RTAContentProvider>
					<InitialAppStateProvider>
						<EmailVerificationProvider>
							<IdleTimeOutProvider>
								<AppThemeProvider>
									<ChatroomContainer />
									<WindowProvider>
										<SidenavProvider>
											<BrowserRouter>
												<AppBar />
												<ToastProvider>
													<Routes>
														<Route path="/" element={<Home />}>
															<Route index path="home" element={<LandingPage />} />
															<Route path="about" element={<About />} />
														</Route>
														<Route
															path="/new-event"
															element={
																<ProtectedRoute permissions={[USER_PERMISSIONS.ACTIVITIES_CREATE]}>
																	<CreateEvent />
																</ProtectedRoute>
															}
														/>
														<Route
															path="/listing"
															element={
																<ProtectedRoute
																	allowsGuestAccount
																	permissions={[USER_PERMISSIONS.ACTIVITIES_VIEW, USER_PERMISSIONS.MAP_VIEW]}
																>
																	<Listing />
																</ProtectedRoute>
															}
														/>
														<Route
															path="/user-detail/:id"
															element={
																<ProtectedRoute allowsGuestAccount permissions={[USER_PERMISSIONS.USERS_VIEW_DETAIL]}>
																	<UserDetail />
																</ProtectedRoute>
															}
														/>
														<Route path="/login" element={<Login />} />
														<Route path="/signup" element={<SignUp />} />
														<Route element={<RequireAuth />}>
															<Route path="/user/">
																<Route path="upcoming-events/" element={<UpcomingEvents />} />
																<Route path="settings/" element={<Settings />}>
																	<Route index element={<Navigate to="/user/settings/edit-profile" />} />
																	<Route path="edit-profile" element={<EditProfile />} />
																	<Route path="favorites" element={<Favorites />} />
																	<Route path="groups" element={<Groups />} />
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
										</SidenavProvider>
									</WindowProvider>
								</AppThemeProvider>
							</IdleTimeOutProvider>
						</EmailVerificationProvider>
					</InitialAppStateProvider>
				</RTAContentProvider>
			</QueryClientProvider>
		</AxiosProvider>
	)
}

export default App
