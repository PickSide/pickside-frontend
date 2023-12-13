import { AxiosContext, RTAContentContext } from '@context'
import { useLocalStorage, useSessionStorage } from 'react-use'

import { handleResponseError } from '@utils'
import { setUser } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const useLogin = () => {
	const { socket } = useContext(RTAContentContext)
	const [, setCachedUser] = useLocalStorage('user')
	const [, setCachedAccessToken] = useLocalStorage('accessToken')
	const [, setCachedRefreshToken] = useLocalStorage('refreshToken')

	const [, setGuestUser] = useSessionStorage('guest-user')
	const [, setGuestAccessToken] = useSessionStorage('guest-accessToken')
	const [, setGuestRefreshToken] = useSessionStorage('guest-refreshToken')

	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const callback = (data: any) => axiosInstance.post('/login', { data })

	const {
		mutate: login,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		onSuccess: ({ data }) => {
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
			navigate(data.redirectUri, { replace: true })
			socket.emit('user:login', data.user)
		},
		onError: (error: any) => handleResponseError(error),
		onSettled: () => {
			setGuestUser(null)
			setGuestAccessToken(null)
			setGuestRefreshToken(null)
		},
	})
	return { login, isLoading, error, isError }
}

export default useLogin
