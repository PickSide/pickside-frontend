import { AxiosContext } from '@context'
import { setUser } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'

const useSignup = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()

	const callback = async (data: any) => await axiosInstance.post(`/users`, { data })

	const {
		mutate: signUp,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['createUser'],
		onSuccess: (data) => dispatch(setUser(data?.data)),
		onError: (e) => console.log(e),
	})

	return { signUp, isLoading, error, isError }
}

export default useSignup
