import { forwardRef, useId, useState } from 'react'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import { NUMBERS_ONLY_REGEX } from 'utils'

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

	const increase = () =>
		setValue((prev) => {
			console.log(typeof prev)
			if (maxValue && prev === maxValue) {
				return prev
			}
			return prev + 1
		})

	const decrease = () =>
		setValue((prev) => {
			if (prev === 0) {
				return prev
			}
			return prev - 1
		})

	const handleChange = (e) => {
		setValue(Number(e.target.value))
		onChange && onChange(e)
	}

	return (
		<div className={`${!fullWidth ? 'max-w-[230px]' : ''} relative flex flex-col justify-center text-gray-400 py-2`}>
			<label htmlFor={id} className="">
				<span className="text-gray-400">{label}</span>
			</label>
			<div
				className={`inline-flex w-full items-center rounded-md h-[50px] bg-white ${
					!!error ? 'border-[#d2333d] text-[#d2333d]' : readOnly ? 'border-gray-100' : 'border-gray-200'
				} border-2 `}
			>
				{/* <button
					type="button"
					className="rounded-md text-[20px] text-primary w-5 h-5 m-auto leading-5 disabled:text-gray-200 disabled:pointer-events-none hover:bg-gray-300"
					onClick={decrease}
					disabled={value === 0}
				>
					<IoIosRemove size={20} />
				</button> */}
				<input
					type="number"
					disabled={readOnly}
					ref={ref}
					placeholder={placeholder}
					pattern={`${NUMBERS_ONLY_REGEX}`}
					value={value}
					onFocus={onFocus}
					onChange={handleChange}
					className="relative rounded-sm w-[60%] h-[80%] m-auto px-2 py-2 text-center outline-gray-200 focus:outline-primary disabled:bg-white disabled:cursor-not-allowed disabled:text-gray-300"
					{...rest}
				/>
				{/* <button
					type="button"
					className="rounded-md text-[20px] text-primary w-5 h-5 m-auto leading-5 disabled:text-gray-200 disabled:pointer-events-none hover:bg-gray-300"
					onClick={increase}
					disabled={value === maxValue}
				>
					<IoIosAdd size={20} />
				</button> */}
			</div>
		</div>
	)
}

export default forwardRef(NumberField)
