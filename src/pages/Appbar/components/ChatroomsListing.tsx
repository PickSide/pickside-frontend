import { AppState, User, openChatroom } from '@state'
import { FC, useContext, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchOnlineUsers, useFetchUsers } from '@hooks'

import Avatar from '@components/Avatar'
import { SocketContext } from '@context'
import { StatusBadge } from '@components'
import UsersAutocomplete from './UsersAutocomplete'
import { useEffectOnce } from 'usehooks-ts'
import useFetchChatroom from '../hooks/useFetchChatroom'

interface ChatroomsListingProps {
	callbackOnClick?: () => any
}

const ChatroomsListing: FC<ChatroomsListingProps> = ({ callbackOnClick }) => {
	const dispatch = useDispatch()
	const { onlineUsers, refetch: refetchOnlineUsers } = useFetchOnlineUsers()
	const { users } = useFetchUsers()
	const { usersSocket } = useContext(SocketContext)
	const me = useSelector((state: AppState) => state.user)

	if (!me) {
		throw new Error('You need to be signed in to chat')
	}

	const { fetchChatroom } = useFetchChatroom()

	const open = async (recipient: User) => {
		if (recipient.id) {
			const chatroom = await (await fetchChatroom(recipient)).data.payload
			dispatch(openChatroom(chatroom))
			callbackOnClick && callbackOnClick()
		}
	}

	useEffectOnce(() => {
		usersSocket?.on('user:isonline', refetchOnlineUsers)
		usersSocket?.on('user:isoffline', refetchOnlineUsers)
		return () => {
			usersSocket?.off('user:isonline', console.log)
			usersSocket?.off('user:isoffline', console.log)
		}
	})

	const onlineUsersBydId = useMemo(() => onlineUsers?.results?.map((user) => user.id), [onlineUsers])

	return (
		<div className="w-full">
			<UsersAutocomplete onSelectAction={open} />
			<ul className="flex flex-col mt-4">
				{users?.results
					?.filter((user) => user.id !== me?.id)
					.map((user, idx) => (
						<li key={idx} className="w-full">
							<button
								key={idx}
								className="inline-flex items-center w-full px-3 py-4 gap-x-4 rounded-2xl cursor-pointer hover:bg-slate-300"
								onClick={() => open(user)}
							>
								<Avatar
									size="sm"
									variant="secondary"
									src={user.avatar}
									badge={<StatusBadge variant={onlineUsersBydId?.includes(user.id) ? 'online' : 'offline'} />}
								/>

								{user.fullName}
							</button>
						</li>
					))}
			</ul>
		</div>
	)
}

export default ChatroomsListing
