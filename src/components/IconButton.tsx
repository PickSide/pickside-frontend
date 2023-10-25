import { ComponentPropsWithRef, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { ButtonProps } from './shared/Button'
import { cn } from '@utils'

export interface IconButtonProps extends ButtonProps {}

export const iconButtonVariants = cva(['text-inherit', 'rounded', 'text-base', 'leading-none'], {
	variants: {
		variant: {
			primary: [
				'text-primary',
				'bg-none',
				'disabled:bg-cool-gray-3',
				'hover:bg-gray-300',
				'dark:bg-grey-600',
				'dark:text-white',
				'dark:hover:bg-gray-300',
			],
			secondary: [
				'text-white',
				'bg-primary',
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
			sm: ['p-1'],
			md: ['p-2'],
			lg: ['p-3'],
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'md',
	},
})

export interface IconButtonProps extends ComponentPropsWithRef<'button'>, VariantProps<typeof iconButtonVariants> {
	onClick?: (e) => void
	isLoading?: boolean
}
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ children, className, isLoading, size, variant, type = 'button', ...rest }: IconButtonProps, ref) => {
		return (
			<button
				type={type}
				ref={ref}
				className={cn(iconButtonVariants({ className, size, variant }), { 'cursor-not-allowed': isLoading }, className)}
				{...rest}
			>
				{children}
			</button>
		)
	},
)

export default IconButton

IconButton.propTypes = {}
