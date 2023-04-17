import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { IconButton, Menu, MenuItem } from '@mui/material'
import { Notifications } from '@mui/icons-material'
import { useAuth } from 'hooks'
import { AppState } from 'state'

const NotificationMenu: FC<any> = () => {
	const { logout } = useAuth()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const notifications = useSelector((state: AppState) => state.notifications)

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div>
			<IconButton id="notifications-open-btn" onClick={handleOpen}>
				<Notifications />
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
				{notifications?.results?.map((notifiction, idx) => (
					<MenuItem
						key={idx}
						onClick={() => {
							//todo
						}}
					>
						{/* <ListItemIcon>{icon}</ListItemIcon>
						<Typography>{label}</Typography> */}
					</MenuItem>
				))}
			</Menu>
		</div>
	)
}
export default NotificationMenu
