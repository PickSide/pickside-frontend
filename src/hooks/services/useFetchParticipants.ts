import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

const useFetchParticipants = () => {
    const dispatch = useDispatch()
    const { axiosInstance } = useContext(AxiosContext)

    const fetchParticipants = async (activityId: any) => await axiosInstance.get(`/activities/${activityId}/participants`)

    const {
        data: activities,
        isLoading,
        refetch,
    } = useQuery(['fetch-participants'], (id) => fetchParticipants(id), {
        onSuccess: ({ data }) => console.log(data),
        onError: () => { },
        refetchOnWindowFocus: false,
    })

    return { activities, isLoading, refetch }
}

export default useFetchParticipants
