import { ReactNode, forwardRef, memo, useId } from 'react'

import { ButtonVariant } from '@utils'
import { twMerge } from 'tailwind-merge'

interface ButtonProps {
	variant?: ButtonVariant
	className?: string
	icon?: ReactNode
	disabled?: boolean
	isLoading?: boolean
	tooltipText?: string
	type?: 'button' | 'reset' | 'submit'
	onClick: (e?) => void
}

const Button = (
	{ onClick, disabled = false, tooltipText, icon, variant = 'primary', type = 'button', ...rest }: ButtonProps,
	ref,
) => {
	const variants = {
		primary: 'text-primary',
		secondary: 'text-primary',
		tertiary: 'text-primary',
		danger: 'text-danger',
	}

	const id = useId()

	return (
		<div className="relative">
			<button
				type={type}
				className={twMerge('icon-btn', [rest.className, variants[variant]].join(' '))}
				disabled={disabled}
				data-tooltip-target={id}
				onClick={onClick}
				{...rest}
			>
				{icon}
			</button>
		</div>
	)
}

export default memo(forwardRef(Button))
