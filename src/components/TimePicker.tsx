import { ControlProps, components } from 'react-select'
import { forwardRef, useEffect, useId, useState } from 'react'

import Icon from './shared/Icon'
import Select from './shared/Select'
import { cn } from '@utils'
import moment from 'moment'
import { times } from 'lodash'
import { useTranslation } from 'react-i18next'

const TimePicker = ({ fullWidth = false, onChange, label, value, ...rest }, ref) => {
	const id = useId()
	const { t } = useTranslation()

	const options = times(12, (hour) => [
		moment().startOf('hour').hour(hour),
		moment().startOf('hour').hour(hour).add(30, 'minutes'),
	]).flat(Infinity)

	const amPmOpts = [
		{ label: 'AM', value: 'am' },
		{ label: 'PM', value: 'pm' },
	]

	const Control = ({ children, ...props }: ControlProps<any>) => {
		return (
			<components.Control {...props}>
				<Icon className="ml-3" icon="schedule" size="sm" />
				{children}
			</components.Control>
		)
	}

	const [amPm, setAmPm] = useState(amPmOpts.find((x) => x.value === value.format('A').toLowerCase()) || amPmOpts[0])

	useEffect(() => {
		setAmPm(amPmOpts.find((x) => x.value === value.format('A').toLowerCase()) || amPmOpts[0])
	}, [value])

	const handleAmPmChange = (selectedAmPm) => {
		if (selectedAmPm.value !== amPm.value) {
			setAmPm(selectedAmPm)
			const newValue = value.clone()
			if (selectedAmPm.value === 'am' && value.hour() >= 12) {
				newValue.subtract(12, 'hours')
			} else if (selectedAmPm.value === 'pm' && value.hour() < 12) {
				newValue.add(12, 'hours')
			}
			onChange && onChange(newValue)
		}
	}

	const handleTimeChange = (selectedTime) => {
		const newTime = selectedTime.clone().set({
			year: value.year(),
			month: value.month(),
			date: value.date(),
		})

		if (amPm.value === 'pm' && newTime.hour() < 12) {
			newTime.add(12, 'hours')
		} else if (amPm.value === 'am' && newTime.hour() >= 12) {
			newTime.subtract(12, 'hours')
		}

		onChange && onChange(newTime)
	}

	return (
		<div className={cn('flex items-end gap-x-4', rest.className)} tabIndex={0}>
			<div className={cn('flex-grow-2', rest.className)}>
				<Select
					id={id}
					ref={ref}
					value={value}
					components={{ Control }}
					closeMenuOnSelect
					tabSelectsValue
					backspaceRemovesValue
					isSearchable={false}
					options={options}
					onChange={handleTimeChange}
					getOptionValue={(option: moment.Moment) => option.format('hh:mm')}
					getOptionLabel={(option: moment.Moment) => option.format('hh:mm')}
					label={label || t('Time')}
					{...rest}
				/>
			</div>
			<Select
				id={id}
				ref={ref}
				value={amPm}
				closeMenuOnSelect
				tabSelectsValue
				backspaceRemovesValue
				isSearchable={false}
				onChange={handleAmPmChange}
				options={amPmOpts}
			/>
		</div>
	)
}

export default forwardRef(TimePicker)
