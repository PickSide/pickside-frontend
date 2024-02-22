import { AppState, updateParticipants } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'

const useRegisterToActivity = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()

	const me = useSelector((state: AppState) => state.user)

	const callback = async (activityId: any) =>
		await axiosInstance.put(`/activities/registration`, { activityId: activityId, userId: me?.id })

	const {
		mutate: registerToActivity,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['activity-registration'],
		onSuccess: ({ data }, activityId) =>
			dispatch(updateParticipants({
				activityId, participants: data.result
			})),
		onError: (e) => console.log(e),
	})

	return { registerToActivity, isLoading, error, isError }
}

export default useRegisterToActivity
