import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '@state'
import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useDeactivateAccount = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async () => await axiosInstance.put(`/users/deactivate/${connectedUser?.id}`)

	const {
		mutate: deactivateUser,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['deactivateAccount'],
		onSuccess: ({ data }) =>
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t(data.message),
					type: 'success',
				},
			}),
		onError: (e) => console.log(e),
	})

	return { deactivateUser, isLoading, error, isError }
}

export default useDeactivateAccount
