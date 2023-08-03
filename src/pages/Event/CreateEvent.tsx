import { Button, DatePicker, NumberField, Select, TextAreaField, TextField, TimePicker } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { GoogleAutocomplete, ImageUploader, Stepper } from 'widgets'
import { Mode, Sport } from 'state'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from 'state'
import Footer from '../../pages/Home/Sections/Footer'
import Step1 from './Forms/Step1'
import Step2 from './Forms/Step2'
import Step3 from './Forms/Step3'
import Step4 from './Forms/Step4'
import dayjs from 'dayjs'
import { features } from 'process'
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

	const {
		formState: { isDirty, dirtyFields },
		control,
		setValue,
		getValues,
		register,
		handleSubmit,
		watch,
	} = useForm({
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

	const Divider = () => <div className="border border-gray-200 my-6"></div>

	const steps = [
		{
			id: 'time',
			title: t('Time & address'),
			description: t('Set your time and address'),
			content: <Step1 form={form} t={t} />,
			required: true,
		},
		{
			id: 'time',
			title: t('Price'),
			description: t('Tell us more about your event'),
			content: <Step2 form={form} t={t} />,
			required: true,
		},
		{
			id: 'time',
			title: t('Rules'),
			description: t('Set rules for your event'),
			content: <Step3 form={form} t={t} />,
			required: true,
		},
		{
			id: 'time',
			title: t('Post'),
			description: t('Choose a title and image for your event'),
			content: <Step4 form={form} t={t} />,
			required: true,
		},
	]
	return (
		<div className="flex flex-col justify-between h-[calc(100vh-64px)]">
			<form className="flex-1 py-8 lg:px-8 lg:w-[70%] w-[80%] mx-auto h-full" onSubmit={handleSubmit(onSubmit)}>
				<Stepper steps={steps} submitDisabled={!isDirty} submitText="Post" nextText="Continue" />
			</form>
			<Footer />
		</div>
	)
}

export default CreateEvent
