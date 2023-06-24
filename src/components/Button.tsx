import { ReactNode, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import Spinner from './Spinner'
import { ButtonVariant } from 'utils'

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
		primary: 'text-white bg-primary hover:bg-gray-300 disabled:bg-gray-100/60 dark:bg-white dark:text-black',
		secondary: 'text-primary',
		tertiary: 'text-primary dak:bg-none dark:text-white',
		danger: 'text-danger bg-danger hover:bg-red-400',
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
