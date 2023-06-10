import { FC, ReactNode, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import Spinner from './Spinner'

interface ButtonProps {
	children?: ReactNode
	primary?: boolean
	secondary?: boolean
	tertiary?: boolean
	disabled?: boolean
	isLoading?: boolean
	showTooltip?: boolean
	isIcon?: boolean
	isLink?: boolean
}

const Button: FC<ButtonProps | any> = ({
	isLoading = false,
	isIcon = false,
	isLink = false,
	primary = true,
	secondary = false,
	tertiary = false,
	disabled = false,
	showTooltip = false,
	children,
	...props
}) => {
	const btnClass = useMemo(() => {
		if (disabled) return 'btn-disabled'
		if (isIcon) return 'btn-icon'
		if (isLink) return 'btn-tertiary'
		if (secondary) return 'btn-secondary'
		if (tertiary) return 'btn-tertiary'
		return 'btn-primary'
	}, [disabled, isLink, isIcon, secondary, tertiary])

	return (
		<button {...props} className={twMerge(btnClass, props.className)} disabled={disabled}>
			{isLoading ? <Spinner /> : children}
		</button>
	)
}

export default Button
