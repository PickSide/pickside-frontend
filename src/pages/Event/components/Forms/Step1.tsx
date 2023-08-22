import { Button, DatePicker, FormDivider, TimePicker } from '@components'
import { Controller, useFormContext, useFormState } from 'react-hook-form'

import { GoogleAutocomplete } from '@widgets'
import StepperCTAWrapper from '../shared/StepperCTAWrapper'
import { useStepper } from '@pages/Event/hooks'
import { useTranslation } from 'react-i18next'

const Step1 = () => {
	const { control, register, setValue } = useFormContext<any>()
	const { dirtyFields } = useFormState({ control })
	const { previous, next } = useStepper()
	const { t } = useTranslation()

	return (
		<>
			<Controller
				name="date"
				control={control}
				render={({ field }) => <DatePicker {...field} fullWidth placeholder={t('Select date')} label={t('Date')} />}
			/>

			<FormDivider />
			<Controller
				name="time"
				control={control}
				render={({ field }) => <TimePicker {...field} fullWidth placeholder={t('Choose time')} label={t('Time')} />}
			/>
			<FormDivider />
			<GoogleAutocomplete
				fullWidth
				label={t('Address')}
				onSelectPlace={(value) => setValue('address', value)}
				{...register('address', { required: true })}
			/>
			<StepperCTAWrapper>
				<Button variant="secondary" type="button" disabled onClick={previous}>
					{t('Previous')}
				</Button>
				<Button
					type="button"
					onClick={next}
					disabled={!dirtyFields['date'] || !dirtyFields['time'] || !dirtyFields['address']}
				>
					{t('Continue')}
				</Button>
			</StepperCTAWrapper>
		</>
	)
}
export default Step1
