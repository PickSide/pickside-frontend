import { AxiosContext } from '@context'
import { handleResponseError } from '@utils'
import { setMe } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useSessionStorage } from 'usehooks-ts'
import { useTranslation } from 'react-i18next'

const useLoginAsGuest = () => {
	const [, setGuestUser] = useSessionStorage('guest-user', null)

	const { axiosMSInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const callback = () => axiosMSInstance.post('/guest-login')

	const {
		mutate: loginAsGuest,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		onSuccess: ({ data }) => {
			dispatch(setMe(data.result))
			setGuestUser(data.result)
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
