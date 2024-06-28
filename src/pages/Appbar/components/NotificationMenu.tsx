import { AppState } from '@state'
import { Avatar, Button, Dropdown, Icon, MenuItem } from '@components'
import { useReadNotification, useUpdateGroupInvitationRequest } from '@hooks'

import { FC } from 'react'
import { RxDotFilled } from 'react-icons/rx'
import useDeleteNotification from '@hooks/services/useDeleteNotification'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const NotificationMenu: FC<any> = () => {
	const { readNotification } = useReadNotification()
	const { deleteNotification } = useDeleteNotification()
	const { updateGroupInvitiationRequest } = useUpdateGroupInvitationRequest()
	const { t } = useTranslation()

	const notifications = useSelector((state: AppState) => state.notifications)

	const PlainTextNotification = ({ id, avatar, content, isRead }) => (
		<div className="relative flex items-center justify-between gap-x-2">
			{!isRead && <RxDotFilled className="text-blue-400" size={20} />}
			<Avatar src={avatar} />
			{content}
		</div>
	)

	const GroupInviteNotification = ({ id, groupId, isRead }) => (
		<div className="flex items-center">
			{!isRead && <RxDotFilled className="text-blue-400" size={20} />}
			<p>{t(`You have received an invitation to join group`)}</p>
			<Button
				className="text-error"
				variant="tertiary"
				onClick={() => {
					updateGroupInvitiationRequest({ groupId, status: 'declined' })
					deleteNotification(id)
				}}
			>
				{t('Reject')}
			</Button>
			<Button
				className="bg-success text-white"
				onClick={() => {
					updateGroupInvitiationRequest({ groupId, status: 'accepted' })
					deleteNotification(id)
				}}
			>
				{t('Accept')}
			</Button>
		</div>
	)
	// const FriendRequestNotification = ({ isRead, userId }) => (
	// 	<div className="flex items-center">
	// 		{!isRead && <RxDotFilled className="text-blue-400" size={20} />}
	// 		<p>{t(`You have received an invitation to join group`)}</p>
	// 		<Button className="text-error" variant="tertiary">
	// 			{t('Reject')}
	// 		</Button>
	// 		<Button className="bg-success text-white" onClick={() => acceptFriendRequest(userId)}>
	// 			{t('Accept')}
	// 		</Button>
	// 	</div>
	// )
	// const EventInviteRequestNotification = () => <div></div>
	// const EventApproachingRequestNotification = () => <div></div>

	return (
		<Dropdown
			className="max-h-[400px]"
			icon={
				notifications?.result?.some((n) => !n.isRead) ? (
					<Icon variant="filled" icon="notifications_active" className="animate-pulse" />
				) : (
					<Icon icon="notifications" />
				)
			}
		>
			{notifications?.result ? (
				notifications?.result?.map((notification, idx) => {
					// need to handle badly parsed json here
					const extra = notification.extra ? JSON.parse(notification.extra) : {}

					if (notification.type === 'group-invite') {
						return (
							<MenuItem key={idx} className="p-4" hoverable={false} onClick={() => readNotification(notification.id)}>
								<GroupInviteNotification id={notification.id} groupId={extra.groupId} isRead={notification.isRead} />
							</MenuItem>
						)
					}
					// return null
					return (
						<MenuItem key={idx} className="p-4" onClick={() => readNotification(notification.id)}>
							<PlainTextNotification
								id={notification.id}
								avatar={notification.recipient?.avatar}
								content={notification.content}
								isRead={notification.isRead}
							/>
						</MenuItem>
					)
				})
			) : (
				<MenuItem disabled>
					<p>{t('No new notifications')}</p>
				</MenuItem>
			)}
		</Dropdown>
	)
}
export default NotificationMenu
