import { HTMLInputTypeAttribute, ReactNode, forwardRef } from 'react'

export interface InputFieldProps extends React.HTMLProps<HTMLInputElement> {
	id?: string
	pattern?: string
	startContent?: ReactNode
	endContent?: ReactNode
	readOnly?: boolean
	error?: any
	type?: HTMLInputTypeAttribute
	fullWidth?: boolean
	defaultValue?: string
}

const InputField = (
	{
		id,
		label,
		startContent,
		endContent,
		placeholder,
		pattern,
		error,
		defaultValue,
		readOnly = false,
		fullWidth = false,
		...rest
	}: InputFieldProps,
	ref,
) => {
	return (
		<div className={`${!fullWidth ? 'max-w-[230px]' : ''} relative flex flex-col disabled:text-gray-400`}>
			<label htmlFor={id} className="text-gray-800">
				{label}
			</label>
			<div
				className={`inline-flex w-full items-center rounded-md h-[50px] bg-white ${
					!!error ? 'border-[#d2333d] text-[#d2333d]' : readOnly ? 'border-gray-100' : 'border-gray-200'
				} border-2 focus-within:border-2 focus-within:border-primary`}
			>
				{startContent && <span className="text-gray-500 w-10 flex justify-center">{startContent}</span>}

				<input
					autoComplete="off"
					disabled={readOnly}
					value={defaultValue}
					ref={ref}
					placeholder={placeholder}
					className="relative rounded-md w-[95%] h-[90%] px-2 py-2 focus-visible:outline-none disabled:bg-white disabled:cursor-not-allowed disabled:text-gray-300"
					{...rest}
				/>
				{endContent}
			</div>
			{error && (
				<label htmlFor={id} className="">
					<span className="text-[#d2333d]">{error}</span>
				</label>
			)}
		</div>
	)
}

export default forwardRef(InputField)
