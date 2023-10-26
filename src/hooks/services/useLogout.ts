import { AxiosContext } from '@context'
import { setUserEmpty } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useLocalStorage } from 'react-use'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useLogout = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const [, , removeCachedUser] = useLocalStorage('user')
	const [, , removeAccessToken] = useLocalStorage('accessToken')
	const [, , removeRefreshToken] = useLocalStorage('refreshToken')
	const { t } = useTranslation()

	const callback = async () => await axiosInstance.post(`/logout`)

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
