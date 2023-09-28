import { FormProvider, useForm } from 'react-hook-form'

import Footer from '../Home/components/Footer'
import MultiStepForm from './components/MultiStepForm'
import { StepperProvider } from './context'
import dayjs from 'dayjs'
import moment from 'moment'
import { useCreateActivity } from '@hooks'
import { useDispatch } from 'react-redux'

const CreateEvent = () => {
	const { createActivity } = useCreateActivity()
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

	const onSubmit = async (data) => await dispatch(createActivity(data))

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
