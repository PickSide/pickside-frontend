import { useDispatch, useSelector } from 'react-redux'

import { AppState } from 'state'
import Footer from '../../pages/Home/Sections/Footer'
import Step1 from './Forms/Step1'
import Step2 from './Forms/Step2'
import Step3 from './Forms/Step3'
import Step4 from './Forms/Step4'
import { Stepper } from 'widgets'
import dayjs from 'dayjs'
import moment from 'moment'
import { useApi } from 'hooks'
import { useForm } from 'react-hook-form'
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
			sport: sports?.results?.find((sport) => sport.featureAvailable),
			time: moment(),
			title: '',
		},
		reValidateMode: 'onSubmit',
		resetOptions: {
			keepDirtyValues: false,
			keepErrors: false,
		},
	})

	const [loading, setLoading] = useState<boolean>(false)

	const onSubmit = async (data) => {
		console.log(data)
		const toSend = {
			...data,
			date: data.date.toDate(),
			time: undefined,
		}
		setLoading(true)
		await dispatch<any>(createActivity(toSend))
		await dispatch<any>(getActivities())
		setLoading(false)
		navigate('/listing')
	}

	const steps = [
		{
			id: 'time',
			title: t('Time & address'),
			description: t('Set your time and address'),
			content: <Step1 form={form} t={t} />,
			required: true,
		},
		{
			id: 'price',
			title: t('Price'),
			description: t('Tell us more about your event'),
			content: <Step2 form={form} t={t} />,
			required: true,
		},
		{
			id: 'rules',
			title: t('Rules'),
			description: t('Set rules for your event'),
			content: <Step3 form={form} t={t} />,
			required: true,
		},
		{
			id: 'post',
			title: t('Post'),
			description: t('Choose a title and image for your event'),
			content: <Step4 form={form} t={t} />,
			required: true,
		},
	]
	return (
		<div className="flex flex-col h-screen">
			<form className="flex-1 py-8 lg:px-8 lg:w-[70%] w-[80%] mx-auto" onSubmit={form.handleSubmit(onSubmit)}>
				<Stepper
					steps={steps}
					submitDisabled={!form.formState.isDirty}
					submitText={t('Post')}
					nextText={t('Continue')}
				/>
			</form>
			<Footer />
		</div>
	)
}

export default CreateEvent
