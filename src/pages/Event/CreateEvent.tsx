import { FC, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { DatePicker, Select, Stepper, GroupRadio, Map } from 'components'
import { useApi } from 'hooks'
import { AppState, Sport } from 'state'
import dayjs from 'dayjs'

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

const CreateEvent = () => {
	const { createActivity, getActivities } = useApi()
	const dispatch = useDispatch()
	const navigate = useNavigate()
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
	}
	return (
		<div className="p-8 w-[50%] m-auto bg-[#e0f2f1] h-screen">
			<div className="flex flex-col">
				<Select
					label="Choose sport"
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
				<div className="flex mb-6">
					<DatePicker value={watch('date')} {...register('date')} onChange={(date) => setValue('date', date)} />
				</div>
				<Map />
			</div>
		</div>
	)
}

export default CreateEvent
