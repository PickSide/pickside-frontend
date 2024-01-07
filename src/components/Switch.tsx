import { ComponentPropsWithRef, forwardRef, useCallback, useState } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@utils'

export const SwitchVariants = cva(
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
				sm: ['w-11', 'h-6'],
				md: ['w-11', 'h-6'],
				lg: ['w-11', 'h-6'],
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
		},
	},
)

export interface SwitchProps extends ComponentPropsWithRef<'label'>, VariantProps<typeof SwitchVariants> {
	label?: string
}

const Switch = forwardRef<any, SwitchProps>(
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
			<label ref={ref} className="inline-flex items-center relative cursor-pointer">
				<input className="sr-only peer" type="checkbox" checked={checked} onChange={handleChange} />
				<div className={cn(SwitchVariants({ className, size, variant }), className)} />
				{label && <span className="ml-3 text-md font-medium text-charcoal-black">{label}</span>}
			</label>
		)
	},
)

export default Switch
