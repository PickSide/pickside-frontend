import { Dropdown, Icon, MenuItem, Spinner } from '@components'
import { FC, useContext, useEffect } from 'react'
import { useFetchNotifications, useReadNotification } from '@hooks'

import { RTAContentContext } from '@context'
import { RxDotFilled } from 'react-icons/rx'
import { useTranslation } from 'react-i18next'

const NotificationMenu: FC<any> = () => {
	const { notifications, isLoading, refetch: refetchNotifications } = useFetchNotifications()
	const { readNotification } = useReadNotification()
	const { socket } = useContext(RTAContentContext)
	const { t } = useTranslation()

	useEffect(() => {
		socket?.on('notifyGroupInvite', refetchNotifications)

		return () => {
			socket?.off('notifyGroupInvite', console.log)
		}
	}, [])

	return (
		<Dropdown
			variant="secondary"
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
