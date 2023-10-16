import { ComponentPropsWithRef, ReactNode, forwardRef, useId } from 'react'

interface RadioProps extends ComponentPropsWithRef<'input'> {
	icon?: ReactNode
	label?: ReactNode | string
	description?: string
	onChange?: (e?) => void
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({ icon, description, label, onChange, ...rest }, ref) => {
	const id = useId()

	return (
		<div className="flex justify-between items-center">
			<label className="flex items-center gap-x-4" htmlFor={id}>
				{icon}
				<span className="text-lg text-charcoal-black">{label}</span>
			</label>
			<input
				id={id}
				type="radio"
				className="peer w-5 h-5 cursor-pointer checked:border-charcoal-black checked:text-charcoal-black"
				onChange={(e) => {
					e.stopPropagation()
					const value = e.target.value
					if (value) {
						onChange && onChange(value)
					}
				}}
				{...rest}
			/>
		</div>
	)
})

export default Radio
