import { AppState, setMe } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useLogout = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const [, removeCachedUser] = useLocalStorage('user', null)
	const [, removeAccessToken] = useLocalStorage('accessToken', null)
	const [, removeRefreshToken] = useLocalStorage('refreshToken', null)
	const { t } = useTranslation()

	const me = useSelector((state: AppState) => state.user)

	const callback = async () => await axiosInstance.post(`/me/logout`, { data: { userId: me?.id } })

	const {
		mutate: logout,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['logoutUser'],
		onSuccess: () => {
			removeCachedUser(null)
			removeAccessToken(null)
			removeRefreshToken(null)

			dispatch(setMe(null))
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
