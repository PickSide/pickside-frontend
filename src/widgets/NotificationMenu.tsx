import { IconDropdown, MenuItem } from 'components'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from 'state'
import { FC } from 'react'
import { MdOutlineNotifications } from 'react-icons/md'
import { RxDotFilled } from 'react-icons/rx'
import { useApi } from 'hooks'

const NotificationMenu: FC<any> = () => {
	const { markNotificationAsRead } = useApi()
	const dispatch = useDispatch()
	const notifications = useSelector((state: AppState) => state.notifications)

	return (
		<div>
			<IconDropdown
				icon={<MdOutlineNotifications size={20} />}
				badge={notifications?.results?.some((n) => !n.isRead) && <RxDotFilled className="text-blue-400" size={20} />}
			>
				{notifications?.results?.map((notification, idx) => (
					<MenuItem key={idx} onClick={() => dispatch<any>(markNotificationAsRead(notification.id))}>
						<div className="relative flex justify-between">
							{!notification.isRead && <RxDotFilled className="text-blue-400" size={20} />}
							{notification.message}
						</div>
					</MenuItem>
				))}
			</IconDropdown>
		</div>
	)
}
export default NotificationMenu
