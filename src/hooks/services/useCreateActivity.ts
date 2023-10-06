import { AppState, addActivity } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const useCreateActivity = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async (data: any) =>
		await axiosInstance.post(`/activities`, { data: { ...data, organiser: connectedUser?.id } })

	const {
		mutate: createActivity,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['createActivity'],
		onSuccess: ({ data }) => {
			dispatch(addActivity(data.response.activity))
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t(data.message),
					type: 'success',
				},
			})
			navigate('/listing')
		},
		onError: (e) => console.log(e),
	})

	return { createActivity, isLoading, error, isError }
}

export default useCreateActivity
