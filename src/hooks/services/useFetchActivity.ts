import { AxiosContext } from '@context'
import { setActivities } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

const useFetchActivity = (activityId) => {
	const dispatch = useDispatch()
	const { extsvcInstance } = useContext(AxiosContext)

	const callback = async () => await extsvcInstance.get(`/activities/${activityId}`)

	const { data: activities, isLoading } = useQuery(['fetch-activity'], callback, {
		onSuccess: ({ data }) => dispatch(setActivities(data)),
		onError: () => {},
		refetchOnWindowFocus: false,
	})

	return { activities, isLoading }
}

export default useFetchActivity
