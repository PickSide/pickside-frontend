import { Controller, useForm } from 'react-hook-form'
import { DatePicker, NumberField, Select, TextAreaField, TextField, TimePicker } from 'components'
import { GoogleAutocomplete, ImageUploader, Stepper } from 'widgets'
import { Mode, Sport } from 'state'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from 'state'
import Footer from '../../pages/Home/Sections/Footer'
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

	const connectedUser = useSelector((state: AppState) => state.user)
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
			content: (
				<div className="flex flex-col">
					<Controller
						name="date"
						control={control}
						render={({ field }) => (
							<DatePicker
								onChange={(value) => setValue('date', value)}
								placeholder="Select date"
								label="Date"
								fullWidth
							/>
						)}
					/>
					<Divider />
					<Controller
						name="time"
						control={control}
						render={({ field }) => (
							<TimePicker
								onChange={(value) => setValue('time', value)}
								placeholder="Choose time"
								label="Time"
								fullWidth
							/>
						)}
					/>
					<Divider />
					<Controller
						name="address"
						control={control}
						render={({ field }) => (
							<GoogleAutocomplete
								label={t('Address')}
								onSelectPlace={(value) => setValue('address', value)}
								fullWidth
							/>
						)}
					/>
				</div>
			),
			required: true,
		},
		{
			id: 'time',
			title: t('Price'),
			description: t('Tell us more about your event'),
			content: (
				<div className="flex flex-col">
					<Controller
						name="sport"
						control={control}
						render={({ field }) => (
							<Select
								label={t('Sport')}
								placeholder={t('Select sport')}
								options={sports?.results}
								getOptionLabel={(option) => option?.name}
								isOptionDisabled={(option) => !option?.featureAvailable}
								onChange={(value) => setValue('sport', value)}
								defaultValue={sports?.results?.find((sport) => sport.featureAvailable) || ''}
							/>
						)}
					/>
					<Divider />
					{watch('sport') && (
						<>
							<Controller
								name="mode"
								control={control}
								render={({ field }) => (
									<Select
										label={t('Mode')}
										placeholder={t('Select mode')}
										options={getValues('sport.modes')}
										getOptionLabel={(option) => option?.name}
										onChange={(value) => setValue('mode', value)}
										defaultValue=""
									/>
								)}
							/>
							<Divider />
						</>
					)}
					<Controller
						name="price"
						control={control}
						render={({ field }) => (
							<NumberField label={t('Price')} onChange={(e) => setValue('price', e.target.value)} fullWidth />
						)}
					/>
					<Divider />
					<Controller
						name="maxPlayers"
						control={control}
						render={({ field }) => (
							<NumberField
								label={t('Number of players')}
								onChange={(e) => setValue('maxPlayers', e.target.value)}
								fullWidth
							/>
						)}
					/>
				</div>
			),
			required: true,
		},
		{
			id: 'time',
			title: t('Rules'),
			description: t('Set rules for your event'),
			content: (
				<Controller
					name="rules"
					control={control}
					render={({ field }) => (
						<TextAreaField
							label={t('Rules')}
							onChange={(e) => setValue('rules', e.target.value)}
							placeholder={t('Let your teammates know wht you expect of them ...')}
							fullWidth
						/>
					)}
				/>
			),
			required: true,
		},
		{
			id: 'time',
			title: t('Post'),
			description: t('Choose a title and image for your event'),
			content: (
				<div className="flex flex-col">
					<Controller
						control={control}
						name="title"
						render={({ field }) => (
							<TextField
								label={t('Title')}
								placeholder={t('Type your title')}
								onChange={(e) => setValue('title', e.target.value)}
								fullWidth
							/>
						)}
					/>
					<Divider />
					<Controller
						control={control}
						name="images"
						render={({ field }) => <ImageUploader onChange={(value) => setValue('images', value)} />}
					/>
				</div>
			),
			required: true,
		},
	]
	return (
		<div className="flex flex-col justify-between h-[calc(100vh-64px)]">
			<form className="flex-1 p-8 w-[70%] mx-auto h-full" onSubmit={handleSubmit(onSubmit)}>
				<Stepper steps={steps} submitDisabled={!isDirty} submitText="Post" nextText="Continue" />
			</form>
			<Footer />
		</div>
	)
}

export default CreateEvent
