import { forwardRef, useCallback, useState } from 'react'
import { MdAlternateEmail } from 'react-icons/md'

interface EmailFieldProps {
	id?: string
	label?: string
	placeholder?: string
	autofocus?: boolean
	readOnly?: boolean
	error?: any
	defaultValue?: string
}
const EmailField = ({ id, defaultValue, readOnly = false, error, autofocus = false, label }: EmailFieldProps, ref) => {
	const [value, setValue] = useState<any>(defaultValue)
	const [onFocus, setOnFocus] = useState<boolean>(autofocus)

	const _onFocus = useCallback(() => setOnFocus(true), [])
	const _onBlur = useCallback(() => setOnFocus(false), [])
	const _onChange = useCallback((e) => setValue(e.target.value), [])

	return (
		<div className={`max-w-[230px] relative flex flex-col`}>
			<label htmlFor={id} className="">
				<span className="text-[#82cac3]">{label}</span>
			</label>
			<div
				className={`inline-flex flex-row-reverse w-full items-center rounded-md h-[50px] bg-white ${
					!!error ? 'border-[#d2333d] text-[#d2333d]' : readOnly ? 'border-gray-300' : 'border-primary'
				} border-2 focus-within:border-2 focus-within:border-[#82cac3]`}
			>
				<span className="text-[#82cac3] mr-4 w-[15%] flex justify-center">
					<MdAlternateEmail size={20} />
				</span>

				<div className="px-2 w-full">
					<input
						type="text"
						autoComplete="off"
						value={value}
						disabled={readOnly}
						ref={ref}
						onFocus={_onFocus}
						onBlur={_onBlur}
						onChange={_onChange}
						className="relative rounded-md w-[95%] h-[90%] px-2 py-2 focus:border-primary outline-0 focus:outline-0 disabled:bg-white disabled:cursor-not-allowed disabled:text-gray-300"
					/>
				</div>
			</div>
		</div>
	)
}

export default forwardRef(EmailField)
