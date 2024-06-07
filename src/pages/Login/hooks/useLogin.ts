import { AxiosContext } from '@context'
import { handleResponseError } from '@utils'
import { setMe } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const useLogin = () => {
	const { axiosMSInstance, setBearer } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const callback = (data: any) => axiosMSInstance.post('/login', data)

	const {
		mutate: login,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		onSuccess: ({ data }) => {
			setBearer(data.result.token)
			dispatch(setMe(data.result.user))
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t('Successfully logged in'),
					type: 'success',
				},
			})
			!!data.redirectUri ? navigate(data.redirectUri, { replace: true }) : navigate('/', { replace: true })
		},
		onError: (error: any) => handleResponseError(error),
	})
	return { login, isLoading, error, isError }
}

export default useLogin
