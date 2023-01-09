import { useMemo } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Grid, MenuItem, Typography } from '@mui/material'
import AppSettings from './Sections/AppSettings'
import History from './Sections/History'
import ProfileSettings from './Sections/ProfileSettings'

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
		<Grid container sx={{ height: (theme) => `calc(100vh - ${theme.mixins.toolbar.minHeight}px)` }} wrap="nowrap">
			<Grid
				item
				container
				direction="column"
				sx={{ width: 300, borderRight: (theme) => `2px solid ${theme.palette.primary.main}` }}
			>
				<Grid item>
					{MenuItems.map((menu, idx) => (
						<MenuItem divider component={NavLink} to={menu.ref} key={idx} sx={{ height: 50 }}>
							<Typography>{menu.description}</Typography>
						</MenuItem>
					))}
				</Grid>
			</Grid>
			<Grid item xs>
				<Outlet />
			</Grid>
		</Grid>
	)
}

export default UserPage
