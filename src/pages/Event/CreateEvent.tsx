import { Controller, useForm } from 'react-hook-form'
import { DatePicker, NumberField, Select, TextAreaField, TextField, TimePicker } from 'components'
import { GoogleAutocomplete, ImageUploader, Stepper } from 'widgets'
import { Mode, Sport } from 'state'
import { useApi, useLocalStorage } from 'hooks'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from 'state'
import Footer from '../../pages/Home/Sections/Footer'
import dayjs from 'dayjs'
import { features } from 'process'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const CreateEvent = () => {
	const { get } = useLocalStorage()
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
			date: dayjs(),
			images: [],
			location: '',
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
		// setLoading(true)
		// await dispatch<any>(createActivity(data))
		// await dispatch<any>(getActivities())
		// setLoading(false)
		// navigate('/listing')
	}

	const Divider = () => <div className="border border-gray-200 my-6"></div>

	const steps = [
		{
			id: 'time',
			title: t('Time & Location'),
			description: t('Set your time and location'),
			content: (
				<div className="flex flex-col">
					<Controller
						name="date"
						control={control}
						render={({ field }) => (
							<DatePicker
								{...field}
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
								{...field}
								onChange={(value) => setValue('time', value)}
								placeholder="Choose time"
								label="Time"
								fullWidth
							/>
						)}
					/>
					<Divider />
					<Controller
						name="location"
						control={control}
						render={({ field }) => (
							<GoogleAutocomplete
								{...field}
								label={t('Location')}
								onSelectPlace={(value) => setValue('location', value)}
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
								{...field}
								label={t('Sport')}
								placeholder={t('Select sport')}
								options={sports?.results}
								getOptionLabel={(option) => option?.name}
								isOptionDisabled={(option) => !option?.featureAvailable}
								onChange={(value) => setValue('sport', value)}
								defaultValue=""
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
										{...field}
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
						render={({ field }) => <NumberField {...field} label={t('Price')} fullWidth />}
					/>
					<Divider />
					<Controller
						name="maxPlayers"
						control={control}
						render={({ field }) => <NumberField {...field} label={t('Number of players')} fullWidth />}
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
							{...field}
							label={t('Rules')}
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
						name="title"
						control={control}
						render={({ field }) => (
							<TextField {...field} label={t('Title')} placeholder={t('Type your title')} fullWidth />
						)}
					/>
					<Divider />
					<Controller
						name="images"
						control={control}
						render={({ field }) => <ImageUploader {...field} onChange={(value) => setValue('images', value)} />}
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
