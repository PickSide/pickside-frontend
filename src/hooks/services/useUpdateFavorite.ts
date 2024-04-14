import { AxiosContext } from '@context'
import { AppState, updateMeFavorites } from '@state'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'

const useUpdateFavorite = () => {
	const { axiosMSInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()

	const me = useSelector((state: AppState) => state.user)

	const callback = async (activityId) => await axiosMSInstance.put(`/user/${me?.id}/activities/${activityId}/favorites`)

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
