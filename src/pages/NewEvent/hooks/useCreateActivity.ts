import { AppState, addActivity } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { CreateEventProps } from '../utils/types'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const useCreateActivity = () => {
	const { extsvcMFDInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const me = useSelector((state: AppState) => state.user)

	const callback = async (values: CreateEventProps) => {
		const data = {
			...values,
			date: values.date.format('YYYY-MM-DD'),
			sportId: values.sport.id,
			organizerId: me?.id,
		} as CreateEventProps

		delete data.sport
		
		const formData = new FormData()

		// append all entries
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value)
		})

		// append images
		values.images.forEach((img) => formData.append('images[]', img))


		return await extsvcMFDInstance.post(`/activities`, formData)
	}

	const {
		mutate: createActivity,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['create-activity'],
		onSuccess: ({ data }) => {
			dispatch(addActivity(data.result))
			dispatch({
				type: 'toast/toastMessage',
				payload: {
					message: t(data.message),
					type: 'success',
				},
			})
			navigate('/listing', { replace: true })
		},
		onError: (e) => console.error(e),
	})

	return { createActivity, isLoading, error, isError }
}

export default useCreateActivity
