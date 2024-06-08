import { AxiosContext } from '@context'
import { removeNotification } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useDeleteNotification = () => {
	const { axiosMSInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const callback = async (id: string) => await axiosMSInstance.delete(`/notifications/${id}`)

	const {
		mutate: deleteNotification,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['delete-notification'],
		onSuccess: (_, notificationId) => {
			dispatch(removeNotification(notificationId))
		},
		onError: (e) => console.log(e),
	})

	return { deleteNotification, isLoading, error, isError }
}

export default useDeleteNotification
