import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import Spinner from '../Spinner'
import { cn } from '@utils'

export const ButtonVariants = cva(
	[
		'rounded',
		'text-base',
		'leading-none',
		'disabled:bg-cool-gray-3',
		'disabled:text-cloud',
		'disabled:pointer-events-none',
		'disabled:pointer-disabled'
	],
	{
		variants: {
			variant: {
				primary: [
					'text-white',
					'bg-ocean',
					'dark:bg-grey-600',
					'hover:bg-gray-300',
					'dark:text-white',
					'dark:hover:bg-gray-300',
				],
				secondary: [
					'text-ocean',
					'border-[1px]',
					'border-ocean',
					'hover:bg-gray-300',
					'dark:bg-white',
					'dark:text-black',
				],
				tertiary: ['text-ocean', 'underline', 'font-semibold', 'bg-none ', 'hover:text-ocean/70', 'dark:text-white'],
				danger: ['text-white', 'bg-error ', 'hover:bg-red-400'],
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

export interface ButtonProps extends ComponentPropsWithRef<'button'>, VariantProps<typeof ButtonVariants> {
	isLoading?: boolean
	loadingText?: string
	onClick?: (e?) => void
	startContent?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ children, className, isLoading = false, loadingText, variant, size, type = 'button', startContent, ...rest },
		ref,
	) => {
		return (
			<button
				type={type}
				ref={ref}
				className={cn(ButtonVariants({ className, size, variant }), { 'cursor-not-allowed': isLoading }, className)}
				{...rest}
			>
				{isLoading ? (
					<Spinner text={loadingText} />
				) : (
					<span className="flex justify-center items-center gap-x-2">
						{startContent}
						{children}
					</span>
				)}
			</button>
		)
	},
)

export default Button
