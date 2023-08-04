import { DatePicker, FormDivider, TimePicker } from 'components'

import { Controller } from 'react-hook-form'
import { GoogleAutocomplete } from 'widgets'
import React from 'react'
import { TFunction } from 'i18next'

interface FormProps {
	form: any
	t: TFunction
}

const Step1 = ({ form, t }: FormProps) => (
	<div className="flex flex-col">
		<Controller
			name="date"
			control={form.control}
			render={({ field }) => (
				<DatePicker
					onChange={(value) => form.setValue('date', value)}
					placeholder="Select date"
					label="Date"
					fullWidth
				/>
			)}
		/>
		<FormDivider />
		<Controller
			name="time"
			control={form.control}
			render={({ field }) => (
				<TimePicker
					onChange={(value) => form.setValue('time', value)}
					placeholder="Choose time"
					label="Time"
					fullWidth
				/>
			)}
		/>
		<FormDivider />
		<Controller
			name="address"
			control={form.control}
			render={({ field }) => (
				<GoogleAutocomplete label={t('Address')} onSelectPlace={(value) => form.setValue('address', value)} fullWidth />
			)}
		/>
	</div>
)

export default Step1
