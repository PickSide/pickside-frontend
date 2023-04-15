import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import { AccountCircle, Logout, Person, Settings } from '@mui/icons-material'
import { Popover } from 'components'
import { useAuth } from 'hooks'

const ProfileMenu: FC<any> = () => {
	const { logout } = useAuth()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

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
		<div>
			<IconButton id="locale-open-btn" onClick={handleOpen}>
				<AccountCircle />
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				{UserMenuItems.map(({ action, label, icon }, idx) => (
					<MenuItem
						key={idx}
						onClick={() => {
							action()
							handleClose()
						}}
					>
						<ListItemIcon>{icon}</ListItemIcon>
						<Typography>{label}</Typography>
					</MenuItem>
				))}
			</Menu>
		</div>
	)
}
export default ProfileMenu
