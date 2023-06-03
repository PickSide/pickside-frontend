import { ReactNode, useCallback, useState, forwardRef } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { motion } from 'framer-motion'

interface SelectProps {
	startContent?: ReactNode
	dense?: boolean
	autofocus?: boolean
	placeholder?: string
	error?: any
	options?: any
	getOptionLabel: (option) => string
	getOptionDisabled?: (option) => boolean
	onChange?: (v) => void
	value?: any
	label?: string
}

const Select = (
	{
		startContent,
		dense = false,
		autofocus = false,
		error,
		options = [],
		getOptionLabel,
		getOptionDisabled,
		placeholder,
		onChange,
		value,
		label,
		...props
	}: SelectProps,
	ref,
) => {
	const [selected, setSelected] = useState<any>(value)
	const [open, setOpen] = useState<boolean>(false)

	const handleClose = () => setOpen(false)
	const handleOpen = () => setOpen(true)

	const handleSelected = useCallback(
		(option) => {
			setSelected(option)
			onChange && onChange(option)
			setOpen(false)
		},
		[onChange],
	)

	return (
		<div className={`${dense ? 'mb-6' : ''}`}>
			<label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">
				{label}
			</label>
			<div className="relative mt-2" onBlur={handleClose}>
				<button
					tabIndex={0}
					type="button"
					className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
					onFocus={handleOpen}
					aria-haspopup="listbox"
					aria-expanded="true"
					aria-labelledby="listbox-label"
					{...props}
				>
					{!getOptionLabel(selected) ? (
						<span className="flex items-center">
							<span className="block truncate italic text-gray-500">{placeholder}</span>
						</span>
					) : (
						<span className="flex items-center">
							<span className="block truncate">{getOptionLabel(selected)}</span>
						</span>
					)}
					<motion.span
						animate={{
							rotate: open ? 180 : 0,
							translateX: open ? -10 : 0,
						}}
						transition={{
							duration: 0.1,
						}}
						className="absolute inset-y-0 right-0 ml-3 flex items-center pr-2 "
					>
						<RiArrowDropDownLine size={25} />
					</motion.span>
				</button>

				{open && (
					<ul
						className="absolute mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
						role="listbox"
						aria-labelledby="listbox-label"
						aria-activedescendant="listbox-option-3"
						tabIndex={-1}
					>
						{options.map((option, idx) =>
							getOptionDisabled && getOptionDisabled(option) ? (
								<li
									key={idx}
									className="text-gray-300 relative pointer-events-none cursor-not-allowed select-none py-2 pl-3 pr-9 bg-slate-50"
									id="listbox-option-0"
									role="option"
									aria-selected
								>
									<div className="flex items-center">
										<span className="font-normal ml-3 block truncate">{getOptionLabel(option)}</span>
									</div>
								</li>
							) : (
								<li
									key={idx}
									className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-indigo-600/50 hover:text-white"
									id="listbox-option-0"
									role="option"
									onMouseDown={() => handleSelected(option)}
									aria-selected
								>
									<div className="flex items-center">
										<span className="font-normal ml-3 block truncate">{getOptionLabel(option)}</span>
									</div>

									{option === selected && (
										<span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
											<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
												<path
													fillRule="evenodd"
													d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
													clipRule="evenodd"
												/>
											</svg>
										</span>
									)}
								</li>
							),
						)}
					</ul>
				)}
			</div>
		</div>
	)
}

export default forwardRef(Select)
