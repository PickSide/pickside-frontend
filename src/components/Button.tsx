import { ReactNode, forwardRef } from 'react'

import { ButtonVariant } from 'utils'
import Spinner from './Spinner'
import { twMerge } from 'tailwind-merge'

interface ButtonProps {
	variant?: ButtonVariant
	text?: ReactNode
	disabled?: boolean
	isLoading?: boolean
	showTooltip?: boolean
	onClick?: (e?) => void
	className?: string
	type?: 'button' | 'reset' | 'submit'
}

const Button = (
	{
		className,
		onClick,
		isLoading = false,
		disabled = false,
		showTooltip = false,
		text,
		variant = 'primary',
		type = 'button',
		...rest
	}: ButtonProps,
	ref,
) => {
	const variants = {
		primary: 'text-white bg-primary hover:bg-gray-300 disabled:bg-gray-300/60 dark:bg-white dark:text-black',
		secondary:
			'text-primary border-2 border-primary hover:bg-gray-300 disabled:bg-gray-300/60 dark:bg-white dark:text-black',
		tertiary: 'text-primary dak:bg-none dark:text-white',
		danger: 'text-white bg-red-600 hover:bg-red-400',
	}

	return (
		<button
			className={twMerge('btn-base', [className, variants[variant]].join(' '))}
			disabled={disabled}
			onClick={onClick}
			{...rest}
		>
			{isLoading ? <Spinner /> : text}
		</button>
	)
}

export default forwardRef(Button)
