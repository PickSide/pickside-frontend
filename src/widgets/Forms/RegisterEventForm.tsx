import { FC, useCallback, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, TextField, Toggle, Select, Stepper, GroupRadio } from 'components'
import { NUMBERS_ONLY_REGEX } from 'utils'
import ReactDatePicker from 'react-datepicker'
import { useApi } from 'hooks'
import { AppState, Sport } from 'state'

interface RegisterEventFormProps {
	onClose: () => void
}

type FormData = {
	title: string
	sport: Sport
	organiser: string
	price: number
	levelRequired: number
	maxPlayersCapacity: number
	location: object
	isFree: boolean
	date: any
	mode: any
}

const RegisterEventForm: FC<RegisterEventFormProps | any> = ({ onClose, ...props }) => {
	const { createActivity, getActivities } = useApi()
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const { control, handleSubmit, watch, register, unregister } = useForm<FormData>({
		defaultValues: {
			title: '',
			sport: {},
			price: 0,
			levelRequired: 1,
			maxPlayersCapacity: 10,
			isFree: false,
			date: '',
			mode: '',
		},
	})

	const selectedSport = watch('sport')

	const sports = useSelector((state: AppState) => state.sports)

	const getOptionLabel = useCallback((option) => option.name, [])
	const getOptionValue = useCallback((option) => option.value, [])
	const getOptionDisabled = useCallback((option) => !option.featureAvailable, [])

	const onSubmit = async (values) => {
		await dispatch<any>(createActivity(values))
		await dispatch<any>(getActivities())
		onClose()
	}

	const baseRule = {
		required: { value: true, message: t('Field is required') },
	}

	useEffect(() => {
		if (selectedSport) {
			register('mode')
		} else {
			unregister('mode')
		}
	}, [selectedSport, register, unregister])

	return (
		<Stepper
			steps={[
				{
					id: 'sport-select',
					title: t('Select your sport'),
					required: true,
					content: (
						<>
							<Controller
								name="sport"
								control={control}
								rules={{
									...baseRule,
								}}
								render={({ field: { onChange }, fieldState: { error }, formState }) => (
									<Select
										label={t('Choose sport')}
										placeholder={t('Enter sport')}
										options={sports?.results}
										getOptionLabel={getOptionLabel}
										getOptionValue={getOptionValue}
										getOptionDisabled={getOptionDisabled}
										onChange={onChange}
										dense
										error={error}
									/>
								)}
							/>
							<Controller
								name="mode"
								control={control}
								rules={{
									...baseRule,
								}}
								render={({ field: { onChange } }) => (
									<GroupRadio
										label="Choose mode"
										options={selectedSport.modes}
										getOptionLabel={(option) => option.name}
										getOptionValue={(option) => option.value}
										getOptionDescription={(option) => option.description}
										getOptionDisabled={(option) => option.featureAvailable}
										onChange={onChange}
									/>
								)}
							/>
							<Controller
								name="date"
								control={control}
								render={({ field: { onChange, onBlur, value, ref } }) => (
									<ReactDatePicker onChange={onChange} onBlur={onBlur} selected={value} />
								)}
							/>
						</>
					),
				},
				{
					id: 'venu-select',
					title: t('Select your venue'),
					required: true,
					content: <></>,
				},
				{
					id: 'configuration',
					title: t('Select your Configuration'),
					required: true,
					content: <></>,
				},
			]}
		/>
		// <div className="p-6">
		// 	<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
		// 		<Controller
		// 			name="title"
		// 			control={control}
		// 			rules={{
		// 				...baseRule,
		// 			}}
		// 			render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
		// 				<TextField autofocus label={t('Title')} placeholder={t('Enter title')} dense error={error} {...field} />
		// 			)}
		// 		/>
		// 		<Controller
		// 			name="price"
		// 			control={control}
		// 			rules={{
		// 				...baseRule,
		// 				pattern: NUMBERS_ONLY_REGEX,
		// 			}}
		// 			render={({ field, fieldState: { error }, formState }) => (
		// 				<TextField label={t('Price per person')} placeholder={t('Enter price')} dense error={error} {...field} />
		// 			)}
		// 		/>
		// 		<Controller
		// 			name="levelRequired"
		// 			control={control}
		// 			rules={{
		// 				...baseRule,
		// 				pattern: NUMBERS_ONLY_REGEX,
		// 			}}
		// 			render={({ field, fieldState: { error }, formState }) => (
		// 				<TextField label={t('Level required')} placeholder={t('Enter price')} dense error={error} {...field} />
		// 			)}
		// 		/>
		// 		<Controller
		// 			name="maxPlayersCapacity"
		// 			control={control}
		// 			rules={{
		// 				...baseRule,
		// 				pattern: NUMBERS_ONLY_REGEX,
		// 			}}
		// 			render={({ field, fieldState: { error }, formState }) => (
		// 				<TextField label={t('Max player')} placeholder={t('Enter price')} dense error={error} {...field} />
		// 			)}
		// 		/>
		// 		<Controller
		// 			name="sport"
		// 			control={control}
		// 			rules={{
		// 				...baseRule,
		// 			}}
		// 			render={({ field: { onChange }, fieldState: { error }, formState }) => (
		// 				<Select
		// 					label={t('Choose sport')}
		// 					placeholder={t('Enter sport')}
		// 					options={sports?.results}
		// 					getOptionLabel={getOptionLabel}
		// 					getOptionValue={getOptionValue}
		// 					getOptionDisabled={getOptionDisabled}
		// 					onChange={onChange}
		// 					dense
		// 					error={error}
		// 				/>
		// 			)}
		// 		/>
		// 		<Controller
		// 			name="isFree"
		// 			control={control}
		// 			render={({ field: { onChange }, fieldState: { error }, formState }) => (
		// 				<Toggle label={t('No payment required')} dense />
		// 			)}
		// 		/>
		// 		<Button
		// 			type="submit"
		// 			className="rounded-md bg-primary w-[300px] text-white font-semibold h-[50px] transition-all duration-75 ease-in hover:bg-secondary"
		// 		>
		// 			{t('Create new event')}
		// 		</Button>
		// 	</form>
		// </div>
	)
}

export default RegisterEventForm
