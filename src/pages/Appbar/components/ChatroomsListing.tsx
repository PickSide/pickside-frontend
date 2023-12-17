import { AppState, User, openChatroom } from '@state'
import { FC, useContext, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchOnlineUsers, useFetchUsers } from '@hooks'

import Avatar from '@components/Avatar'
import { RTAContentContext } from '@context'
import { StatusBadge } from '@components'
import UsersAutocomplete from './UsersAutocomplete'
import useFetchChatroom from '../hooks/useFetchChatroom'

const ChatroomsListing: FC<any> = () => {
	const dispatch = useDispatch()
	const { onlineUsers, refetch: refetchOnlineUsers } = useFetchOnlineUsers()
	const { users } = useFetchUsers()
	const { socket } = useContext(RTAContentContext)
	const connectedUser = useSelector((state: AppState) => state.user)

	if (!connectedUser) {
		throw new Error('You need to be signed in to chat')
	}

	const { fetchChatroom, isLoading: isLoadingChatroom } = useFetchChatroom()

	const open = async (recipient: User) => {
		if (recipient.id) {
			const chatroom = await (await fetchChatroom(recipient)).data.payload
			dispatch(openChatroom(chatroom))
		}
	}

	useEffect(() => {
		socket?.on('user:isonline', refetchOnlineUsers)
		socket?.on('user:isoffline', refetchOnlineUsers)
		return () => {
			socket?.off('user:isonline', console.log)
			socket?.off('user:isoffline', console.log)
		}
	}, [])

	const onlineUsersBydId = useMemo(() => onlineUsers?.results?.map((user) => user.id), [onlineUsers])

	return (
		<div className="w-full">
			<UsersAutocomplete onSelectAction={open} />
			<ul className="flex flex-col mt-4">
				{users?.results
					?.filter((user) => user.id !== connectedUser?.id)
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
