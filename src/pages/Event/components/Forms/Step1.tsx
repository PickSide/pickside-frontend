import { DatePicker, FormDivider, TimePicker } from '@components'

import { GoogleAutocomplete } from '@widgets'

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
