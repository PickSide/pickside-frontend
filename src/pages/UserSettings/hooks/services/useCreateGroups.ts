import { AppState, addGroup } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useCreateGroups = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const me = useSelector((state: AppState) => state.user)

	const callback = async (data: any) =>
		await axiosInstance.post(`/groups`, data)

	const {
		mutate: createGroups,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['create-groups'],
		onSuccess: ({ data }) => {
			dispatch(addGroup(data.result))
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

	return { createGroups, isLoading, error, isError }
}

export default useCreateGroups
