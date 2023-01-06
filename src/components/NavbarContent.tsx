import React, { FC, useContext, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Box, Grid, IconButton, Link, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import { Login, Logout, Person, Settings } from '@mui/icons-material'

import { Authentication, Dialog, Popover, ThemeToggler } from 'components'
import { LanguageSwitcher } from 'widgets'
import { AppState } from 'state'
import { MenuItemElement } from 'types'
import { useTranslation } from 'react-i18next'

const NavbarContent: FC<any> = ({ ...props }) => {
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.connectedUser)

	const [openAuthenticationDialog, setOpenAuthenticationDialog] = useState<boolean>(false)

	const UserMenuItems = [
		{
			label: t('History'),
			icon: <Settings fontSize="small" />,
			href: '/history',
		},
		{
			label: t('Profile'),
			icon: <Person fontSize="small" />,
			href: '/profile',
		},
		{
			label: t('Settings'),
			icon: <Settings fontSize="small" />,
			href: '/app-settings',
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

			<Grid container justifyContent="flex-end" alignItems="center">
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
									<Avatar sx={{ backgroundColor: 'primary.main' }}>{`${connectedUser.firstName
										?.charAt(0)
										.toLocaleUpperCase()}`}</Avatar>
								</IconButton>
							}
						>
							{UserMenuItems.map((item, idx) => (
								<MenuItem key={idx}>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<Link href={item.href} underline="none" color="inherit">
										<Typography>{item.label}</Typography>
									</Link>
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
		</>
	)
}

export default NavbarContent
