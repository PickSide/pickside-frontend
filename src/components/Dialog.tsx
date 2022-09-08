import React, { FC, cloneElement, ReactElement } from 'react'
import { Dialog as MuiDialog, DialogTitle, Breakpoint } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface DialogProps extends React.PropsWithChildren {
	size?: Breakpoint
	open?: boolean
	title?: string
	fullWidth?: boolean
	onClose?: () => void
}

const Dialog: FC<DialogProps> = ({
	size = 'md',
	open = false,
	onClose,
	children,
	fullWidth = true,
	title = null,
	...props
}) => {
	return (
		<MuiDialog
			open={open}
			fullWidth={fullWidth}
			maxWidth={size}
			onClose={() => onClose && onClose()}
			aria-labelledby="responsive-dialog-title"
			{...props}
		>
			{title && <DialogTitle>{title}</DialogTitle>}
			{cloneElement(children as ReactElement, { onClose })}
		</MuiDialog>
	)
}

export default Dialog
