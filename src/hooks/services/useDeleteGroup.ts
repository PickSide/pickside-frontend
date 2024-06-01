import { AppState, removeGroup } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useDeleteGroup = () => {
	const { axiosMSInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const me = useSelector((state: AppState) => state.user)

	const callback = async (id: string) => await axiosMSInstance.delete(`/groups/${id}/organizer/${me?.id}`)

	const {
		mutate: deleteGroup,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['delete-group'],
		onSuccess: ({ data }, groupId) => {
			dispatch(removeGroup(groupId))
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

	return { deleteGroup, isLoading, error, isError }
}

export default useDeleteGroup
