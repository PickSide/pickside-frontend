import { fetchActivities as fetchEvents } from '@api'
import { setActivities } from '@state'
import { useDispatch } from 'react-redux'
import { useMutation } from 'react-query'

const useFetchActivities = () => {
	const dispatch = useDispatch()
	const { mutate: fetchActivities, isLoading } = useMutation(fetchEvents, {
		onSuccess: ({ data }) => dispatch<any>(setActivities(data)),
		onError: () => {},
	})

	return { fetchActivities, isLoading }
}

export default useFetchActivities
