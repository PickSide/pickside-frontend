import { AppState, Chatroom, User, setSelectedChatroom } from '@state'
import { FC, useContext, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchOnlineUsers, useFetchUsers } from '@hooks'

import Avatar from '@components/Avatar'
import { RTAContentContext } from '@context'
import { StatusBadge } from '@components'
import UsersAutocomplete from './UsersAutocomplete'
import useFetchChatrooms from '../hooks/useFetchChatrooms'

const ChatroomsListing: FC<any> = () => {
	const dispatch = useDispatch()
	const { chatrooms } = useFetchChatrooms()
	const { onlineUsers, refetch: refetchOnlineUsers } = useFetchOnlineUsers()
	const { users } = useFetchUsers()
	const { socket } = useContext(RTAContentContext)
	const connectedUser = useSelector((state: AppState) => state.user)

	if (!connectedUser) {
		throw new Error('You need to be signed in to chat')
	}

	useEffect(() => {
		socket?.on('user:isonline', refetchOnlineUsers)
		socket?.on('user:isoffline', refetchOnlineUsers)
		return () => {
			socket?.off('user:isonline', console.log)
			socket?.off('user:isoffline', console.log)
		}
	}, [])

	const openChatroom = (user: User) => {
		const selectedChatroom = chatrooms?.results?.find(
			(chatroom) => chatroom.participants.length === 1 && chatroom.participants.find((p) => p.id === user.id),
		)
		if (selectedChatroom) {
			dispatch(setSelectedChatroom(selectedChatroom))
		} else {
			const newChatroom: Chatroom = {
				name: user.fullName,
				participants: [{ id: user?.id }, { id: connectedUser?.id }],
				startedBy: { id: connectedUser?.id },
				openedChatroom: [{ id: connectedUser?.id }],
			}
			dispatch(setSelectedChatroom(newChatroom))
		}
	}

	const onlineUsersBydId = useMemo(() => onlineUsers?.results?.map((user) => user.id), [onlineUsers])

	return (
		<div className="w-full">
			<UsersAutocomplete onSelectAction={openChatroom} />
			<ul className="flex flex-col mt-4">
				{users?.results
					?.filter((user) => user.id !== connectedUser?.id)
					.filter(
						(user) =>
							chatrooms?.results?.flatMap((chatroom) => chatroom.participants.map((p) => p.id).includes(user.id)),
					)
					.map((user, idx) => (
						<li key={idx} className="w-full">
							<button
								key={idx}
								className="inline-flex items-center w-full px-3 py-4 gap-x-4 rounded-2xl cursor-pointer hover:bg-slate-300"
								onClick={() => openChatroom(user)}
							>
								<Avatar
									size="sm"
									variant="secondary"
									src={user.avatar}
									badge={<StatusBadge variant={onlineUsersBydId.includes(user.id) ? 'online' : 'offline'} />}
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
