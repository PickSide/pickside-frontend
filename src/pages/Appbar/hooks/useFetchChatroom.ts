import { AppState, User } from '@state'

import { AxiosContext } from '@context'
import { AxiosResponse } from 'axios'
import { Message } from './useFetchMessages'
import { PayloadResponseProps } from '@utils/responseTypes'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

export interface Chatroom {
	id?: string
	name?: string
	participants?: User[]
	numberOfMessages?: number
	lastMessage?: Message
}

const useFetchChatroom = () => {
	const { extsvcInstance } = useContext(AxiosContext)

	const me = useSelector((state: AppState) => state.user)

	const callback = async (recipient: User): Promise<AxiosResponse<PayloadResponseProps<Chatroom>>> =>
		await extsvcInstance.post('/chatrooms/users', {
			data: { participants: [me?.id, recipient.id] },
		})

	const {
		data,
		mutateAsync: fetchChatroom,
		isLoading,
	} = useMutation(callback, {
		mutationKey: ['fetch-chatroom'],
		onError: (e) => console.log(e),
	})
	return { data, fetchChatroom, isLoading }
}

export default useFetchChatroom
