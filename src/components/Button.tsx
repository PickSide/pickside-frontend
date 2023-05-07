import { FC } from 'react'
import { Button as MuiButton, ButtonProps } from '@mui/material'

const Button: FC<ButtonProps> = ({ children, ...props }) => {
	const btnDisabledClass = 'btn-disabled'
	const btnActiveClass = 'btn'

	return (
		<MuiButton {...props} className={props.disabled ? btnDisabledClass : btnActiveClass}>
			{children}
		</MuiButton>
	)
}

export default Button
