import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from 'state'
import Footer from '../../pages/Home/Sections/Footer'
import MultiStepForm from './components/MultiStepForm'
import { StepperProvider } from './context'
import dayjs from 'dayjs'
import moment from 'moment'
import { useApi } from 'hooks'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const CreateEvent = () => {
	const navigate = useNavigate()
	const { createActivity, getActivities } = useApi()
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const sports = useSelector((state: AppState) => state.sports)

	const form = useForm({
		defaultValues: {
			address: '',
			date: dayjs(),
			images: [],
			maxPlayers: 0,
			mode: '',
			price: 0,
			rules: '',
			sport: '',
			time: moment(),
			title: '',
		},
		reValidateMode: 'onChange',
		resetOptions: {
			keepDirtyValues: false,
			keepErrors: false,
		},
	})

	const [loading, setLoading] = useState<boolean>(false)

	const onSubmit = async (data) => {
		console.log('data', data)
		// const toSend = {
		// 	...data,
		// 	date: data.date.toDate(),
		// 	time: undefined,
		// }
		// setLoading(true)
		// await dispatch<any>(createActivity(toSend))
		// await dispatch<any>(getActivities())
		// setLoading(false)
		// navigate('/listing')
	}

	return (
		<StepperProvider>
			<div className="flex flex-col h-screen">
				<FormProvider {...form}>
					<MultiStepForm form={form} onSubmit={onSubmit} t={t} />
					<Footer />
				</FormProvider>
			</div>
		</StepperProvider>
	)
}

export default CreateEvent
