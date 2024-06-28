import { setNotifications } from '@state'
import { useDispatch } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'

const useReadNotification = () => {
	const dispatch = useDispatch()
	const { axiosNSInstance } = useContext(AxiosContext)

	const callback = async (notificationId: any) => await axiosNSInstance.put(`/seen/${notificationId}`)

	const {
		mutate: readNotification,
		data: notifications,
		isLoading,
	} = useMutation(callback, {
		mutationKey: ['seen-notification'],
		onSuccess: (_, params) => dispatch(setNotifications(params)),
		onError: () => {},
	})

	return { readNotification, notifications, isLoading }
}

export default useReadNotification
