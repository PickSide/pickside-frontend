import { AppState } from '@state'
import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const useFetchMessages = () => {
	const { axiosInstance } = useContext(AxiosContext)

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async () => await axiosInstance.get('/messages', { data: { userId: connectedUser?.id } })

	const {
		data: messages,
		isLoading,
		refetch,
	} = useQuery(['fetchMessages'], callback, {
		onError: () => {},
		refetchOnWindowFocus: false,
	})

	return { messages, isLoading, refetch }
}

export default useFetchMessages
