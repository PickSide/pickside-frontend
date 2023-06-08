import { FC, useCallback, useEffect, forwardRef } from 'react'

interface GroupRadioProps {
	dense?: boolean
	options?: any
	label?: string
	defaultValue?: any
	onChange?: (o) => void
	getOptionDescription?: (option) => string
	getOptionDisabled: (option) => boolean
	getOptionLabel: (option) => string
}

const GroupRadio = (
	{
		dense = false,
		options = [],
		defaultValue,
		label,
		onChange,
		getOptionDescription,
		getOptionDisabled,
		getOptionLabel,
		...props
	}: GroupRadioProps | any,
	ref,
) => {
	const handleSelected = useCallback(
		(option) => {
			onChange(option)
		},
		[onChange],
	)

	return (
		<div className={`${dense ? 'mb-6' : ''}`}>
			<ul className="flex flex-col ">
				<span className="block text-sm font-medium leading-6 text-gray-900">{label}</span>
				<div className="flex space-x-4">
					{options.map((option, idx) => {
						return (
							<li key={idx}>
								<input
									defaultChecked={getOptionLabel(defaultValue) === getOptionLabel(option)}
									value={option}
									type="radio"
									disabled={getOptionDisabled && getOptionDisabled(option)}
									id={getOptionLabel(option)}
									onClick={() => handleSelected(option)}
									className="hidden peer"
									{...props}
								/>
								<label
									htmlFor={getOptionLabel(option)}
									className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 peer-disabled:bg-gray-200/80 peer-disabled:pointer-events-none transition-all ease-in duration-100"
								>
									<div className="block">
										<div className="w-full text-lg font-semibold">{getOptionLabel(option)}</div>
										<div className="w-full">{getOptionDescription(option)}</div>
									</div>
								</label>
							</li>
						)
					})}
				</div>
			</ul>
		</div>
	)
}

export default forwardRef(GroupRadio)
