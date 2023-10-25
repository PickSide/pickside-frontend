import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchGroup = (groupId) => {
	const { axiosInstance } = useContext(AxiosContext)

	const callback = async () => await axiosInstance.get(`/groups/${groupId}`)

	const { data: group, isLoading } = useQuery(['fetchGroup'], callback, {
		onError: () => {},
		refetchOnWindowFocus: false,
	})

	return { group, isLoading }
}

export default useFetchGroup
