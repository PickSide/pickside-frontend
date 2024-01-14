import { AppState, setGroups } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchGroups = () => {
	const dispatch = useDispatch()
	const { axiosInstance } = useContext(AxiosContext)

	const connectedUser = useSelector((state: AppState) => state.user)

	const fetchGroups = async () => await axiosInstance.get(`/groups/user/${connectedUser?.id}`)

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
