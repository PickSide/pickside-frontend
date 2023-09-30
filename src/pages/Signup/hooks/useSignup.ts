import { AxiosContext } from '@context'
import { handleResponseError } from '@utils'
import { setUser } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'

const useSignup = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()

	const callback = async (data: any) => await axiosInstance.post(`/users`, { data })

	const {
		mutate: signup,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['createUser'],
		onSuccess: (data) => dispatch(setUser(data?.data)),
		onError: (error: any) => handleResponseError(error),
	})

	return { signup, isLoading, error, isError }
}

export default useSignup
