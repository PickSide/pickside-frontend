import { handleResponseError } from '@utils'
import { loginUser } from '@api'
import { setUser } from '@state'
import { useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

const useLogin = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		mutate: login,
		isLoading,
		error,
		isError,
	} = useMutation(loginUser, {
		onSuccess: ({ data }) => {
			dispatch<any>(setUser(data))
			navigate('/home')
		},
		onError: (error: any) => handleResponseError(error),
	})
	return { login, isLoading, error, isError }
}

export default useLogin
