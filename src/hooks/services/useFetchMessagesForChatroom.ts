import { AppState, Chatroom, Resources, User } from '@state'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

interface Messages extends Resources {
	results?: Message[]
}

interface Message {
	message?: string
	chatroomId?: Chatroom
	sender?: User
	delivered?: boolean
	type?: 'incoming' | 'outgoing'
}

const useFetchMessagesForChatroom = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const chatroomContext = useSelector((state: AppState) => state.selectedChatroom)

	const callback = async () =>
		(await axiosInstance.get('/messages', { data: { chatroomId: chatroomContext?.id } })).data

	const { data: messages, isLoading } = useQuery<Messages>(['fetchMessageForChatroom'], callback, {
		enabled: !!chatroomContext?.id,
		onError: () => {},
		refetchOnWindowFocus: false,
	})

	return { messages, isLoading }
}

export default useFetchMessagesForChatroom
