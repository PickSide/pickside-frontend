import { ReactNode, useCallback, useState, useRef, useEffect, forwardRef } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

interface TextAreaFieldProps {
	id?: string
	label?: string
	placeholder?: string
	dense?: boolean
	autofocus?: boolean
	error?: any
	type?: string
}

const TextAreaField = (
	{ id, label, placeholder, dense = false, autofocus = false, error, ...props }: TextAreaFieldProps,
	ref,
) => {
	const inputRef = useRef<any>(null)

	const [value, setValue] = useState<any>()
	const [onFocus, setOnFocus] = useState<boolean>(autofocus)
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const _onFocus = useCallback(() => setOnFocus(true), [])
	const _onBlur = useCallback(() => setOnFocus(false), [])
	const _onChange = useCallback((e) => setValue(e.target.value), [])

	useEffect(() => {
		inputRef.current.focus()
	}, [inputRef])

	return (
		<div className={`relative flex flex-col ${dense ? 'mb-6' : ''}`}>
			<label htmlFor={id} className="">
				<span className="text-[#82cac3]">{label}</span>
			</label>
			<div
				className={`inline-flex w-full items-center rounded-md bg-white ${
					!!error ? 'border-[#d2333d] text-[#d2333d]' : 'border-primary'
				} border-2 focus-within:border-2 focus-within:border-[#82cac3]`}
			>
				<div className="px-2 w-full">
					<textarea
						value={value}
						ref={inputRef}
						onFocus={_onFocus}
						onBlur={_onBlur}
						onChange={_onChange}
						className="relative rounded-md w-[100%] h-[90%] px-2 py-2 focus:border-primary outline-0 focus:outline-0"
						{...props}
					/>
				</div>
			</div>
		</div>
	)
}

export default forwardRef(TextAreaField)
