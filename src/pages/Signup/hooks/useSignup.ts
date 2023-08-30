import { createUser } from '@api'
import { handleResponseError } from '@utils'
import { setUser } from '@state'
import { useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
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
		onSuccess: ({ data }) => {
			dispatch<any>(setUser(data))
			navigate('/home')
		},
		onError: (error: any) => handleResponseError(error),
	})
	return { error, signup, isError, isLoading }
}

export default useSignup
