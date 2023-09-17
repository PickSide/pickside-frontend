import { fetchGoogleAccountInfoServiceAPI, loginUserWithGoogle } from '@api/axiosInstance'

import { setUser } from '@state'
import { useDispatch } from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const useLoginWithGoogle = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<any>(null)
	const [error, setError] = useState<any>(null)

	const loginWithGoogle = useGoogleLogin({
		onSuccess: async ({ access_token }) => {
			setIsLoading(true)
			return await fetchGoogleAccountInfoServiceAPI(access_token)
				.then(({ data }) => loginUserWithGoogle(data))
				.then(({ data }) => dispatch<any>(setUser(data)))
				.then(() => setIsLoading(false))
				.then(() => navigate('/home'))
		},
		onError: (error) => setError(error),
		flow: 'implicit',
	})

	return { loginWithGoogle, isLoading, error, isError: !!error }
}

export default useLoginWithGoogle
