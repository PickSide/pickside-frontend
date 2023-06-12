import { ReactNode, forwardRef, useCallback, useState, useId } from 'react'

interface Option {
	icon?: ReactNode
	name?: string
	text?: string
	defaultChecked?: boolean
	checked?: boolean
	disabled?: boolean
}

interface ToggleGroupProps {
	id?: any
	options: Option[]
	multiple?: boolean
	onChange?: (o) => void
	value?: any
}

const ToggleGroup = ({ multiple = false, onChange, options, value }: ToggleGroupProps, ref) => {
	const id = useId()
	const [selected, setSelected] = useState<number>(options.findIndex((x) => x.defaultChecked))

	const handleClick = (idx) => {
		setSelected(idx)
	}
	const handleChange = (idx) => {
		onChange && onChange(options[idx])
	}

	return (
		<ul className="inline-flex rounded-lg overflow-hidden divide-x-[1px] border-[1px]">
			{options.map(({ icon, name, text, disabled = false }, idx) => (
				<li key={idx}>
					<input
						id={`${id}-${idx}`}
						disabled={disabled}
						value={idx}
						name={name}
						checked={selected === idx}
						type="radio"
						onClick={() => handleClick(idx)}
						onChange={() => handleChange(idx)}
						className="hidden peer"
					/>
					<label
						htmlFor={`${id}-${idx}`}
						className="inline-flex items-center justify-between w-full p-2 text-gray-500 cursor-pointer bg-slate-100 hover:bg-gray-300/70 peer-checked:bg-primary peer-checked:text-white"
					>
						{icon && <div className="block">{icon}</div>}
						{text && <div className="block">{text}</div>}
					</label>
				</li>
			))}
		</ul>
	)
}

export default forwardRef(ToggleGroup)
