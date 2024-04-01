import { AppState, Notification } from '@state'
import { Avatar, Dropdown, Icon, MenuItem, Spinner } from '@components'
import { useFetchNotifications, useReadNotification } from '@hooks'

import { FC } from 'react'
import { RxDotFilled } from 'react-icons/rx'
import { useSelector } from 'react-redux'

const NotificationMenu: FC<any> = () => {
	const { isLoading } = useFetchNotifications()
	const { readNotification } = useReadNotification()

	const notifications = useSelector((state: AppState) => state.notifications)

	const RenderNotification = ({ notification }: { notification: Notification }) =>
		<div className="relative flex items-center justify-between gap-x-2">
			{!notification.isRead && <RxDotFilled className="text-blue-400" size={20} />}
			<Avatar src={notification?.recipient?.avatar} />
			{notification?.content}
		</div>


	return (
		<Dropdown
			className='max-h-[400px]'
			icon={notifications?.results?.some((n) => !n.isRead) ? <Icon variant='filled' icon="notifications_active" className='animate-pulse' /> : <Icon icon="notifications" />}
		>
			{isLoading ? (
				<MenuItem>
					<Spinner />
				</MenuItem>
			) : (
				notifications?.results?.map((notification, idx) => (
					<MenuItem key={idx} className='p-4' onClick={() => readNotification(notification.id)}>
						<RenderNotification notification={notification} />
					</MenuItem>
				))
			)}
		</Dropdown>
	)
}
export default NotificationMenu
