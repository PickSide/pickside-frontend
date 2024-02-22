import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchGroupByOrganizerId = () => {
    const { axiosInstance } = useContext(AxiosContext)

    const callback = async (organizerId: any) => await axiosInstance.get(`/groups/${organizerId}`)

    const { data: group, isLoading } = useQuery(['fetch-group-by-organizer'], (organizerId) => callback(organizerId), {
        onError: () => { },
        refetchOnWindowFocus: false,
    })

    return { group, isLoading }
}

export default useFetchGroupByOrganizerId
