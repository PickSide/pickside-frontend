import { ReactNode, useCallback, useEffect, useState, useRef, forwardRef, useMemo } from 'react'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'

interface SelectProps {
	startContent?: ReactNode
	dense?: boolean
	autofocus?: boolean
	error?: any
	options?: any
	getOptionLabel?: (option) => string
	getOptionValue?: (option) => any
	getOptionDisabled?: (option) => boolean

	onChange?: (v) => void
}

const Select = (
	{
		startContent,
		dense = false,
		autofocus = false,
		error,
		options = [],
		getOptionLabel,
		getOptionValue,
		getOptionDisabled,
		...props
	}: SelectProps | any,
	ref,
) => {
	const inputRef = useRef<any>(null)

	const [value, setValue] = useState<any>('')
	const [onFocus, setOnFocus] = useState<boolean>(autofocus)

	const showOptions = useMemo(() => onFocus, [onFocus])

	const _onFocus = useCallback(() => setOnFocus(true), [])
	const _onBlur = useCallback(() => setOnFocus(false), [])
	const _onChange = useCallback((e) => setValue(e.target.value), [])

	const _onSelect = useCallback(
		(option) => {
			if (getOptionLabel) {
				setValue(getOptionLabel(option))
				props.onChange && props.onChange(option)
			}
		},
		[getOptionLabel, _onChange],
	)

	console.log(props)
	return (
		<div className={`relative flex w-fit ${dense ? 'mb-6' : ''}`}>
			<div
				className={`inline-flex items-center w-[300px] rounded-md h-[50px] bg-white ${
					!!error ? 'border-[#d2333d] text-[#d2333d]' : 'border-primary'
				} border-2 focus-within:border-2 focus-within:border-[#82cac3]`}
			>
				{startContent && <span className="text-[#82cac3] w-[15%] flex justify-center">{startContent}</span>}

				<div className="relative ps-2 pe-4 w-full flex flex-col">
					<input
						type="text"
						ref={inputRef}
						value={value}
						onFocus={_onFocus}
						onBlur={_onBlur}
						readOnly
						className="relative w-full rounded-md px-2 py-2 focus:border-primary outline-0 focus:outline-0"
					/>
					<span className="absolute right-0 text-[#82cac3] btn-icon cursor-pointer ">
						{showOptions ? <MdArrowDropUp size={20} /> : <MdArrowDropDown size={20} />}
					</span>
				</div>

				{showOptions && (
					<div className="absolute rounded-md flex flex-col z-40 bg-white top-14 w-full">
						{options?.map((option, idx) => (
							<div
								key={idx}
								className={`h-[30px] ${
									getOptionDisabled(option)
										? 'bg-slate-200 text-white cursor-not-allowed'
										: 'hover:bg-primary hover:text-white cursor-pointer'
								}`}
								onClick={() => _onSelect(option)}
							>
								<span className="px-4 font-semibold leading-7">{getOptionLabel(option)}</span>
							</div>
						))}
					</div>
				)}
				<label htmlFor={props.id} className="absolute -top-7 left-1">
					<span className="text-[#82cac3]">{props.label}</span>
				</label>
			</div>
		</div>
	)
}

export default forwardRef(Select)
