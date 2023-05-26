import { FC, useCallback, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { DatePicker, Select, Stepper, GroupRadio } from 'components'
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
		},
	})

	const sports = useSelector((state: AppState) => state.sports)
	const sportModes = watch('sport')?.modes

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
					title: t('Select your sport'),
					required: true,
					content: (
						<>
							<Select
								value={watch('sport')}
								placeholder={t('Enter sport')}
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
							{!!sportModes && (
								<DatePicker value={watch('date')} {...register('date')} onChange={(date) => setValue('date', date)} />
							)}
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
	)
}

export default RegisterEventForm
