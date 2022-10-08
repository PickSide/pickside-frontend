import { FC, useState, useEffect, useCallback, useMemo } from 'react'

import { Box, IconButton } from '@mui/material'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

interface ActivityToolbarProps {}

const ActivityToolbar: FC<ActivityToolbarProps> = ({ ...props }) => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<Box
			sx={{
				width: 400,
				height: 'calc(100% - 68.5px)',
				position: 'absolute',
				right: open ? 0 : -400,
				backgroundColor: 'white',
				zIndex: 1,
				transition: 'right .5s',
			}}
		>
			<Box
				sx={{
					position: 'relative',
					width: 50,
					height: 50,
					top: 'calc(50% - 68.5px)',
					right: 30,
					borderRadius: '50%',
					backgroundColor: 'rgb(212,212,212)',
					boxShadow: '4px 2px 4px 0px rgb(176,176,176)',
				}}
			>
				<IconButton size="large" color="inherit" onClick={() => setOpen(!open)}>
					{open ? <KeyboardDoubleArrowRightIcon /> : <KeyboardDoubleArrowLeftIcon />}
				</IconButton>
			</Box>
		</Box>
	)
}

export default ActivityToolbar
