import { setMe } from '@state'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useSessionStorage } from 'usehooks-ts'
import { useTranslation } from 'react-i18next'

const useGuestLogout = () => {
	const dispatch = useDispatch()
	const [, setSessionUser] = useSessionStorage('user', null)
	const { t } = useTranslation()

	const callback = () =>
		Promise.resolve(() => {
			setSessionUser(null)
		})

	const {
		mutate: guestLogout,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['logoutGuestUser'],
		onSuccess: () => {
			dispatch(setMe(null))
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
