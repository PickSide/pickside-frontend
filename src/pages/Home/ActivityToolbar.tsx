import { FC, useState, useEffect, useCallback, useMemo } from 'react'

import { Container, Stack, IconButton, Typography } from '@mui/material'
import { EventCard } from 'components'

interface ActivityToolbarProps {}

const ActivityToolbar: FC<ActivityToolbarProps> = ({ ...props }) => {
	console.log(props)
	return (
		<Container>
			<Stack>
				{[0, 1, 2].map((x) => (
					<EventCard />
				))}
			</Stack>
		</Container>
	)
}

export default ActivityToolbar
