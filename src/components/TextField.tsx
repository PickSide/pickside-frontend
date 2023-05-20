import { ReactNode, useCallback, useState, useRef, useEffect, forwardRef } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

interface TextFieldProps {
	startContent?: ReactNode
	dense?: boolean
	autofocus?: boolean
	isPassword?: boolean
	error?: any
	type?: string
}

const TextField = (
	{
		startContent,
		dense = false,
		autofocus = false,
		isPassword = false,
		error,
		type = 'text',
		...props
	}: TextFieldProps | any,
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
		<div className={`relative flex ${dense ? 'mb-6' : ''}`}>
			<div
				className={`inline-flex w-full items-center ${isPassword ? 'pr-[40px]' : ''} rounded-md h-[50px] bg-white ${
					!!error ? 'border-[#d2333d] text-[#d2333d]' : 'border-primary'
				} border-2 focus-within:border-2 focus-within:border-[#82cac3]`}
			>
				{startContent && <span className="text-[#82cac3] w-[15%] flex justify-center">{startContent}</span>}

				<div className="px-2 w-full">
					<input
						type={isPassword && !showPassword ? 'password' : type}
						autoComplete="off"
						value={value}
						ref={inputRef}
						onFocus={_onFocus}
						onBlur={_onBlur}
						onChange={_onChange}
						className="relative rounded-md w-[95%] h-[90%] px-2 py-2 focus:border-primary outline-0 focus:outline-0"
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
				<label htmlFor={props.id} className="absolute -top-7 left-1">
					<span className="text-[#82cac3]">{props.label}</span>
				</label>
			</div>
		</div>
	)
}

export default forwardRef(TextField)
