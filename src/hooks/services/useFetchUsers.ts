import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchUsers = () => {
	const { axiosInstance } = useContext(AxiosContext)

	const fetchUsers = async () => (await axiosInstance.get('/users')).data

	const {
		data: users,
		isLoading,
		refetch,
	} = useQuery(['fetch-users'], fetchUsers, {
		onError: () => { },
		refetchOnWindowFocus: false,
	})

	return { users, isLoading, refetch }
}

export default useFetchUsers
