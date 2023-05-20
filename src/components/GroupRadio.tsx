import { FC, useCallback } from 'react'

interface GroupRadioProps {
	options?: any
	label?: string
	getOptionDescription: (option) => string
	getOptionDisabled: (option) => boolean
	getOptionLabel: (option) => string
	getOptionValue: (option) => any
}

const GroupRadio: FC<GroupRadioProps | any> = ({
	options = [],
	label,
	getOptionDescription,
	getOptionDisabled,
	getOptionLabel,
	getOptionValue,
	...props
}) => {
	const handleSelected = useCallback(
		(option) => {
			props.onChange && props.onChange(option)
		},
		[props],
	)

	return (
		<ul className="flex flex-col max-w-[400px] gap-6">
			<span className="block text-sm font-medium leading-6 text-gray-900">{label}</span>
			<div className="flex justify-between">
				{options.map((option, idx) => (
					<li key={idx}>
						<input
							type="radio"
							disabled={getOptionDisabled(option)}
							id={getOptionValue(option)}
							name="hosting"
							value={getOptionValue(option)}
							onChange={handleSelected}
							className="hidden peer"
							required
						/>
						<label
							htmlFor={getOptionValue(option)}
							className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 peer-disabled:bg-gray-200/80 peer-disabled:pointer-events-none transition-all ease-in duration-100"
						>
							<div className="block">
								<div className="w-full text-lg font-semibold">{getOptionLabel(option)}</div>
								<div className="w-full">{getOptionDescription(option)}</div>
							</div>
						</label>
					</li>
				))}
			</div>
		</ul>
	)
}

export default GroupRadio
