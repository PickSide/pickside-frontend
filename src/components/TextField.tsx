import { ReactNode, useState, forwardRef } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

interface TextFieldProps {
	id?: string
	label?: string
	placeholder?: string
	startContent?: ReactNode
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
		autofocus = false,
		isPassword = false,
		error,
		type = 'text',
		defaultValue,
		readOnly = false,
		fullWidth = false,
		...rest
	}: TextFieldProps,
	ref,
) => {
	const [showPassword, setShowPassword] = useState<boolean>(false)

	return (
		<div className={`${!fullWidth ? 'max-w-[230px]' : ''} relative flex flex-col text-gray-400`}>
			<label htmlFor={id} className="">
				<span className="text-gray-400">{label}</span>
			</label>
			<div
				className={`inline-flex w-full items-center rounded-md h-[50px] bg-white ${
					!!error ? 'border-[#d2333d] text-[#d2333d]' : readOnly ? 'border-gray-100' : 'border-gray-200'
				} border-2 focus-within:border-2 focus-within:border-primary`}
			>
				{startContent && <span className="text-gray-500 w-12 flex justify-center">{startContent}</span>}

				<input
					type={isPassword && !showPassword ? 'password' : type}
					autoComplete="off"
					disabled={readOnly}
					value={defaultValue}
					ref={ref}
					placeholder={placeholder}
					className="relative rounded-md w-[95%] h-[90%] px-2 py-2 focus-visible:outline-none disabled:bg-white disabled:cursor-not-allowed disabled:text-gray-300"
					{...rest}
				/>
				{isPassword && (
					<button
						tabIndex={-1}
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="rounded-md text-gray-500 cursor-pointer w-12 h-12 p-2 m-auto outline-none peer-hover:bg-gray-200"
					>
						{showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
					</button>
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
