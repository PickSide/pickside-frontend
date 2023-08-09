import { ButtonVariant, cn } from 'utils'
import React, { FC } from 'react'

import Spinner from './Spinner'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	className?: string
	children?: any
	isLoading?: boolean
	variant?: ButtonVariant
}

const Button: FC<ButtonProps | any> = ({ children, className, isLoading = false, variant = 'primary', ...rest }) => {
	const variants = {
		primary: 'text-white bg-primary hover:bg-gray-300 disabled:bg-gray-200 dark:bg-white dark:text-black',
		secondary:
			'text-primary border-2 border-primary hover:bg-gray-300 disabled:text-gray-400 disabled:border-gray-200/30 disabled:bg-gray-200/60 dark:bg-white dark:text-black',
		tertiary: 'text-primary dak:bg-none dark:text-white',
		danger: 'text-white bg-red-600 hover:bg-red-400',
	}

	return (
		<button
			className={cn('rounded px-4 py-2 font-medium', variants[variant], { 'cursor-not-allowed': isLoading }, className)}
			type="button"
			{...rest}
		>
			{isLoading ? <Spinner /> : children}
		</button>
	)
}

export default Button
