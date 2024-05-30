import { ControlProps, components } from 'react-select'
import { forwardRef, useId, useState } from 'react'

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

	const [amPm, setAmPm] = useState(
		amPmOpts.find((x) => x.value === value.format('LT').split(' ')[1].toLowerCase()) || amPmOpts[0],
	)

	const handleAmPmChange = (amPm) => {
		setAmPm(amPm)
		onChange && onChange(value.add(12, 'hours'))
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
					onChange={onChange}
					getOptionValue={(option: moment.Moment) => option.format('hh:mm')}
					getOptionLabel={(option: moment.Moment) => option.format('hh:mm')}
					label={t('Time')}
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
