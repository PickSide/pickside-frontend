import { AppState, Resources, User } from '@state'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

export interface Messages extends Resources {
	result?: Message[]
}

export interface Message {
	message: string
	chatRoomId: string
	sentBy: User
	delivered: boolean
	reactions: any[]
}

const useFetchMessages = () => {
	const { extsvcInstance } = useContext(AxiosContext)

	const me = useSelector((state: AppState) => state.user)

	const callback = async () => await extsvcInstance.get('/messages', { data: { userId: me?.id } })

	const {
		data: messages,
		isLoading,
		refetch,
	} = useQuery(['fetchMessages'], callback, {
		onError: () => { },
		refetchOnWindowFocus: false,
	})

	return { messages, isLoading, refetch }
}

export default useFetchMessages
