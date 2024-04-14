import { AxiosContext } from '@context'
import { setMe } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useLocalStorage } from 'usehooks-ts'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useLogout = () => {
	const { axiosASInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const [, removeCachedUser] = useLocalStorage('user', null)
	const [, removeBearerToken] = useLocalStorage('my-bearer-token', null)
	const { t } = useTranslation()


	const callback = async () => await axiosASInstance.post(`/logout`)

	const {
		mutate: logout,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['logout'],
		onSuccess: () => {
			removeBearerToken(null)
			removeCachedUser(null)

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
