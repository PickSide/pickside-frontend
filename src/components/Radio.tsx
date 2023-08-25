import { Children, ReactNode, cloneElement, forwardRef, useId } from 'react'

interface RadioGroupProps {
	id?: any
	children?: any
	label?: string
	display?: 'row' | 'col'
	defaultValue?: any
	name?: string
}

interface RadioProps {
	icon?: ReactNode
	name?: string
	text?: string
	value?: any
	description?: string
	defaultValue?: any
	checked?: boolean
	disabled?: boolean
}

const Radio = ({ icon, description, text, value, defaultValue, disabled = false, ...rest }: RadioProps, ref) => {
	const id = useId()

	return (
		<div>
			<input
				id={`${id}`}
				defaultChecked={defaultValue === value}
				type="radio"
				value={value}
				disabled={disabled}
				className="hidden peer"
				{...rest}
			/>
			<label
				htmlFor={id}
				className="inline-flex gap-x-3 items-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 peer-disabled:bg-gray-200/80 peer-disabled:pointer-events-none transition-all ease-in duration-100"
			>
				{icon && <div>{icon}</div>}
				<div className="block">
					<div className="w-full text-lg font-semibold">{text}</div>
					<div className="w-full">{description}</div>
				</div>
			</label>
		</div>
	)
}

export const RadioGroup = forwardRef(
	({ children, defaultValue, display = 'row', label, ...rest }: RadioGroupProps | any, ref) => (
		<div className="flex flex-col gap-y-2">
			{label && <span className="text-[20px] text-gray-400 font-semibold">{label}</span>}
			<div className={`${display === 'col' ? 'flex flex-col' : 'inline-flex'} gap-4`} {...rest}>
				{Children.map(children, (child) => cloneElement(child, { defaultValue, ...rest }))}
			</div>
		</div>
	),
)

export default forwardRef(Radio)
