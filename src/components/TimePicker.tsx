import Select, { ControlProps, components } from 'react-select'
import { forwardRef, useId } from 'react'

import { MdAccessTime } from 'react-icons/md'
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
				<span className="ml-3">
					<MdAccessTime size={20} />
				</span>
				{children}
			</components.Control>
		)
	}

	return (
		<div className={cn('relative', fullWidth ? 'w-full' : 'max-w-[230px]')} tabIndex={0}>
			<label htmlFor={id} className="text-gray-800 leading-4">
				{rest.label}
			</label>
			<Select
				id={id}
				{...rest}
				ref={ref}
				components={{ Control }}
				closeMenuOnSelect
				tabSelectsValue
				hideSelectedOptions
				backspaceRemovesValue
				isSearchable={false}
				options={options}
				className="react-dropdown"
				classNamePrefix="dropdown"
				getOptionValue={(option: moment.Moment) => option.format('LT')}
				getOptionLabel={(option: moment.Moment) => option.format('LT')}
			/>
		</div>
	)
}

export default forwardRef(TimePicker)
