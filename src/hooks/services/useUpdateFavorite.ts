import { AppState, updateActivity } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'

const useUpdateFavorite = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async (activityId: any) =>
		await axiosInstance.put(`/activities/${activityId}/favorites`, { userId: connectedUser?.id })

	const {
		mutate: updateFavorite,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['updateFavorite'],
		onSuccess: (data) => dispatch<any>(updateActivity(data?.data)), // change the data parameter here
		onError: (e) => console.log(e),
	})

	return { updateFavorite, isLoading, error, isError }
}

export default useUpdateFavorite
