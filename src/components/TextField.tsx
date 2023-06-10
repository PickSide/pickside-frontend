import { ReactNode, useCallback, useState, useRef, useEffect, forwardRef } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

interface TextFieldProps {
	id?: string
	label?: string
	placeholder?: string
	startContent?: ReactNode
	dense?: boolean
	autofocus?: boolean
	isPassword?: boolean
	readOnly?: boolean
	error?: any
	type?: string
	defaultValue?: string
}

const TextField = (
	{
		id,
		label,
		startContent,
		placeholder,
		dense = false,
		autofocus = false,
		isPassword = false,
		error,
		type = 'text',
		defaultValue,
		readOnly = false,
		...props
	}: TextFieldProps,
	ref,
) => {
	const inputRef = useRef<any>(null)

	const [value, setValue] = useState<any>(defaultValue)
	const [onFocus, setOnFocus] = useState<boolean>(autofocus)
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const _onFocus = useCallback(() => setOnFocus(true), [])
	const _onBlur = useCallback(() => setOnFocus(false), [])
	const _onChange = useCallback((e) => setValue(e.target.value), [])
	console.log(defaultValue)
	useEffect(() => {
		inputRef.current.focus()
	}, [inputRef])

	return (
		<div className={`relative flex flex-col ${dense ? 'mb-6' : ''}`}>
			<label htmlFor={id} className="">
				<span className="text-[#82cac3]">{label}</span>
			</label>
			<div
				className={`inline-flex w-full items-center ${isPassword ? 'pr-[40px]' : ''} rounded-md h-[50px] bg-white ${
					!!error ? 'border-[#d2333d] text-[#d2333d]' : readOnly ? 'border-gray-300' : 'border-primary'
				} border-2 focus-within:border-2 focus-within:border-[#82cac3]`}
			>
				{startContent && <span className="text-[#82cac3] w-[15%] flex justify-center">{startContent}</span>}

				<div className="px-2 w-full">
					<input
						type={isPassword && !showPassword ? 'password' : type}
						autoComplete="off"
						disabled={readOnly}
						value={value}
						ref={inputRef}
						onFocus={_onFocus}
						onBlur={_onBlur}
						onChange={_onChange}
						className="relative rounded-md w-[95%] h-[90%] px-2 py-2 focus:border-primary outline-0 focus:outline-0 disabled:bg-white disabled:cursor-not-allowed disabled:text-gray-300"
						{...props}
					/>
				</div>
				{isPassword && (
					<span
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-0 text-[#82cac3] btn-icon cursor-pointer "
					>
						{showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
					</span>
				)}
			</div>
		</div>
	)
}

export default forwardRef(TextField)
