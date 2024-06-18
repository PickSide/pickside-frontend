import { AppState, setGroups } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchGroupByOrganizerId = () => {
    const { extsvcInstance } = useContext(AxiosContext)
    const dispatch = useDispatch()

    const me = useSelector((state: AppState) => state.user)

    const callback = async () => await extsvcInstance.get(`/groups/users/${me?.id}`)

    const { data: group, isLoading, refetch } = useQuery(['fetch-group-by-organizer'], callback, {
        onSuccess: ({ data }) => dispatch(setGroups(data)),
        onError: () => { },
        refetchOnWindowFocus: false,
    })

    return { group, isLoading, refetch }
}

export default useFetchGroupByOrganizerId
