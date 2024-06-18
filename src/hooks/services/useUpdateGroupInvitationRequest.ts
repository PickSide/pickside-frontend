import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '@state'
import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

interface UpdateGroupInvitiationRequestProps {
	groupId: string
	status: 'accepted' | 'declined'
}

const useUpdateGroupInvitationRequest = () => {
	const { extsvcInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const me = useSelector((state: AppState) => state.user)

	const callback = async (data: UpdateGroupInvitiationRequestProps) =>
		await extsvcInstance.put(`/groups/${data.groupId}/users/${me?.id}/invitation?status=${data.status}`)

	const {
		mutate: updateGroupInvitiationRequest,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['update-group-invitation'],
		onSuccess: () => {
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t('Successfully joined group'),
					type: 'success',
				},
			})
		},
		onError: ({ response: { data } }) =>
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: data.error,
					type: 'error',
				},
			}),
	})

	return { updateGroupInvitiationRequest, isLoading, error, isError }
}

export default useUpdateGroupInvitationRequest
