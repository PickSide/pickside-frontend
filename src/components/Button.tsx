import { FC, ReactNode, useMemo } from 'react'

interface ButtonProps {
	children?: ReactNode
	disabled?: boolean
	isIcon?: boolean
	isLink?: boolean
}

const Button: FC<ButtonProps | any> = ({ isIcon = false, isLink = false, children, disabled = false, ...props }) => {
	const btnClass = useMemo(() => {
		if (disabled) return 'btn-disabled'
		if (isIcon) return 'btn-icon'
		if (isLink) return 'btn-link'
		return 'btn'
	}, [disabled, isLink, isIcon])

	return (
		<button className={btnClass} disabled={disabled} {...props}>
			{children}
		</button>
	)
}

export default Button
