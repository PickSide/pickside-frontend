import { FC, useMemo } from 'react'

const Button: FC<any> = ({ isLink = false, children, ...props }) => {
	const btnClass = useMemo(() => {
		if (props.disabled) return 'btn-disabled'
		if (isLink) return 'btn-link'
		return 'btn'
	}, [isLink, props])

	return (
		<button className={btnClass} {...props}>
			{children}
		</button>
	)
}

export default Button
