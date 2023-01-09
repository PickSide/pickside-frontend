import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { Grid, IconButton, ListItemIcon, MenuItem, Typography } from '@mui/material'
import { AccountCircle, Home, Login, Logout, Person, Settings } from '@mui/icons-material'

import { Authentication, Dialog, Popover, ThemeToggler } from 'components'
import { LanguageSwitcher } from 'widgets'
import { AppState } from 'state'
import { useTranslation } from 'react-i18next'

const NavbarContent: FC<any> = ({ ...props }) => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const connectedUser = useSelector((state: AppState) => state.connectedUser)

	const [openAuthenticationDialog, setOpenAuthenticationDialog] = useState<boolean>(false)

	const UserMenuItems = [
		{
			label: t('History'),
			icon: <Settings fontSize="small" />,
			href: '/user/history',
		},
		{
			label: t('Profile'),
			icon: <Person fontSize="small" />,
			href: '/user/profile',
		},
		{
			label: t('Settings'),
			icon: <Settings fontSize="small" />,
			href: '/user/app-settings',
		},
		{
			label: t('Logout'),
			icon: <Logout fontSize="small" />,
			href: '/',
		},
	]

	return (
		<>
			<Dialog
				open={openAuthenticationDialog}
				onClose={() => setOpenAuthenticationDialog(false)}
				title={t('Authentication')}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				size="sm"
			>
				<Authentication />
			</Dialog>

			<Grid container justifyContent="space-around" alignItems="center" wrap="nowrap">
				<Grid item xs>
					<IconButton onClick={() => navigate('/')}>
						<Home />
					</IconButton>
				</Grid>
				<Grid item container justifyContent="flex-end" alignItems="center" columnSpacing={3} xs>
					<Grid item>
						<LanguageSwitcher />
					</Grid>
					<Grid item>
						<ThemeToggler />
					</Grid>
					<Grid item>
						{connectedUser ? (
							<Popover
								triggerElement={
									<IconButton>
										<AccountCircle />
									</IconButton>
								}
							>
								{UserMenuItems.map((item, idx) => (
									<MenuItem component={NavLink} to={item.href} key={idx}>
										<ListItemIcon>{item.icon}</ListItemIcon>
										<Typography>{item.label}</Typography>
									</MenuItem>
								))}
							</Popover>
						) : (
							<IconButton onClick={() => setOpenAuthenticationDialog(true)}>
								<Login />
							</IconButton>
						)}
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

export default NavbarContent
