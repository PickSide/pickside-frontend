import { AppState, setUserEmpty } from '@state'
import { AxiosContext, RTAContentContext } from '@context'
import { useDispatch, useSelector } from 'react-redux'

import { useContext } from 'react'
import { useLocalStorage } from 'react-use'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useLogout = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const { socket } = useContext(RTAContentContext)
	const dispatch = useDispatch()
	const [, , removeCachedUser] = useLocalStorage('user')
	const [, , removeAccessToken] = useLocalStorage('accessToken')
	const [, , removeRefreshToken] = useLocalStorage('refreshToken')
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async () => await axiosInstance.post(`/logout`, { data: { userId: connectedUser?.id } })

	const {
		mutate: logout,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['logoutUser'],
		onSuccess: () => {
			removeCachedUser()
			removeAccessToken()
			removeRefreshToken()

			socket.emit('user:logout', connectedUser)

			dispatch(setUserEmpty())
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t('Successfully logged out'),
					type: 'success',
				},
			})
		},
		onError: (e) => console.log(e),
	})

	return { logout, isLoading, error, isError }
}

export default useLogout
