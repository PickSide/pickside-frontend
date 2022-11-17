import { FC, useState, useEffect, useCallback, useMemo } from 'react'

import { Box, IconButton, Typography } from '@mui/material'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

interface ActivityToolbarProps { }

const ActivityToolbar: FC<ActivityToolbarProps> = ({ ...props }) => {

	return (
		<Box>
			<Typography variant='h2'>This is a text</Typography>
		</Box>
	)
}

export default ActivityToolbar
