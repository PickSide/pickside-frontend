import { AppState, setGroups } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchGroups = () => {
	const dispatch = useDispatch()
	const { axiosMSInstance } = useContext(AxiosContext)

	const me = useSelector((state: AppState) => state.user)

	const fetchGroups = async () => await axiosMSInstance.get(`/groups/users/${me?.id}`)

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
