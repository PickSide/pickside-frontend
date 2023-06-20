import { ReactNode, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { ButtonVariant } from 'utils'

interface ButtonProps {
	variant?: ButtonVariant
	className?: string
	icon?: ReactNode
	disabled?: boolean
	isLoading?: boolean
	showTooltip?: boolean
	onClick: (e?) => void
}

const Button = (
	{ onClick, disabled = false, showTooltip = false, icon, variant = 'primary', ...rest }: ButtonProps,
	ref,
) => {
	const variants = {
		primary: 'text-primary',
		secondary: 'text-primary',
		tertiary: 'text-primary',
		danger: 'text-danger',
	}

	return (
		<button
			className={twMerge('icon-btn', [rest.className, variants[variant]].join(' '))}
			disabled={disabled}
			onClick={onClick}
			{...rest}
		>
			{icon}
		</button>
	)
}

export default forwardRef(Button)
