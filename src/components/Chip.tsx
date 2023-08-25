import { Children, ReactNode, cloneElement, forwardRef, useId } from 'react'

import { twMerge } from 'tailwind-merge'

interface ChipProps {
	icon?: ReactNode
	name?: string
	text?: string
	value?: any
	defaultValue?: any
	checked?: boolean
	disabled?: boolean
	readonly isCheckbox?: boolean
	closable?: boolean
	chipColor?: 'primary' | 'secondary' | 'tertiary' | 'blue' | 'purple' | 'green' | 'red'
}

interface ChipGroupProps {
	id?: any
	children?: any
	label?: string
	defaultValue?: any
	name?: string
	multiple?: boolean
}

const chipClasses = {
	primary:
		'bg-gray-300 text-primary border-primary hover:bg-primary hover:text-white peer-checked:bg-primary peer-checked:text-white',
	secondary:
		'text-secondary border-secondary hover:bg-secondary hover:text-white peer-checked:bg-secondary peer-checked:text-white',
	tertiary:
		'text-tertiary border-tertiary hover:bg-tertiary hover:text-white peer-checked:bg-tertiary peer-checked:text-white',
	blue: 'text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white peer-checked:bg-blue-400 peer-checked:text-white',
	purple:
		'text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white peer-checked:bg-purple-400 peer-checked:text-white',
	green:
		'text-green-400 border-green-400 hover:bg-green-400 hover:text-white peer-checked:bg-green-400 peer-checked:text-white',
	red: 'text-red-400 border-red-400 hover:bg-red-400 hover:text-white peer-checked:bg-red-400 peer-checked:text-white',
}

const Chip = (
	{ chipColor = 'primary', icon, text, value, defaultValue, disabled = false, isCheckbox = false, ...rest }: ChipProps,
	ref,
) => {
	const id = useId()

	return (
		<div className={twMerge(`min-w-[70px] text-sm`)}>
			<input
				id={id}
				defaultChecked={defaultValue === value}
				type="radio"
				value={value}
				disabled={disabled}
				className="hidden peer"
				{...rest}
			/>
			<label
				htmlFor={id}
				className={twMerge(
					`inline-flex justify-center border-2 rounded-full items-center p-2 gap-x-1 w-full h-full border-none cursor-pointer ease-linear transition-all duration-75
					md:p-3`,
					chipClasses[chipColor],
				)}
			>
				{icon}
				{text}
			</label>
		</div>
	)
}

export const ChipGroup = forwardRef(({ children, defaultValue, label, ...rest }: ChipGroupProps | any, ref) => (
	<div className="flex flex-col flex-wrap gap-y-2">
		{label && <span className="text-gray-400">{label}</span>}
		<div className="inline-flex gap-x-4">
			{Children.map(children, (child) => cloneElement(child, { defaultValue, ...rest }))}
		</div>
	</div>
))

export default forwardRef(Chip)
