import { AppState, addActivity } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosContext } from '@context'
import { CreateEventProps } from '../utils/types'
import { omit } from 'lodash'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const useCreateActivity = () => {
	const { extsvcInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const me = useSelector((state: AppState) => state.user)

	const callback = async (values: CreateEventProps) => {
		const data = omit(
			{
				...values,
				date: values.date.format('YYYY-MM-DD'),
				sportId: values.sport.id,
				organizerId: me?.id,
			},
			['images', 'sport'],
		)

		const resp = await extsvcInstance.post(`/activities`, data)

		if (resp.data.result && values.images.length) {
			const formData = new FormData()

			values.images.forEach((img) => {
				if (img instanceof FileList) {
					for (let i = 0; i < img.length; i++) {
						formData.append('files', img[i])
					}
				} else {
					formData.append('files', img)
				}
			})

			await extsvcInstance.put(`/activities/${resp.data.result.id}/images`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		}

		return resp
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
