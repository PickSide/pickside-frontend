import { AppState, addGroup } from '@state'
import { AxiosContext, RTAContentContext } from '@context'
import { useDispatch, useSelector } from 'react-redux'

import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useCreateGroups = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const { socket } = useContext(RTAContentContext)
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async (data: any) =>
		await axiosInstance.post(`/groups`, { data: { ...data, organizer: connectedUser?.id } })

	const {
		mutate: createGroups,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['createGroups'],
		onSuccess: ({ data }) => {
			dispatch(addGroup(data.response.group))
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t(data.message),
					type: 'success',
				},
			})
			socket.emit('group:create', {
				...data.response.group,
				organizerId: connectedUser?.id,
				organizerUserame: connectedUser?.username,
			})
		},
		onError: (e) => console.log(e),
	})

	return { createGroups, isLoading, error, isError }
}

export default useCreateGroups
