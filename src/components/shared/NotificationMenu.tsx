import { Dropdown, IconDropdown, MenuItem } from '@components'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '@state'
import { FC } from 'react'
import { MdOutlineNotifications } from 'react-icons/md'
import { RxDotFilled } from 'react-icons/rx'
import { useApi } from '@hooks'
import { useTranslation } from 'react-i18next'

const NotificationMenu: FC<any> = () => {
	const { markNotificationAsRead } = useApi()
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const notifications = useSelector((state: AppState) => state.notifications)

	return (
		<div>
			<Dropdown
				variant="secondary"
				text={t('Notifications')}
				start={<MdOutlineNotifications size={20} />}
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
			</Dropdown>
		</div>
	)
}
export default NotificationMenu
