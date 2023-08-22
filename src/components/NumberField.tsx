import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import { forwardRef, useId, useState } from 'react'

import { NUMBERS_ONLY_REGEX } from '@utils'

interface TextFieldProps {
	label?: string
	placeholder?: string
	autofocus?: boolean
	readOnly?: boolean
	error?: any
	type?: string
	fullWidth?: boolean
	defaultValue?: number
	maxValue?: any
	onChange?: (e) => void
}

const NumberField = (
	{
		label,
		placeholder,
		autofocus = false,
		error,
		type = 'text',
		defaultValue,
		readOnly = false,
		fullWidth = false,
		maxValue,
		onChange,
		...rest
	}: TextFieldProps | any,
	ref,
) => {
	const id = useId()
	const [value, setValue] = useState<number>(0)

	const onFocus = (e) => e.target.select()

	const handleChange = (e) => {
		setValue(Number(e.target.value))
		onChange && onChange(e)
	}

	return (
		<div className={`${!fullWidth ? 'max-w-[230px]' : ''} relative flex flex-col justify-center py-2`}>
			<label htmlFor={id} className="text-gray-800">
				{label}
			</label>
			<div
				className={`inline-flex w-full items-center rounded-md h-[50px] bg-white focus-within:border-2 focus-within:border-primary ${
					!!error ? 'border-[#d2333d] text-[#d2333d]' : readOnly ? 'border-gray-100' : 'border-gray-200'
				} border-2 `}
			>
				<input
					type="number"
					disabled={readOnly}
					ref={ref}
					placeholder={placeholder}
					pattern={`${NUMBERS_ONLY_REGEX}`}
					value={value}
					onFocus={onFocus}
					onChange={handleChange}
					className="relative rounded-md w-[95%] h-[90%] px-2 py-2 focus-visible:outline-none"
					{...rest}
				/>
			</div>
		</div>
	)
}

export default forwardRef(NumberField)
