import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchParticipants = () => {
	const { axiosMSInstance } = useContext(AxiosContext)

	const fetchParticipants = async (activityId: any) =>
		await axiosMSInstance.get(`/activities/${activityId}/participants`)

	const {
		data: activities,
		isLoading,
		refetch,
	} = useQuery(['fetch-participants'], (id) => fetchParticipants(id), {
		onSuccess: ({ data }) => console.log(data),
		onError: () => {},
		refetchOnWindowFocus: false,
	})

	return { activities, isLoading, refetch }
}

export default useFetchParticipants
