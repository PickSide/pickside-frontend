import { Chatroom, Resources, User } from '@state'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

interface Messages extends Resources {
	result?: Message[]
}

interface Message {
	message?: string
	chatroomId?: Chatroom
	sender?: User
	delivered?: boolean
	type?: 'incoming' | 'outgoing'
}

const useFetchMessagesForChatroom = () => {
	const { axiosMSInstance } = useContext(AxiosContext)

	const callback = async (chatroom) => (await axiosMSInstance.get(`/messages/${chatroom?.id}`)).data

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
