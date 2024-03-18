import { ControlProps, components } from 'react-select'
import { forwardRef, useId } from 'react'

import Icon from './shared/Icon'
import Select from './shared/Select'
import { cn } from '@utils'
import moment from 'moment'
import { times } from 'lodash'

const TimePicker = ({ fullWidth = false, ...rest }, ref) => {
	const id = useId()

	const options = times(24, (hour) => [
		moment().startOf('hour').hour(hour),
		moment().startOf('hour').hour(hour).add(30, 'minutes'),
	]).flat(Infinity)

	const Control = ({ children, ...props }: ControlProps<any>) => {
		return (
			<components.Control {...props}>
				<Icon className="ml-3" icon="schedule" size="sm" />
				{children}
			</components.Control>
		)
	}

	return (
		<div className={cn('relative', fullWidth ? 'w-full' : 'max-w-[230px]')} tabIndex={0}>
			<Select
				id={id}
				ref={ref}
				components={{ Control }}
				closeMenuOnSelect
				tabSelectsValue
				backspaceRemovesValue
				isSearchable={false}
				options={options}
				getOptionValue={(option: moment.Moment) => option.format('LT')}
				getOptionLabel={(option: moment.Moment) => option.format('LT')}
				{...rest}
			/>
		</div>
	)
}

export default forwardRef(TimePicker)
