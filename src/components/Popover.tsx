import React, { FC, cloneElement, useCallback, useState } from 'react'
import { Box, ClickAwayListener, Popover as MuiPopover, PopoverProps as MuiPopoverProps } from '@mui/material'

interface PopoverProps extends Omit<MuiPopoverProps, 'open'> {
	triggerElement: JSX.Element
	onClick?: () => void
	onClose?: () => void
}

const Popover: FC<PopoverProps> = ({ children, triggerElement, onClick, onClose, ...props }) => {
	const [anchorEl, setAnchorEl] = useState<Element | null>(null)

	const handleClick = useCallback((event: React.MouseEvent<Element>) => setAnchorEl(event.currentTarget), [])
	const handleClose = useCallback(() => setAnchorEl(null), [])

	const open = Boolean(anchorEl)

	return (
		<Box component="div">
			{cloneElement(triggerElement, { onClick: onClick ?? handleClick })}
			<MuiPopover
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				onClose={onClose ?? handleClose}
				{...props}
			>
				<ClickAwayListener onClickAway={handleClose}>
					<>{children}</>
				</ClickAwayListener>
			</MuiPopover>
		</Box>
	)
}

export default Popover
