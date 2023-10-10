import { ButtonHTMLAttributes, forwardRef } from 'react'
import { ButtonVariant, cn } from '@utils'
import { VariantProps, cva } from 'class-variance-authority'

import Spinner from '../Spinner'

const buttonVariants = cva(['rounded', 'text-base', 'leading-none'], {
	variants: {
		variant: {
			primary: [
				'text-white',
				'bg-primary',
				'disabled:bg-cool-gray-3',
				'hover:bg-gray-300',
				'dark:bg-white',
				'dark:text-black',
			],
			secondary: [
				'text-primary',
				'border-2',
				'border-primary',
				'hover:bg-gray-300',
				'disabled:text-gray-400',
				'disabled:border-gray-200/30',
				'disabled:bg-gray-200/60',
				'dark:bg-white',
				'dark:text-black',
			],
			tertiary: ['text-primary', 'underline', 'font-semibold', 'bg-none ', 'dark:text-white'],
			danger: ['text-white', 'bg-red-600 ', 'hover:bg-red-400'],
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

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	isLoading?: boolean
	variant?: ButtonVariant
	loadingText?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, isLoading = false, loadingText, variant, size, ...rest }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(buttonVariants({ className, size, variant }), { 'cursor-not-allowed': isLoading }, className)}
				{...rest}
			>
				{isLoading ? <Spinner text={loadingText} /> : children}
			</button>
		)
	},
)

export default Button
