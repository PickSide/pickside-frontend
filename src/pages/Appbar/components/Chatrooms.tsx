import { AppState, User, setActiveChatroom } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '@components/Avatar'
import { FC, } from 'react'
import UsersAutocomplete from './UsersAutocomplete'

interface ChatroomsListingProps {
	callbackOnClick?: () => any
}

const ChatroomsListing: FC<ChatroomsListingProps> = ({ callbackOnClick }) => {
	const dispatch = useDispatch()

	const chatrooms = useSelector((state: AppState) => state.chatrooms)
	const me = useSelector((state: AppState) => state.user)

	if (!me) {
		throw new Error('You need to be signed in to chat')
	}

	const open = async (recipient: User) => {
		if (recipient.id) {
			callbackOnClick && callbackOnClick()
		}
	}

	const ChatroomRender = ({ chatroom }) => (
		<li className="w-full">
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
						//badge={<StatusBadge variant={onlineUsersBydId?.includes(user.id) ? 'online' : 'offline'} />}
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
	)

	return (
		<div className="w-full">
			<UsersAutocomplete onSelectAction={open} />
			<ul className="flex flex-col mt-4">
				{chatrooms?.results?.map((chatroom, idx) => <ChatroomRender key={idx} chatroom={chatroom} />)}
			</ul>
		</div>
	)
}

export default ChatroomsListing
