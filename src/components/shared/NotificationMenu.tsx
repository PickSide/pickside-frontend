import { Dropdown, MenuItem, Spinner } from '@components'
import { useFetchNotifications, useReadNotification } from '@hooks'

import { FC } from 'react'
import { MdOutlineNotifications } from 'react-icons/md'
import { RxDotFilled } from 'react-icons/rx'
import { useTranslation } from 'react-i18next'

const NotificationMenu: FC<any> = () => {
	const { readNotification } = useReadNotification()

	const { t } = useTranslation()

	const { notifications, isLoading } = useFetchNotifications()
	console.log(notifications)
	return (
		<Dropdown
			variant="secondary"
			text={t('Notifications')}
			start={<MdOutlineNotifications size={20} />}
			badge={
				notifications?.data?.results?.some((n) => !n.isRead) && <RxDotFilled className="text-blue-400" size={20} />
			}
		>
			{isLoading ? (
				<MenuItem>
					<Spinner />
				</MenuItem>
			) : (
				notifications?.data?.results?.map((notification, idx) => (
					<MenuItem key={idx} onClick={() => readNotification(notification.id)}>
						<div className="relative flex justify-between">
							{!notification.isRead && <RxDotFilled className="text-blue-400" size={20} />}
							{notification.message}
						</div>
					</MenuItem>
				))
			)}
		</Dropdown>
	)
}
export default NotificationMenu
