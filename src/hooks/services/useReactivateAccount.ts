import { AppState, updateActivity } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'

const useReactivateAccount = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async (data: any) => await axiosInstance.put(`/users/reactivate/${connectedUser?.id}`)

	const {
		mutate: reactivateUser,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
        mutationKey: ['reactivateAccount'],
		onSuccess: (data) => console.log(data),
		onError: (e) => console.log(e),
	})

	return { reactivateUser, isLoading, error, isError }
}

export default useReactivateAccount
