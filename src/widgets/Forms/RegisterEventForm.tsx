import { FC, useCallback, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { DatePicker, Select, Stepper, GroupRadio, TimePicker, Map, Switch } from 'components'
import { NUMBERS_ONLY_REGEX } from 'utils'
import { useApi } from 'hooks'
import { AppState, Sport } from 'state'
import dayjs from 'dayjs'

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
	customLocation: boolean
	date: any
	mode: any
}

const RegisterEventForm: FC<RegisterEventFormProps | any> = ({ onClose, ...props }) => {
	const { createActivity, getActivities } = useApi()
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const { control, handleSubmit, getFieldState, watch, register, setValue, getValues, formState } = useForm<FormData>({
		defaultValues: {
			title: '',
			sport: {},
			price: 0,
			levelRequired: 1,
			maxPlayersCapacity: 10,
			isFree: false,
			date: dayjs(),
			mode: {},
			location: {},
			customLocation: false,
		},
	})

	const sports = useSelector((state: AppState) => state.sports)
	const playables = useSelector((state: AppState) => state.playables)

	const sportModes = watch('sport')?.modes
	const isCustomLocation = watch('customLocation')

	const onSubmit = async (values) => {
		await dispatch<any>(createActivity(values))
		await dispatch<any>(getActivities())
		onClose()
	}

	return (
		<Stepper
			steps={[
				{
					id: 'sport-select',
					title: t('Sport'),
					required: true,
					content: (
						<>
							<Select
								value={watch('sport')}
								placeholder={t('Select sport')}
								options={sports?.results}
								getOptionLabel={(option) => option.name}
								getOptionDisabled={(option) => !option.featureAvailable}
								dense
								{...register('sport')}
								onChange={(value) => setValue('sport', value)}
							/>
							<GroupRadio
								defaultValue={watch('mode')}
								options={sportModes}
								getOptionLabel={(option) => option.name}
								getOptionDescription={(option) => option.description}
								dense
								{...register('mode')}
								onChange={(mode) => setValue('mode', mode)}
							/>
							<div className="mb-6 flex gap-x-2">
								<DatePicker value={watch('date')} {...register('date')} onChange={(date) => setValue('date', date)} />
							</div>
						</>
					),
				},
				{
					id: 'venu-select',
					title: t('Location'),
					required: true,
					content: (
						<div className="flex flex-col gap-y-4">
							<Switch
								defaultChecked={getValues('customLocation')}
								label="Choose my own location"
								onChange={(e) => setValue('customLocation', e.target.checked)}
							/>
							{!isCustomLocation && (
								<Select
									value={watch('location')}
									placeholder={t('Select field')}
									options={playables?.results}
									getOptionLabel={(option) => option.fieldName}
									getOptionDisabled={(option) => !option.available}
									dense
									fullWidth
									{...register('location')}
									onChange={(location) => setValue('location', location)}
								/>
							)}
							{isCustomLocation && <Map />}
						</div>
					),
				},
				{
					id: 'configuration',
					title: t('Configuration'),
					required: true,
					content: <></>,
				},
			]}
		/>
	)
}

export default RegisterEventForm
