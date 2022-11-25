import React, { FC, cloneElement, useCallback, useState } from 'react'
import { Box, Popover as MuiPopover, PopoverProps as MuiPopoverProps } from '@mui/material'

interface PopoverProps extends Omit<MuiPopoverProps, 'open'> {
	triggerElement: JSX.Element
}

const Popover: FC<PopoverProps> = ({ children, triggerElement, ...props }) => {
	const [anchorEl, setAnchorEl] = useState<Element | null>(null)

	const handleClick = useCallback((event: React.MouseEvent<Element>) => setAnchorEl(event.currentTarget), [props])
	const handleClose = useCallback(() => setAnchorEl(null), [props])

	const open = Boolean(anchorEl)

	return (
		<Box component="div">
			{cloneElement(triggerElement, { onClick: handleClick })}
			<MuiPopover
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'center',
					horizontal: 'left',
				}}
				onClose={handleClose}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				{...props}
			>
				{children}
			</MuiPopover>
		</Box>
	)
}

export default Popover
