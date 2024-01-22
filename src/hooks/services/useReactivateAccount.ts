import { AppState } from '@state'
import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const useReactivateAccount = () => {
	const { axiosInstance } = useContext(AxiosContext)

	const me = useSelector((state: AppState) => state.user)

	const callback = async (data: any) => await axiosInstance.put(`/users/reactivate/${me?.id}`)

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
