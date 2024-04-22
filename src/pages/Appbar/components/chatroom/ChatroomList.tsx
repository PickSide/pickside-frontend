import { AppState, User, setActiveChatroom } from '@state'
import { FC, useContext, } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '@components/Avatar'
import { MessageServiceContext } from '@context'
import UsersAutocomplete from '../UsersAutocomplete'
import { useTranslation } from 'react-i18next'

interface ChatroomsListingProps {
	callbackOnClick?: () => any
}

const ChatroomList: FC<ChatroomsListingProps> = ({ callbackOnClick }) => {
	const dispatch = useDispatch()
	const { connection } = useContext(MessageServiceContext)
	const { t } = useTranslation()

	const chatrooms = useSelector((state: AppState) => state.chatrooms)
	const me = useSelector((state: AppState) => state.user)

	if (!me) {
		throw new Error('You need to be signed in to chat')
	}

	const open = async (recipient: User) => {
		if (recipient.id && me.id) {
			if (connection?.readyState === WebSocket.OPEN) {
				connection.send(JSON.stringify({
					"eventType": "chatroom:open",
					"content": {
						"participantIds": [recipient.id, me.id]
					}
				}))
			}
			callbackOnClick && callbackOnClick()
		}
	}

	return (
		<div className="w-full h-full">
			<UsersAutocomplete onSelectAction={open} />
			{chatrooms?.length ?
				<ul className="flex flex-col mt-4">
					{chatrooms?.map((chatroom, idx) =>
						<li key={idx} className="w-full">
							<button
								className="inline-flex items-center w-full px-3 py-4 gap-x-4 rounded-2xl cursor-pointer hover:bg-slate-300"
								onClick={() => dispatch(setActiveChatroom(chatroom))}
							>
								<div className='relative flex'>
									{chatroom.participants?.filter(x => x.id !== me.id).map((user, idx) =>
										<Avatar
											key={idx}
											size="sm"
											variant="secondary"
											src={user.avatar}
										/>
									)}
								</div>
								<div className='relative flex'>
									{chatroom.participants?.filter(x => x.id !== me.id).map((user, idx) =>
										<span key={idx}>{user.displayName}</span>
									)}
								</div>

							</button>
						</li>
					)}
				</ul>
				:
				<div className='h-full flex items-center justify-center'>
					<span className='text-cool-gray-3'>{t('No messages')}</span>
				</div>
			}
		</div>
	)
}

export default ChatroomList
