import { AxiosContext } from '@context'
import { handleResponseError } from '@utils'
import { setUser } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const useLogin = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const callback = (data: any) => axiosInstance.post('/login', { data })

	const {
		mutate: login,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		onSuccess: ({ data }) => {
			dispatch<any>(setUser(data))
			navigate('/home')
		},
		onError: (error: any) => handleResponseError(error),
	})
	return { login, isLoading, error, isError }
}

export default useLogin
