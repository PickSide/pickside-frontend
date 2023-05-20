import { useMemo } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppSettings from './Sections/AppSettings'
import History from './Sections/History'
import ProfileSettings from './Sections/ProfileSettings'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils'

const UserPage = () => {
	const { t } = useTranslation()

	const MenuItems = useMemo(
		() => [
			{
				description: t('Profile'),
				ref: 'profile',
				value: 'profile',
				content: <ProfileSettings />,
			},
			{
				description: t('App settings'),
				ref: 'app-settings',
				value: 'appsettings',
				content: <AppSettings />,
			},
			{
				description: t('History'),
				ref: 'history',
				value: 'history',
				content: <History />,
			},
		],
		[t],
	)

	return (
		<div>
			{MenuItems.map((menu, idx) => (
				<NavLink className="h-[50px]" to={menu.ref} key={idx}>
					<span>{menu.description}</span>
				</NavLink>
			))}
			<div>
				<Outlet />
			</div>
		</div>
	)
}

export default UserPage
