import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchGroup = () => {
	const { extsvcInstance } = useContext(AxiosContext)

	const callback = async (groupId: any) => await extsvcInstance.get(`/groups/${groupId}`)

	const { data: group, isLoading } = useQuery(['fetch-group'], (groupId) => callback(groupId), {
		onError: () => { },
		refetchOnWindowFocus: false,
	})

	return { group, isLoading }
}

export default useFetchGroup
