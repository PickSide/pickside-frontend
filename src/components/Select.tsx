import { ReactNode, forwardRef } from 'react'

import ReactSelect from 'react-select'

interface SelectProps {
	startContent?: ReactNode
	autofocus?: boolean
	placeholder?: string
	error?: any
	options?: any
	getOptionLabel: (option) => string
	getOptionDisabled?: (option) => boolean
	onChange?: (v) => void
	value?: any
	label?: string
	fullWidth?: boolean
}

const Select = ({ label, fullWidth = false, ...rest }: SelectProps | any, ref) => {
	return (
		<div className={`relative min-w-[200px] ${fullWidth ? 'w-full' : ''}`}>
			<label id="listbox-label" className="text-gray-800 leading-4">
				{label}
			</label>
			<ReactSelect {...rest} ref={ref} />
		</div>
	)
}

export default forwardRef(Select)
