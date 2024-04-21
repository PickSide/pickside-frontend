import { AppState, Group, Notification } from '@state'
import { Avatar, Button, Dropdown, Icon, MenuItem } from '@components'
import { useJoinGroup, useReadNotification } from '@hooks'

import { FC } from 'react'
import { RxDotFilled } from 'react-icons/rx'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const NotificationMenu: FC<any> = () => {
	const { readNotification } = useReadNotification()
	const { joinGroup } = useJoinGroup()
	const { t } = useTranslation()

	const notifications = useSelector((state: AppState) => state.notifications)

	const RenderNotification = ({ notification }: { notification: Notification }) =>
		<div className="relative flex items-center justify-between gap-x-2">
			{!notification.isRead && <RxDotFilled className="text-blue-400" size={20} />}
			<Avatar src={notification?.recipient?.avatar} />
			{notification?.content}
		</div>

	const PlainTextNotification = () => (
		<div></div>
	)
	const GroupInviteNotification = ({ groupId }) => (
		<div className='flex items-center'>
			<p>{t(`You have received an invitation to join group`)}</p>
			<Button className='text-error' variant='tertiary'>{t('Reject')}</Button>
			<Button className='bg-success text-white' onClick={() => joinGroup(groupId)}>{t('Accept')}</Button>
		</div>
	)
	const FriendRequestNotification = () => (
		<div></div>
	)
	const EventInviteRequestNotification = () => (
		<div></div>
	)
	const EventApproachingRequestNotification = () => (
		<div></div>
	)


	return (
		<Dropdown
			className='max-h-[400px]'
			icon={notifications?.results?.some((n) => !n.isRead) ? <Icon variant='filled' icon="notifications_active" className='animate-pulse' /> : <Icon icon="notifications" />}
		>
			{notifications?.results ? (
				notifications?.results?.map((notification, idx) => {
					const extra = notification.extra ? JSON.parse(notification.extra) : {}

					if (notification.type === 'group-invite' && extra.groupId) {
						return (
							<MenuItem key={idx} className='p-4' hoverable={false}>
								<GroupInviteNotification groupId={extra.groupId} />
							</MenuItem>
						)
					}
					return (
						<MenuItem key={idx} className='p-4' onClick={() => readNotification(notification.id)}>
							<RenderNotification notification={notification} />
						</MenuItem>
					)
				})) :
				<MenuItem disabled>
					<p>{t('No new notifications')}</p>
				</MenuItem>
			}
		</Dropdown>
	)
}
export default NotificationMenu
