import Button, { ButtonProps } from './shared/Button'
import { ComponentPropsWithRef, forwardRef, useId } from 'react'
import Icon, { IconName } from './shared/Icon'
import { VariantProps, cva } from 'class-variance-authority'

import PropTypes from 'prop-types'
import Spinner from './Spinner'
import { cn } from '@utils'

export interface IconButtonProps extends ButtonProps {}

export const iconButtonVariants = cva(['rounded', 'text-base', 'leading-none'], {
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

export interface IconButtonProps extends ComponentPropsWithRef<'button'>, VariantProps<typeof iconButtonVariants> {
	onClick?: (e) => void
	isLoading?: boolean
}
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ children, className, isLoading, size, variant, ...rest }: IconButtonProps, ref) => {
		const id = useId()

		return (
			<button
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
