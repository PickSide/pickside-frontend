import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '@state'
import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useAcceptFriendRequest = () => {
	const { axiosMSInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const me = useSelector((state: AppState) => state.user)

	const callback = async (userId: string) =>
		await axiosMSInstance.put(`/accept-friend-request?userKeys=${userId},${me?.id}`)

	const {
		mutate: acceptFriendRequest,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['accept-friend-request'],
		onSuccess: () => {
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t('Friend added'),
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

	return { acceptFriendRequest, isLoading, error, isError }
}

export default useAcceptFriendRequest
