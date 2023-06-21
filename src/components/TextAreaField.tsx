import { ReactNode, useCallback, useState, useRef, useEffect, forwardRef } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

interface TextAreaFieldProps {
	id?: string
	label?: string
	placeholder?: string
	autofocus?: boolean
	error?: any
	type?: string
	fullWidth?: boolean
	readOnly?: boolean
}

const TextAreaField = (
	{
		id,
		label,
		placeholder,
		autofocus = false,
		fullWidth = false,
		error,
		readOnly = false,
		...rest
	}: TextAreaFieldProps,
	ref,
) => {
	console.log(rest)
	return (
		<div className={`relative flex flex-col ${fullWidth ? 'w-full' : 'w-[230px]'}`}>
			<label htmlFor={id} className="">
				<span className="text-gray-400">{label}</span>
			</label>
			<div
				className={`inline-flex w-full items-center rounded-md bg-white ${
					!!error ? 'border-[#d2333d] text-[#d2333d]' : readOnly ? 'border-gray-100' : 'border-gray-200'
				} border-2 focus-within:border-2 focus-within:border-primary`}
			>
				<div className="px-2 w-full">
					<textarea
						ref={ref}
						className="relative rounded-md w-[100%] h-[90%] px-2 py-2 focus-visible:outline-none"
						{...rest}
					/>
				</div>
			</div>
		</div>
	)
}

export default forwardRef(TextAreaField)
