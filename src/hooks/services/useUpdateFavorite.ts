import { AxiosContext } from '@context'
import { updateMeFavorites } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'

const useUpdateFavorite = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()


	const callback = async (activityId) =>
		await axiosInstance.put(`/me/activities/${activityId}/favorites`)

	const {
		mutate: updateFavorite,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['update-favorite'],
		onSuccess: ({ data }, activityId) => dispatch(updateMeFavorites({ activityId, result: data.result })),
		onError: (e) => console.log(e),
	})

	return { updateFavorite, isLoading, error, isError }
}

export default useUpdateFavorite
