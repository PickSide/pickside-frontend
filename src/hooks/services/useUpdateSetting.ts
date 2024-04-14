import { AxiosContext } from '@context'
import { AppState, updateMeConfig } from '@state'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useUpdateSetting = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const { axiosMSInstance } = useContext(AxiosContext)

	const me = useSelector((state: AppState) => state.user)

	const callback = async (data) => axiosMSInstance.put(`/user/${me?.id}/settings`, data)

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
