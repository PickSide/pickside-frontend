import { ButtonVariant, cn } from '@utils'

import { FC } from 'react'
import Spinner from '../Spinner'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	className?: string
	children?: any
	disabled?: boolean
	isLoading?: boolean
	variant?: ButtonVariant
	loadingText?: string
	type: 'button' | 'submit' | 'reset' | undefined
	size?: 'sm' | 'md' | 'lg'
}

const Button: FC<ButtonProps> = ({
	children,
	className,
	isLoading = false,
	size = 'md',
	loadingText,
	variant = 'primary',
	...rest
}) => {
	const variants = {
		primary: 'text-white bg-primary hover:bg-gray-300 disabled:bg-gray-600/60 dark:bg-white dark:text-black',
		secondary:
			'text-primary border-2 border-primary hover:bg-gray-300 disabled:text-gray-400 disabled:border-gray-200/30 disabled:bg-gray-200/60 dark:bg-white dark:text-black',
		tertiary: 'text-primary underline font-semibold bg-none dark:text-white',
		danger: 'text-white bg-red-600 hover:bg-red-400',
	}

	const sizes = {
		sm: 'btn-sm',
		md: 'btn-md',
		lg: 'btn-lg',
	}

	return (
		<button
			className={cn('btn-base', variants[variant], sizes[size], { 'cursor-not-allowed': isLoading }, className)}
			{...rest}
		>
			{isLoading ? <Spinner text={loadingText} /> : children}
		</button>
	)
}

export default Button
