import { FC, useState, useEffect, useCallback, useMemo } from 'react'

import { Stack, IconButton, Typography } from '@mui/material'
import { Card } from 'components'

interface ActivityToolbarProps {}

const ActivityToolbar: FC<ActivityToolbarProps> = ({ ...props }) => {
	console.log(props)
	return (
		<Stack>
			{[0, 1, 2].map((x) => (
				<Card />
			))}
		</Stack>
	)
}

export default ActivityToolbar
