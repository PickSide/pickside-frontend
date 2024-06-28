import { AxiosContext } from '@context'
import { removeNotification } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'

const useDeleteNotification = () => {
	const { extsvcInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()

	const callback = async (id: string) => await extsvcInstance.delete(`/notifications/${id}`)

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
