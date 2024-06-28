import { AppState, Notifications, setNotifications } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchNotifications = () => {
	const dispatch = useDispatch()
	const { extsvcInstance } = useContext(AxiosContext)

	const me = useSelector((state: AppState) => state.user)

	const callback = async () => await extsvcInstance.get<Notifications>(`/notifications?userKey=${me?.id}`)

	const {
		data: notifications,
		isLoading,
		refetch,
	} = useQuery(['fetch-notifications'], callback, {
		enabled: false,
		onSuccess: ({ data }) => dispatch(setNotifications(data)),
		onError: () => {},
		refetchOnWindowFocus: false,
	})

	return { notifications, isLoading, refetch }
}

export default useFetchNotifications
