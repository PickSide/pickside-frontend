import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Grid, IconButton, ListItemIcon, MenuItem, Typography } from '@mui/material'
import { AccountCircle, Home, Login, Logout, Person, Settings } from '@mui/icons-material'

import { Dialog, Popover } from 'components'
import { Authentication, LanguageSwitcher, ThemeToggler } from 'widgets'
import { AppState } from 'state'
import { useAuth } from 'hooks'
import { useTranslation } from 'react-i18next'

const AppBar: FC<any> = ({ ...props }) => {
	const { logout } = useAuth()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.account)

	const [openAuthenticationDialog, setOpenAuthenticationDialog] = useState<boolean>(false)

	const UserMenuItems = [
		{
			label: t('History'),
			icon: <Settings fontSize="small" />,
			action: () => navigate('/user/history'),
		},
		{
			label: t('Profile'),
			icon: <Person fontSize="small" />,
			action: () => navigate('/user/profile'),
		},
		{
			label: t('Settings'),
			icon: <Settings fontSize="small" />,
			action: () => navigate('/user/app-settings'),
		},
		{
			label: t('Logout'),
			icon: <Logout fontSize="small" />,
			action: async () => {
				await dispatch<any>(logout())
				navigate('/')
			},
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
									<MenuItem key={idx} onClick={item.action}>
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

export default AppBar
