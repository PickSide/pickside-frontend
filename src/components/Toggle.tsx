import { Children, ReactNode, cloneElement, forwardRef, useId } from 'react'

interface ToggleProps {
	icon?: ReactNode
	text?: string
	value?: any
	defaultValue?: any
	checked?: boolean
	disabled?: boolean
}

interface ToggleGroupProps {
	id?: any
	children?: any
	defaultValue?: any
	name: string
	onChange?: (e) => void
}

const Toggle = ({ icon, text, value, defaultValue, disabled = false, ...rest }: ToggleProps, ref) => {
	const id = useId()
	return (
		<div>
			<input
				id={`${id}`}
				defaultChecked={defaultValue === value}
				disabled={disabled}
				value={value}
				type="radio"
				className="hidden peer"
				{...rest}
			/>
			<label
				htmlFor={`${id}`}
				className="inline-flex items-center justify-between w-full p-2 text-gray-500 cursor-pointer bg-slate-100 hover:bg-gray-300/70 peer-checked:bg-primary peer-checked:text-white"
			>
				{icon && <div className="block">{icon}</div>}
				{text && <div className="block">{text}</div>}
			</label>
		</div>
	)
}
export const ToggleGroup = forwardRef(({ children, defaultValue, name, onChange }: ToggleGroupProps, ref) => (
	<div className="inline-flex rounded-lg overflow-hidden divide-x-[1px] border-[1px]" onChange={onChange}>
		{Children.map(children, (child) => cloneElement(child, { name, defaultValue }))}
	</div>
))

export default forwardRef(Toggle)
