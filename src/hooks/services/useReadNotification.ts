import { AppState, setNotifications } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'

const useReadNotification = (notificationId: string) => {
	const dispatch = useDispatch()
	const { axiosInstance } = useContext(AxiosContext)

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async () => await axiosInstance.put(`/notifications/${notificationId}/${connectedUser?.id}`)

	const { data: notifications, isLoading } = useMutation(callback, {
		mutationKey: ['readNotification'],
		onSuccess: ({ data }) => dispatch<any>(setNotifications(data)),
		onError: () => {},
	})

	return { notifications, isLoading }
}

export default useReadNotification
