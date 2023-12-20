import { ComponentPropsWithRef, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import Spinner from '../Spinner'
import { cn } from '@utils'

export const buttonVariants = cva(
	['rounded', 'text-base', 'leading-none', 'hover:bg-gray-300', 'disabled:text-cool-gray-3'],
	{
		variants: {
			variant: {
				primary: ['text-white', 'bg-primary', 'dark:bg-grey-600', 'dark:text-white', 'dark:hover:bg-gray-300'],
				secondary: ['text-primary', 'border-[1px]', 'border-primary', 'dark:bg-white', 'dark:text-black'],
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
	},
)

export interface ButtonProps extends ComponentPropsWithRef<'button'>, VariantProps<typeof buttonVariants> {
	isLoading?: boolean
	loadingText?: string
	onClick?: (e?) => void
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, isLoading = false, loadingText, variant, size, type = 'button', ...rest }, ref) => {
		return (
			<button
				type={type}
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
