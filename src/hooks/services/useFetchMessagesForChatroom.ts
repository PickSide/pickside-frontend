import { Chatroom, Resources, User } from '@state'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

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

	const callback = async (chatroom) => (await axiosInstance.get(`/messages/${chatroom?.id}`)).data

	const {
		data: messages,
		isLoading,
		refetch,
	} = useQuery<Messages>(['fetch-messages'], callback, {
		onError: () => {},
		enabled: false,
		refetchOnWindowFocus: false,
	})

	return { messages, isLoading, refetch }
}

export default useFetchMessagesForChatroom
