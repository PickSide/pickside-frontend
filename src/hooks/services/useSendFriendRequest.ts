import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '@state'
import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useSendFriendRequest = () => {
	const { axiosMSInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const me = useSelector((state: AppState) => state.user)

	const callback = async (userId: string) =>
		await axiosMSInstance.put(`/send-friend-request?userKeys=${userId},${me?.id}`)

	const {
		mutate: sendFriendRequest,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['send-friend-request'],
		onSuccess: () => {
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t('Sent friend request'),
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

	return { sendFriendRequest, isLoading, error, isError }
}

export default useSendFriendRequest
