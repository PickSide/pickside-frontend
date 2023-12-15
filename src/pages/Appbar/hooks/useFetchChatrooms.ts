import { AppState, Resources, User } from '@state'
import { useMutation, useQuery } from '@tanstack/react-query'

import { AxiosContext } from '@context'
import { Message } from './useFetchMessages'
import { useContext } from 'react'
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

const useFetchChatroom = () => {
	const { axiosInstance } = useContext(AxiosContext)

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async (recipient): Promise<Chatrooms> =>
		(await axiosInstance.get('/chatrooms/users', { data: { participants: [recipient?.id, connectedUser?.id] } })).data

	const {
		mutate: fetchChatroom,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['fetch-chatroom'],

		onError: (e) => console.log(e),
	})
	return { fetchChatroom, isLoading }
}

export default useFetchChatroom
