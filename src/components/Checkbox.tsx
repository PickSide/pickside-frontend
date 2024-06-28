import { ComponentPropsWithRef, forwardRef } from 'react'
import { cva } from 'class-variance-authority'

export const CheckboxVariants = cva(['rounded', 'text-base'], {
	variants: {
		variant: {
			primary: ['text-white', 'bg-ocean', 'dark:bg-grey-600', 'dark:text-white', 'dark:hover:bg-gray-300'],
		},
		size: {
			sm: ['px-2', 'py-2'],
			md: ['px-4', 'py-3'],
			lg: ['px-6', 'py-4'],
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'md',
	},
})

interface CheckboxProps extends ComponentPropsWithRef<'input'> {
	label?: string
}

const Checkbox = forwardRef<any, CheckboxProps>(({ label, size, variant, ...rest }: CheckboxProps | any, ref) => {
	return (
		<div className="relative inline-flex items-center gap-x-3">
			<input
				ref={ref}
				type="checkbox"
				autoComplete="off"
				className="relative cursor-pointer bg-gray-100 border-gray-300 rounded w-4 h-4 accent-ocean text-ocean"
				{...rest}
			/>
			<label htmlFor={rest.id}>
				<span className="text-gray-300">{label}</span>
			</label>
		</div>
	)
})

export default Checkbox
