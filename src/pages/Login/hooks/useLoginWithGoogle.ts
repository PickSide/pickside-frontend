import { useContext, useState } from 'react'

import { AxiosContext } from '@context'
import axios from 'axios'
import { setMe } from '@state'
import { useDispatch } from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google'
import { useLocalStorage } from 'usehooks-ts'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const useLoginWithGoogle = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [, setCachedUser] = useLocalStorage('user', null)
	const { t } = useTranslation()

	const { axiosASInstance, axiosMSInstance } = useContext(AxiosContext)
	const [isLoading, setIsLoading] = useState<any>(null)
	const [error, setError] = useState<any>(null)

	const fetchGoogleAccountInfoServiceAPI = async (accessToken: string) =>
		await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`)

	const callback = async (data: any) => await axiosASInstance.post('/extlogin', { ...data, provider: "google" })

	const loginWithGoogle = useGoogleLogin({
		onSuccess: async ({ access_token }) => {
			setIsLoading(true)
			return await fetchGoogleAccountInfoServiceAPI(access_token)
				.then(({ data }) => callback(data))
				.then(({ data }) => {
					setCachedUser(data.result)
					dispatch(setMe(data.result))
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
