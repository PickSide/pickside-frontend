import { Dropdown, Icon, MenuItem, Spinner } from '@components'
import { FC, useContext } from 'react'
import { useFetchNotifications, useReadNotification } from '@hooks'

import { RTAContentContext } from '@context'
import { RxDotFilled } from 'react-icons/rx'
import { useEffectOnce } from 'usehooks-ts'

const NotificationMenu: FC<any> = () => {
	const { notifications, isLoading, refetch: refetchNotifications } = useFetchNotifications()
	const { readNotification } = useReadNotification()
	const { groupsSocket } = useContext(RTAContentContext)

	useEffectOnce(() => {
		groupsSocket?.on('group:notify', refetchNotifications)

		return () => {
			groupsSocket?.off('group:notify', console.log)
		}
	})

	return (
		<Dropdown
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
