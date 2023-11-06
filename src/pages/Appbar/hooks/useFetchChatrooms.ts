import { AppState, Resources, User } from '@state'

import { AxiosContext } from '@context'
import { Message } from './useFetchMessages'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

export interface Chatrooms extends Resources {
	results?: Chatroom[]
}

export interface Chatroom {
	title: string
	participants: User[]
	openedChatroom: User[]
	numberOfMessages: number
	lastMessage: Message
	startedBy: User
}

const useFetchChatrooms = () => {
	const { axiosInstance } = useContext(AxiosContext)

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async (): Promise<Chatrooms> => {
		const response = await axiosInstance.get(`/chatrooms/users/${connectedUser?.id}`)
		return response.data
	}

	const {
		data: chatrooms,
		isLoading,
		refetch,
	} = useQuery(['fetchChatrooms'], callback, {
		onError: () => {},
		refetchOnWindowFocus: false,
	})

	return { chatrooms, isLoading, refetch }
}

export default useFetchChatrooms
