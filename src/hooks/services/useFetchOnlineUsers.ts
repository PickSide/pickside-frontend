import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchOnlineUsers = () => {
	const { axiosInstance } = useContext(AxiosContext)

	const callback = async () => (await axiosInstance.get('/users', { params: { status: 'online' } })).data

	const {
		data: onlineUsers,
		isLoading,
		refetch,
	} = useQuery(['fetchOnlineUsers'], callback, {
		onError: () => {},
		refetchOnWindowFocus: false,
	})

	return { onlineUsers, isLoading, refetch }
}

export default useFetchOnlineUsers
