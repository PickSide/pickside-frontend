import { ComponentPropsWithRef, forwardRef, useCallback, useState } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@utils'

export const switchVariants = cva(
	[
		'cursor-pointer',
		'rounded-full',
		'peer-checked:after:translate-x-full',
		`peer-checked:after:border-white after:content-[''] `,
		'after:absolute after:top-0.5 after:left-[2px]',
		'after:bg-white',
		'after:border-gray-300',
		'after:border',
		'after:rounded-full',
		'after:h-5',
		'after:w-5',
		'after:transition-all',
	],
	{
		variants: {
			variant: {
				primary: [
					'bg-gray-400',
					'peer-checked:bg-blue-500',
					'peer-disabled:bg-gray-200',
					'peer-disabled:cursor-not-allowed',
				],
				secondary: [
					'bg-gray-300',
					'peer-checked:bg-ocean',
					'peer-disabled:bg-gray-200',
					'peer-disabled:cursor-not-allowed',
				],
			},
			size: {
				sm: 'after:w-3 after:h-3 w-7 h-4',
				md: 'after:w-4 after:h-4 w-9 h-5',
				lg: 'after:w-5 after:h-5 w-11 h-6',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
		},
	},
)

export interface SwitchProps extends ComponentPropsWithRef<'label'>, VariantProps<typeof switchVariants> {
	label?: string
	onChange?: (e) => void
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
	({ className, size, variant, defaultChecked = false, label, onChange, ...rest }, ref) => {
		const [checked, setChecked] = useState<boolean>(defaultChecked)

		const handleChange = useCallback(
			(e) => {
				setChecked((prev) => !prev)
				onChange && onChange(e)
			},
			[onChange],
		)

		return (
			<label className="inline-flex items-center relative cursor-pointer">
				<input ref={ref} className="sr-only peer" type="checkbox" checked={checked} onChange={handleChange} />
				<div className={cn(switchVariants({ className, size, variant }), className)} />
				{label && <span className="ml-3 text-md font-medium text-charcoal-black">{label}</span>}
			</label>
		)
	},
)

export default Switch
