import { AppState, setNotifications } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchNotifications = () => {
	const dispatch = useDispatch()
	const { axiosInstance } = useContext(AxiosContext)

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async () => await axiosInstance.get(`/notifications/${connectedUser?.id}`)

	const { data: notifications, isLoading } = useQuery(['fetchNotifications'], callback, {
		onSuccess: ({ data }) => dispatch(setNotifications(data)),
		onError: () => {},
	})

	return { notifications, isLoading }
}

export default useFetchNotifications
