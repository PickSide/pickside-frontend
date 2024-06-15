import { IErrorResponse, handleResponseError } from '@utils'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '@state'
import { AxiosContext } from '@context'
import { AxiosError } from 'axios'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

interface ChangePasswordRequestProps {
	currentPassword: string
	newPassword: string
}

const useChangePassword = () => {
	const { axiosMSInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const me = useSelector((app: AppState) => app.user)

	const callback = async (data: ChangePasswordRequestProps) =>
		await axiosMSInstance.put(`/change-password`, { email: me?.email, userId: me?.id, ...data })

	const {
		mutate: changePassword,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['change-password'],
		onSuccess: ({ data }) => {
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t('Password changed'),
					type: 'success',
				},
			})
		},
		onError: (e: AxiosError<IErrorResponse>) => handleResponseError(e),
	})

	return { changePassword, isLoading, error, isError }
}

export default useChangePassword
