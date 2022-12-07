import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Grid, useTheme } from '@mui/material'

import { EventCard, FilterToolbar, Map } from 'components'
import { AppState } from 'state'

const HomePage: FC<any> = ({ ...props }) => {
	const sportEvents = useSelector((state: AppState) => state.sportEvents)
	const theme = useTheme()

	return (
		<Grid
			container
			direction="column"
			height="fit-content"
			wrap="nowrap"
			sx={{ maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)` }}
		>
			<Grid item>
				<FilterToolbar />
			</Grid>
			<Grid container wrap="nowrap">
				<Grid item xl={9} lg={9} md={9} sm={12}>
					<Map coords={{ lat: 45.508888, lng: -73.561668 }} />
				</Grid>
				<Grid
					item
					container
					direction="column"
					wrap="nowrap"
					maxHeight={`calc(100vh - 2 * ${theme.mixins.toolbar.minHeight}px)`}
					sx={{ overflowY: 'scroll' }}
					xl={3}
					lg={3}
					md={3}
				>
					<Container>
						{sportEvents?.results?.map((event, idx) => (
							<Grid item key={idx} marginTop={2} marginBottom={2}>
								<EventCard event={event} />
							</Grid>
						))}
					</Container>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default HomePage
