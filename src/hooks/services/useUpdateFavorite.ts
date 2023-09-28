import { AppState, updateUserFavorites } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'

const useUpdateFavorite = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async (activityId) =>
		await axiosInstance.put(`/activities/${activityId}/favorites`, { data: { userId: connectedUser?.id } })

	const {
		mutate: updateFavorite,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['updateFavorite'],
		onSuccess: ({ data }, activityId) => dispatch(updateUserFavorites({ activityId, result: data.result })),
		onError: (e) => console.log(e),
	})

	return { updateFavorite, isLoading, error, isError }
}

export default useUpdateFavorite
