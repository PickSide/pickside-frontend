import { AxiosContext } from '@context'
import { updateMeConfig } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useUpdateSetting = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const { axiosInstance } = useContext(AxiosContext)

	const callback = async (data) => axiosInstance.put(`/me/settings`, data)


	const {
		mutate: updateUser,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['update-user-settings'],
		onSuccess: ({ data }, params) => {
			dispatch(updateMeConfig(params))
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t(data.message),
					type: 'success',
				},
			})
		},
		onError: (e) => console.log(e),
	})

	return { updateUser, isLoading, error, isError }
}

export default useUpdateSetting
