import { AxiosContext } from '@context'
import { handleResponseError } from '@utils'
import { setUser } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useLocalStorage } from 'react-use'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const useLogin = () => {
	const [, setCachedUser] = useLocalStorage('user')
	const [, setCachedAccessToken] = useLocalStorage('accessToken')
	const [, setCachedRefreshToken] = useLocalStorage('refreshToken')
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
		},
		onError: (error: any) => handleResponseError(error),
	})
	return { login, isLoading, error, isError }
}

export default useLogin
