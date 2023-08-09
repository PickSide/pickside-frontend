import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface TextAreaFieldProps {
	autofocus?: boolean
	defaultValue?: string
	error?: any
	fullWidth?: boolean
	id?: string
	label?: string
	onChange?: (e?) => void
	placeholder?: string
	readOnly?: boolean
	type?: string
}

const TextAreaField = (
	{
		id,
		autofocus = false,
		defaultValue,
		error,
		fullWidth = false,
		label,
		onChange,
		placeholder,
		readOnly = false,
		...rest
	}: TextAreaFieldProps | any,
	ref,
) => {
	return (
		<div className={twMerge('relative flex flex-col', fullWidth ? 'w-full' : 'w-[230px]')}>
			<label htmlFor={id} className="text-gray-800">
				{label}
			</label>
			<div
				className={twMerge(
					'inline-flex w-full items-center rounded-md bg-white border-2 focus-within:border-2 focus-within:border-primary',
					!!error ? 'border-[#d2333d] text-[#d2333d]' : readOnly ? 'border-gray-100' : 'border-gray-200',
				)}
			>
				<div className="px-2 w-full">
					<textarea
						ref={ref}
						value={defaultValue}
						onChange={onChange}
						className="relative rounded-md w-[100%] h-[90%] px-2 py-2 focus-visible:outline-none"
						{...rest}
					/>
				</div>
			</div>
		</div>
	)
}

export default forwardRef(TextAreaField)
