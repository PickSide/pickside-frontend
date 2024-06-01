import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchGroup = () => {
	const { axiosMSInstance } = useContext(AxiosContext)

	const callback = async (groupId: any) => await axiosMSInstance.get(`/groups/${groupId}`)

	const { data: group, isLoading } = useQuery(['fetch-group'], (groupId) => callback(groupId), {
		onError: () => { },
		refetchOnWindowFocus: false,
	})

	return { group, isLoading }
}

export default useFetchGroup
