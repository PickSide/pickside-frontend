import { AxiosContext } from '@context'
import { handleResponseError } from '@utils'
import { setUser } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useSessionStorage } from 'react-use'
import { useTranslation } from 'react-i18next'

const useLoginAsGuest = () => {
	const [, setGuestUser] = useSessionStorage('guest-user')
	const [, setGuestAccessToken] = useSessionStorage('guest-accessToken')
	const [, setGuestRefreshToken] = useSessionStorage('guest-refreshToken')

	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const callback = () => axiosInstance.post('/guest-login')

	const {
		mutate: loginAsGuest,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		onSuccess: ({ data }) => {
			dispatch(setUser(data.user))
			setGuestUser(data.user)
			setGuestAccessToken(data.accessToken)
			setGuestRefreshToken(data.refreshToken)
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t('You are logged in as guest'),
					type: 'success',
				},
			})
			navigate(data.redirectUri, { replace: true })
		},
		onError: (error: any) => handleResponseError(error),
	})
	return { loginAsGuest, isLoading, error, isError }
}

export default useLoginAsGuest
