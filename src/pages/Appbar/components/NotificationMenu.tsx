import { AppState, Notification } from '@state'
import { Avatar, Button, Dropdown, Icon, MenuItem, Spinner } from '@components'
import { FC, useContext } from 'react'
import { useFetchNotifications, useJoinGroup, useReadNotification } from '@hooks'

import { RTAContentContext } from '@context'
import { RxDotFilled } from 'react-icons/rx'
import { useEffectOnce } from 'usehooks-ts'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const NotificationMenu: FC<any> = () => {
	const { groupsSocket } = useContext(RTAContentContext)
	const { isLoading, refetch: refetchNotifications } = useFetchNotifications()
	const { joinGroup, isLoading: isJoiningGroup } = useJoinGroup()
	const { readNotification } = useReadNotification()
	const { t } = useTranslation()

	const notifications = useSelector((state: AppState) => state.notifications)

	// useEffectOnce(() => {
	// 	groupsSocket?.on('group:created', (payload) => console.log(payload))

	// 	return () => {
	// 		groupsSocket?.off('group:created', console.log)
	// 	}
	// })

	const RenderNotification = ({ notification }: { notification: Notification }) => {
		if (notification.type === 'group-invite') {
			return (
				<>
					<div className="relative flex items-center justify-between gap-x-2">
						{!notification.isRead && <RxDotFilled className="text-blue-400" size={20} />}
						<Avatar src={notification.sender.avatar} />
						{notification.message}
					</div>
					<div className="relative flex justify-end gap-x-2 z-20">
						<Button variant='secondary' size='sm'>{t('Decline')}</Button>
						<Button size='sm'>{t('Accept')}</Button>
					</div>
				</>
			)
		}
	}

	return (
		<Dropdown
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
