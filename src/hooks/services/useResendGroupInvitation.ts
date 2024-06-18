import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

interface ResendGroupInvitationProps {
	groupId: string
	userId: string
}

const useResendGroupInvitation = () => {
	const { extsvcInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const callback = async (data: ResendGroupInvitationProps) =>
		await extsvcInstance.post(`/groups/resend-invitation`, data)

	const {
		mutate: resendGroupInvitation,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['resend-group-invitation'],
		onSuccess: () => {
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t('Invitation resent'),
					type: 'success',
				},
			})
		},
		onError: (e) =>
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t('Internal error'),
					type: 'error',
				},
			}),
	})

	return { resendGroupInvitation, isLoading, error, isError }
}

export default useResendGroupInvitation
