import { FC, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, TextFieldV2, Toggle, Select } from 'components'
import { NUMBERS_ONLY_REGEX } from 'utils/constants'
import { useApi } from 'hooks'
import { AppState } from 'state'

interface RegisterEventFormProps {
	onClose: () => void
}

type FormData = {
	title: string
	sport: string
	organiser: string
	price: number
	levelRequired: number
	maxPlayersCapacity: number
	location: object
	isFree: boolean
}

const RegisterEventForm: FC<RegisterEventFormProps | any> = ({ onClose, ...props }) => {
	const { createActivity, getActivities } = useApi()
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const { control, handleSubmit, watch } = useForm<FormData>({
		defaultValues: {
			title: '',
			sport: 'default',
			organiser: '',
			price: 0,
			levelRequired: 1,
			maxPlayersCapacity: 10,
			isFree: false,
		},
	})

	const sports = useSelector((state: AppState) => state.sports)

	const getOptionLabel = useCallback((option) => option.description, [])
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

	return (
		<div className="p-6">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
				<Controller
					name="title"
					control={control}
					rules={{
						...baseRule,
					}}
					render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
						<TextFieldV2 autofocus label={t('Title')} placeholder={t('Enter title')} dense error={error} {...field} />
					)}
				/>
				<Controller
					name="price"
					control={control}
					rules={{
						...baseRule,
						pattern: NUMBERS_ONLY_REGEX,
					}}
					render={({ field, fieldState: { error }, formState }) => (
						<TextFieldV2 label={t('Price per person')} placeholder={t('Enter price')} dense error={error} {...field} />
					)}
				/>
				<Controller
					name="sport"
					control={control}
					rules={{
						...baseRule,
						pattern: NUMBERS_ONLY_REGEX,
					}}
					render={({ field, fieldState: { error }, formState }) => (
						<Select
							label={t('Choose sport')}
							placeholder={t('Enter sport')}
							options={sports?.results}
							getOptionLabel={getOptionLabel}
							getOptionValue={getOptionValue}
							getOptionDisabled={getOptionDisabled}
							dense
							error={error}
							{...field}
						/>
					)}
				/>
				<Controller
					name="isFree"
					control={control}
					render={({ field, fieldState: { error }, formState }) => (
						<Toggle label={t('No payment required')} dense {...field} />
					)}
				/>
				<Button
					type="submit"
					className="rounded-md bg-primary w-[300px] text-white font-semibold h-[50px] transition-all duration-75 ease-in hover:bg-secondary"
				>
					{t('Login')}
				</Button>
			</form>
		</div>
	)
}

export default RegisterEventForm
