import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchUsers = () => {
	const { axiosMSInstance } = useContext(AxiosContext)

	const fetchUsers = async () => (await axiosMSInstance.get('/users')).data

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
