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
	fullWidth?: boolean
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
		fullWidth = false,
		...props
	}: TextFieldProps,
	ref,
) => {
	const [value, setValue] = useState<any>(defaultValue)
	const [onFocus, setOnFocus] = useState<boolean>(autofocus)
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const _onFocus = useCallback(() => setOnFocus(true), [])
	const _onBlur = useCallback(() => setOnFocus(false), [])
	const _onChange = useCallback((e) => setValue(e.target.value), [])

	return (
		<div className={`${!fullWidth ? 'max-w-[230px]' : ''} relative flex flex-col text-gray-400 ${dense ? 'mb-6' : ''}`}>
			<label htmlFor={id} className="">
				<span className="text-gray-400">{label}</span>
			</label>
			<div
				className={`inline-flex w-full items-center ${isPassword ? 'pr-[40px]' : ''} rounded-md h-[50px] bg-white ${
					!!error ? 'border-[#d2333d] text-[#d2333d]' : readOnly ? 'border-gray-100' : 'border-gray-200'
				} border-2 focus-within:border-2 focus-within:border-[#82cac3]`}
			>
				{startContent && <span className="text-gray-500 w-12 flex justify-center">{startContent}</span>}

				<div className="px-2 w-full">
					<input
						type={isPassword && !showPassword ? 'password' : type}
						autoComplete="off"
						disabled={readOnly}
						value={value}
						ref={ref}
						placeholder={placeholder}
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
						className="absolute right-0 text-gray-500 btn-icon cursor-pointer "
					>
						{showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
					</span>
				)}
			</div>
			{error && (
				<label htmlFor={id} className="">
					<span className="text-[#d2333d]">{error}</span>
				</label>
			)}
		</div>
	)
}

export default forwardRef(TextField)
