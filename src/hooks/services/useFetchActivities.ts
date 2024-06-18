import { AxiosContext } from '@context'
import { setActivities } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

const useFetchActivities = () => {
	const dispatch = useDispatch()
	const { extsvcInstance } = useContext(AxiosContext)

	const fetchActivities = async () => await extsvcInstance.get('/activities')

	const {
		data: activities,
		isLoading,
		refetch,
	} = useQuery(['fetch-activities'], fetchActivities, {
		onSuccess: ({ data }) => dispatch(setActivities(data)),
		onError: () => { },
		refetchOnWindowFocus: false,
	})

	return { activities, isLoading, refetch }
}

export default useFetchActivities
