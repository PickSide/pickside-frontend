import { useContext, useState } from 'react'

import { AxiosContext } from '@context'
import axios from 'axios'
import { setUser } from '@state'
import { useDispatch } from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google'
import { useLocalStorage } from 'react-use'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const useLoginWithGoogle = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [, setCachedUser] = useLocalStorage('user')
	const [, setCachedAccessToken] = useLocalStorage('accessToken')
	const [, setCachedRefreshToken] = useLocalStorage('refreshToken')
	const { t } = useTranslation()

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

	const callback = async (data: any) => await axiosInstance.post('/googlelogin', { data })

	const loginWithGoogle = useGoogleLogin({
		onSuccess: async ({ access_token }) => {
			setIsLoading(true)
			return await fetchGoogleAccountInfoServiceAPI(access_token)
				.then(({ data }) => callback(data))
				.then(({ data }) => {
					setCachedUser(data.user)
					setCachedAccessToken(data.accessToken)
					setCachedRefreshToken(data.refreshToken)
					dispatch(setUser(data.user))
					dispatch({
						type: 'toast/toastMessage',
						payload: {
							message: t('Successfully logged in'),
							type: 'success',
						},
					})
					setIsLoading(false)
					navigate(data.redirectUri, { replace: true })
				})
		},
		onError: (error) => setError(error),
		flow: 'implicit',
	})

	return { loginWithGoogle, isLoading, error, isError: !!error }
}

export default useLoginWithGoogle
