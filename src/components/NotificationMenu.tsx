import { Dropdown, Icon, MenuItem, Spinner } from '@components'
import { useFetchNotifications, useReadNotification } from '@hooks'

import { FC } from 'react'
import { RxDotFilled } from 'react-icons/rx'
import { useTranslation } from 'react-i18next'

const NotificationMenu: FC<any> = () => {
	const { readNotification } = useReadNotification()

	const { t } = useTranslation()

	const { notifications, isLoading } = useFetchNotifications()

	return (
		<Dropdown
			variant="secondary"
			text={t('Notifications')}
			icon={<Icon icon="notifications" />}
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
