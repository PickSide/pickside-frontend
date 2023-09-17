import { createUser } from '@api/axiosInstance'
import { handleResponseError } from '@utils'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const useSignup = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		mutate: signup,
		isError,
		isLoading,
		error,
	} = useMutation(createUser, {
		onSuccess: () => {
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: 'Successfully created user. Please login',
					type: 'success',
				},
			})
			navigate('/login')
		},
		onError: (error: any) => handleResponseError(error),
	})
	return { error, signup, isError, isLoading }
}

export default useSignup
