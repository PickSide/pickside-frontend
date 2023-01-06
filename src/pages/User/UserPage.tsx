import { FC, lazy, useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Drawer, Grid, Link, MenuItem, Typography } from '@mui/material'
import AppSettings from './Sections/AppSettings'
import History from './Sections/History'
import ProfileSettings from './Sections/ProfileSettings'

const UserPage = () => {
	const MenuItems = useMemo(
		() => [
			{
				description: 'App Settings',
				ref: 'app-settings',
				content: <AppSettings />,
			},
			{
				description: 'History',
				ref: 'history',
				content: <History />,
			},
			{
				description: 'Profile',
				ref: 'profile',
				content: <ProfileSettings />,
			},
		],
		[],
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
						<MenuItem component={NavLink} to={menu.ref} key={idx} sx={{ height: 50 }}>
							<Typography>{menu.description}</Typography>
						</MenuItem>
					))}
				</Grid>
			</Grid>
			<Grid item container>
				<Outlet />
			</Grid>
		</Grid>
	)
}

export default UserPage
