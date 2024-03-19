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
			date: dayjs(),
			time: moment(),
			address: '',
			sport: '',
			gameMode: '',
			price: 0,
			maxPlayers: 0,
			rules: '',
			title: '',
			images: [],
			isPrivate: false,
		},
		reValidateMode: 'onChange',
		resetOptions: {
			keepDirtyValues: false,
			keepErrors: false,
		},
	})

	const onSubmit = async (data) => createActivity(data)

	return (
		<div className='flex flex-col justify-between h-[calc(100vh-64px)]'>
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
