import { FormProvider, useForm } from 'react-hook-form'
import { useCreateActivity, useDevice } from '@hooks'

import { CreateEventProps } from './utils/types'
import Footer from '../Home/sections/Footer'
import MultiStepForm from './components/MultiStepForm'
import { StepperProvider } from './context'
import dayjs from 'dayjs'
import moment from 'moment'

const CreateEvent = () => {
	const { createActivity } = useCreateActivity()
	const [device] = useDevice()

	const form = useForm<CreateEventProps>({
		defaultValues: {
			address: '',
			date: dayjs(),
			duration: '',
			gameMode: '',
			images: [],
			isPrivate: false,
			maxPlayers: 0,
			price: 0,
			rules: '',
			sport: '',
			startTime: moment(),
			title: '',
		},
		reValidateMode: 'onBlur',
		resetOptions: {
			keepDirtyValues: false,
			keepErrors: false,
		},
	})

	const onSubmit = async (values) => createActivity(values)

	return (
		<div className="flex flex-col justify-between h-[calc(100vh-64px)]">
			<StepperProvider>
				<FormProvider {...form}>
					<MultiStepForm onSubmit={onSubmit} />
				</FormProvider>
			</StepperProvider>
			{device !== 'mobile' && <Footer />}
		</div>
	)
}

export default CreateEvent
