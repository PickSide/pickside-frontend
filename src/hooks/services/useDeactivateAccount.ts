import { AppState, updateActivity } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'

const useDeactivateAccount = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async (data: any) => await axiosInstance.put(`/users/deactivate/${connectedUser?.id}`)

	const {
		mutate: deactivateUser,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['deactivateAccount'],
		onSuccess: (data) => console.log(data),
		onError: (e) => console.log(e),
	})

	return { deactivateUser, isLoading, error, isError }
}

export default useDeactivateAccount
