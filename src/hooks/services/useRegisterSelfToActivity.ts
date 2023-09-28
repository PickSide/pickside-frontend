import { AppState, updateActivity } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'

const useRegisterSelfToActivity = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async (activityId: any) =>
		await axiosInstance.put(`/activities/register/${activityId}`, { userId: connectedUser?.id })

	const {
		mutate: unregisterFromActivity,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['registerToActivity'],
		onSuccess: ({ data }) => {
			dispatch(updateActivity(data))
		},
		onError: (e) => console.log(e),
	})

	return { unregisterFromActivity, isLoading, error, isError }
}

export default useRegisterSelfToActivity
