import { AxiosContext } from '@context'
import { handleResponseError } from '@utils'
import { setUser } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const useSignup = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const callback = async (data: any) => await axiosInstance.post(`/users/create`, { data })

	const {
		mutate: signup,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['createUser'],
		onSuccess: (data) => {
			dispatch(setUser(data?.data))
			navigate('/', { replace: true })
		},
		onError: (error: any) => handleResponseError(error),
	})

	return { signup, isLoading, error, isError }
}

export default useSignup
