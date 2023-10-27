import { setUserEmpty } from '@state'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useSessionStorage } from 'react-use'
import { useTranslation } from 'react-i18next'

const useGuestLogout = () => {
	const dispatch = useDispatch()
	const [, setGuestUser] = useSessionStorage('user')
	const [, setGuestAccessToken] = useSessionStorage('accessToken')
	const [, setGuestRefreshToken] = useSessionStorage('refreshToken')
	const { t } = useTranslation()

	const callback = () =>
		Promise.resolve(() => {
			setGuestUser(null)
			setGuestAccessToken(null)
			setGuestRefreshToken(null)
		})

	const {
		mutate: guestLogout,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['logoutGuestUser'],
		onSuccess: () => {
			dispatch(setUserEmpty())
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t('Disconnected from guest session.'),
					type: 'success',
				},
			})
		},
		onError: (e) => console.log(e),
	})

	return { guestLogout, isLoading, error, isError }
}

export default useGuestLogout
