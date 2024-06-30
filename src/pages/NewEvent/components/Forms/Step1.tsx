import { Button, DatePicker, FormDivider, InputField, Select, TimePicker } from '@components'
import { Controller, useFormContext, useFormState } from 'react-hook-form'

import { CreateEventProps } from '@pages/NewEvent/utils/types'
import { GoogleAutocomplete } from '@components'
import StepperCTAWrapper from '../shared/StepperCTAWrapper'
import { useEffect } from 'react'
import useFetchSoccerFields from '@hooks/services/googleMaps/useFetchSoccerFields'
import { useStepper } from '@pages/NewEvent/hooks/useStepper'
import { useTranslation } from 'react-i18next'

const Step1 = () => {
	const { control, setValue } = useFormContext<CreateEventProps>()
	const { dirtyFields, errors } = useFormState({ control })
	const { refetch: fetchSoccerFields } = useFetchSoccerFields()
	const { previous, next } = useStepper()
	const { t } = useTranslation()

	useEffect(() => {
		fetchSoccerFields()
	}, [])

	return (
		<>
			<Controller
				name="date"
				control={control}
				render={({ field }) => <DatePicker {...field} fullWidth placeholder={t('Select date')} label={t('Date')} />}
			/>
			<FormDivider />

			<Controller
				name="startTime"
				control={control}
				rules={{
					required: 'Field required',
				}}
				render={({ field }) => {
					return <TimePicker {...field} fullWidth placeholder={t('Choose time')} label={t('Start time')} />
				}}
			/>
			<FormDivider />

			<Controller
				name="duration"
				control={control}
				rules={{
					required: 'Required',
					pattern: {
						value: /^(?:(?:[1-9][0-9]*h)?(?:[1-5]?[0-9]min)?)$/,
						message: t('Wrong format'),
					},
				}}
				render={({ field }) => (
					<InputField
						{...field}
						error={errors.duration?.message}
						placeholder={t('You can type 30min, 1h, 90min, 1h30min, etc')}
						label={t('Duration')}
					/>
				)}
			/>
			<FormDivider />

			<Controller
				name="address"
				control={control}
				render={({ field }) => (
					<GoogleAutocomplete
						{...field}
						fullWidth
						label={t('Address')}
						onPlaceSelected={(value: google.maps.places.PlaceResult) => {
							if (!value.geometry?.location?.lat() || !value.geometry?.location?.lng()) {
								console.error('invalid location please select another one')
								return
							}
							setValue('address', value.formatted_address)
							setValue('gmapsUrl', value.url)
							setValue('lat', value.geometry.location.lat())
							setValue('lng', value.geometry.location.lng())
						}}
						value={field.value}
					/>
				)}
			/>

			{/* <Controller
				name="address"
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						fullWidth
						label={t('Mode')}
						placeholder={t('Select mode')}
						options={fields?.data.result}
						value={fields?.data.result.find((x) => x.value === field.value)}
						getOptionLabel={(option: { value: string }) => option.value}
						onChange={(selectedOption: { value: string }) => {
							field.onChange(selectedOption.value)
						}}
					/>
				)}
			/> */}

			<StepperCTAWrapper>
				<Button variant="tertiary" type="button" disabled onClick={previous}>
					{t('Previous')}
				</Button>
				<Button type="button" onClick={next} disabled={!dirtyFields['address']}>
					{t('Continue')}
				</Button>
			</StepperCTAWrapper>
		</>
	)
}
export default Step1
