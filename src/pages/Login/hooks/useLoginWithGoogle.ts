import { useContext, useState } from 'react'

import { AxiosContext } from '@context'
import axios from 'axios'
import { setUser } from '@state'
import { useDispatch } from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

const useLoginWithGoogle = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { axiosInstance } = useContext(AxiosContext)
	const [isLoading, setIsLoading] = useState<any>(null)
	const [error, setError] = useState<any>(null)

	const fetchGoogleAccountInfoServiceAPI = async (accessToken: string) =>
		await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json',
			},
		})

	const callback = (data: any) => axiosInstance.post('/googlelogin', { data })

	const loginWithGoogle = useGoogleLogin({
		onSuccess: async ({ access_token }) => {
			setIsLoading(true)
			return await fetchGoogleAccountInfoServiceAPI(access_token)
				.then(({ data }) => callback(data))
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
