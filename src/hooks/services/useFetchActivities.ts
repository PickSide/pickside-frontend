import { AxiosContext } from '@context'
import { setActivities } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

const useFetchActivities = () => {
	const dispatch = useDispatch()
	const { axiosInstance } = useContext(AxiosContext)

	const fetchActivities = async () => await axiosInstance.get('/activities')

	const { data: activities, isLoading } = useQuery(['fetchActivities'], fetchActivities, {
		onSuccess: ({ data }) => dispatch(setActivities(data)),
		onError: () => {},
	})

	return { activities, isLoading }
}

export default useFetchActivities
