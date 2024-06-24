import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import About from '@pages/Home/sections/HowItWorks'
import AccountManagement from '@pages/UserSettings/Sections/AccountManagement'
import ActivityHistory from '@pages/UserSettings/Sections/ActivityHistory'
import AppBar from '@pages/Appbar/AppBar'
import CreateEvent from '@pages/NewEvent/CreateEvent'
import EditProfile from '@pages/UserSettings/Sections/EditProfile'
import { FC } from 'react'
import Groups from '@pages/UserSettings/Sections/Groups'
import Home from '@pages/Home/Home'
import { IdleTimeOutProvider } from '@context/IdleTimeOutContext'
import LandingPage from '@pages/Home/sections/LandingPage'
import Listing from '@pages/Listing/Listing'
import Login from '@pages/Login/Login'
import Privacy from '@pages/UserSettings/Sections/Privacy'
import { ProtectedRoute } from '@components'
import { RequireAuth } from '@components'
import Settings from '@pages/UserSettings/UserSettings'
import SignUp from '@pages/Signup/SignUp'
import SocialMedia from '@pages/UserSettings/Sections/SocialMedia'
import { USER_PERMISSIONS } from '@state/me/constants'
import UpcomingEvents from '@pages/UserUpcomingEvents/UpcomingEvents'
import UserDetail from '@pages/UserDetail/UserDetail'

const PicksideRoutes: FC = () => {
	return (
		<Router>
			<AppBar />
			<IdleTimeOutProvider />
			<Routes>
				<Route path="/" element={<Home />}>
					<Route index path="home" element={<LandingPage />} />
					<Route path="about" element={<About />} />
				</Route>
				<Route path="/listing" element={<Listing />} />
				<Route path="/user-detail/:id" element={<UserDetail />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route element={<RequireAuth />}>
					<Route
						path="/new-event"
						element={
							<ProtectedRoute permissions={[USER_PERMISSIONS.MANAGE_ACTIVITIES]}>
								<CreateEvent />
							</ProtectedRoute>
						}
					/>
					<Route path="/user/">
						<Route path="upcoming-events/" element={<UpcomingEvents />} />
						<Route path="settings/" element={<Settings />}>
							<Route index element={<Navigate to="/user/settings/edit-profile" />} />
							<Route path="edit-profile" element={<EditProfile />} />
							<Route path="groups" element={<Groups />} />
							<Route path="account-management" element={<AccountManagement />} />
							<Route path="activity-history" element={<ActivityHistory />} />
							<Route path="privacy" element={<Privacy />} />
							<Route path="social-media" element={<SocialMedia />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</Router>
	)
}
export default PicksideRoutes
