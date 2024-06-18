import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchOnlineUsers = () => {
	const { extsvcInstance } = useContext(AxiosContext)

	const callback = async () => (await extsvcInstance.get('/users', { params: { status: 'online' } })).data

	const {
		data: onlineUsers,
		isLoading,
		refetch,
	} = useQuery(['fetch-online-users'], callback, {
		onError: () => {},
		refetchOnWindowFocus: false,
	})

	return { onlineUsers, isLoading, refetch }
}

export default useFetchOnlineUsers
