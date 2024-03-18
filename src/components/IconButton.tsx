import { ComponentPropsWithRef, cloneElement, forwardRef, isValidElement } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { ButtonProps } from './shared/Button'
import { cn } from '@utils'

export interface IconButtonProps extends ButtonProps { }

export const iconButtonVariants = cva(
	[
		'text-inherit',
		'rounded',
		'text-base',
		'leading-none',
		'transition-all',
		'inline-flex',
		'items-center',
		'justify-center',
		'p-1',
		'hover:bg-gray-300',
		'disabled:text-cool-gray-3',
	],
	{
		variants: {
			variant: {
				primary: ['text-ocean', 'bg-none', 'dark:text-white', 'dark:hover:bg-gray-300'],
				secondary: ['text-white', 'bg-ocean', 'dark:bg-white', 'dark:text-black'],
				tertiary: ['text-ocean', 'underline', 'font-semibold', 'bg-none ', 'dark:text-white'],
				danger: ['text-white', 'bg-red-600 ', 'hover:bg-red-400'],
			},
			size: {
				sm: 'w-[22px] h-[22px]',
				md: 'w-[28px] h-[28px]',
				lg: 'w-[40px] h-[40px]',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
		},
	},
)

export interface IconButtonProps extends ComponentPropsWithRef<'button'>, VariantProps<typeof iconButtonVariants> {
	onClick?: (e) => void
	isLoading?: boolean
}
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ children, className, isLoading, size, variant, type = 'button', ...rest }: IconButtonProps, ref) => {
		if (!isValidElement(children)) {
			throw new Error('Invalid react element')
		}

		return (
			<button
				type={type}
				ref={ref}
				className={cn(iconButtonVariants({ className, size, variant }), { 'cursor-not-allowed': isLoading }, className)}
				{...rest}
			>
				{cloneElement<any>(children, { size })}
			</button>
		)
	},
)

export default IconButton

IconButton.defaultProps = {}
