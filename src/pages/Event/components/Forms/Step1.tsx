import { DatePicker, FormDivider, TimePicker } from 'components'

import { Controller } from 'react-hook-form'
import { GoogleAutocomplete } from 'widgets'
import { TFunction } from 'i18next'

const Step1 = ({ register, setValue, t }) => (
	<>
		<DatePicker
			placeholder="Select date"
			label="Date"
			fullWidth
			required={true}
			{...register('date')}
			onChange={(value) => setValue('date', value)}
		/>
		<FormDivider />
		<TimePicker
			placeholder="Choose time"
			label="Time"
			fullWidth
			required={true}
			{...register('time')}
			onChange={(value) => setValue('time', value)}
		/>
		<FormDivider />
		<GoogleAutocomplete
			label={t('Address')}
			onSelectPlace={(value) => setValue('address', value)}
			fullWidth
			required={true}
			{...register('address')}
		/>
	</>
)
export default Step1
