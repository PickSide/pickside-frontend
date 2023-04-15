import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { IconButton, ListItemIcon, MenuItem, Typography } from '@mui/material'
import { AccountCircle, Logout, Person, Settings } from '@mui/icons-material'
import { Popover } from 'components'
import { useAuth } from 'hooks'

const ProfileMenu: FC<any> = () => {
	const { logout } = useAuth()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

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
	)
}
export default ProfileMenu
