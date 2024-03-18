import { AxiosContext } from '@context'
import { setGroups } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

const useFetchGroups = () => {
	const dispatch = useDispatch()
	const { axiosInstance } = useContext(AxiosContext)

	const fetchGroups = async () => await axiosInstance.get(`/groups`)

	const {
		data: groups,
		isLoading,
		refetch,
	} = useQuery(['fetch-groups'], fetchGroups, {
		onSuccess: ({ data }) => dispatch(setGroups(data)),
		onError: () => { },
		refetchOnWindowFocus: false,
	})

	return { groups, isLoading, refetch }
}

export default useFetchGroups
