import { AxiosContext, RTAContentContext } from '@context'
import { useLocalStorage, useSessionStorage } from 'usehooks-ts'

import { handleResponseError } from '@utils'
import { setUser } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const useLogin = () => {
	const { usersSocket } = useContext(RTAContentContext)
	const [, setCachedUser] = useLocalStorage('user', null)

	const [, setGuestUser] = useSessionStorage('guest-user', null)

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
			setCachedUser(data.result)
			dispatch(setUser(data.result))
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t('Successfully logged in'),
					type: 'success',
				},
			})
			navigate(data.redirectUri, { replace: true })
			//usersSocket.emit('user:login', data.result)
		},
		onError: (error: any) => handleResponseError(error),
		onSettled: () => {
			setGuestUser(null)
		},
	})
	return { login, isLoading, error, isError }
}

export default useLogin
