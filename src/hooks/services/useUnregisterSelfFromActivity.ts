import { AppState, updateParticipants } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'

const useUnregisterSelfToActivity = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async (activityId: any) =>
		await axiosInstance.put(`/activities/${activityId}/unregister`, { data: { userId: connectedUser?.id } })

	const {
		mutate: unregisterFromActivity,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['unregisterFromActivity'],
		onSuccess: ({ data }, activityId) =>
			dispatch(updateParticipants({ activityId, participants: data.result.participants })),
		onError: (e) => console.log(e),
	})

	return { unregisterFromActivity, isLoading, error, isError }
}

export default useUnregisterSelfToActivity
