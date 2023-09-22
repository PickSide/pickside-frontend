import { AppState, updateUserConfig } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useUpdateSetting = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const { axiosInstance } = useContext(AxiosContext)

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async (data) => axiosInstance.put(`users/${connectedUser?.id}/settings`, { data })

	const {
		mutate: updateUser,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['updateUserSettings'],
		onSuccess: () => {
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t('Updated user settings'),
					type: 'success',
				},
			})
		},
		onSettled: (data) => {
			dispatch<any>(updateUserConfig({ ...data }))
		},
		onError: (e) => console.log(e),
	})

	return { updateUser, isLoading, error, isError }
}

export default useUpdateSetting
