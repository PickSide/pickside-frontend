import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchUsers = () => {
	const { extsvcInstance } = useContext(AxiosContext)

	const fetchUsers = async () => (await extsvcInstance.get('/users')).data

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
