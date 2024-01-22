import { AppState, setNotifications } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'

const useReadNotification = () => {
	const dispatch = useDispatch()
	const { axiosInstance } = useContext(AxiosContext)

	const me = useSelector((state: AppState) => state.user)

	const callback = async (notificationId: any) =>
		await axiosInstance.put(`/notifications/${notificationId}/${me?.id}`)

	const {
		mutate: readNotification,
		data: notifications,
		isLoading,
	} = useMutation(callback, {
		mutationKey: ['readNotification'],
		onSuccess: ({ data }) => dispatch(setNotifications(data)),
		onError: () => { },
	})

	return { readNotification, notifications, isLoading }
}

export default useReadNotification
