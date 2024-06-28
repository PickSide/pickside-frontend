import { removeActivity } from '@state'
import { useDispatch } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const useDeleteActivity = () => {
	const { extsvcInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const callback = async (activityId: string) => await extsvcInstance.delete(`/activities/${activityId}`)

	const {
		mutate: deleteActivity,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['delete-activity'],
		onSuccess: ({ data }, activityId) => {
			dispatch(removeActivity(activityId))
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

	return { deleteActivity, isLoading, error, isError }
}

export default useDeleteActivity
