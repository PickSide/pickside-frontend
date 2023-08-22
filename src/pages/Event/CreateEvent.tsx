import { FormProvider, useForm } from 'react-hook-form'

import Footer from '../../pages/Home/Sections/Footer'
import MultiStepForm from './components/MultiStepForm'
import { StepperProvider } from './context'
import dayjs from 'dayjs'
import moment from 'moment'
import { useApi } from '@hooks'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateEvent = () => {
	const navigate = useNavigate()
	const { createActivity, getActivities } = useApi()
	const dispatch = useDispatch()

	const form = useForm({
		defaultValues: {
			date: dayjs(),
			time: moment(),
			address: '',
			sport: '',
			mode: '',
			price: 0,
			maxPlayers: 0,
			rules: '',
			title: '',
			images: [],
		},
		reValidateMode: 'onChange',
		resetOptions: {
			keepDirtyValues: false,
			keepErrors: false,
		},
	})

	const onSubmit = async (data) => {
		const toSend = {
			...data,
		}
		await dispatch<any>(createActivity(toSend))
		await dispatch<any>(getActivities())
		navigate('/listing')
	}

	return (
		<StepperProvider>
			<div className="flex flex-col h-screen">
				<FormProvider {...form}>
					<MultiStepForm onSubmit={onSubmit} />
					<Footer />
				</FormProvider>
			</div>
		</StepperProvider>
	)
}

export default CreateEvent
