import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Container, Grid, Typography, useTheme } from '@mui/material'

import { EventCard, Map } from 'components'
import { FilterToolbar } from 'widgets'
import { AppState } from 'state'
import { useTranslation } from 'react-i18next'

const HomePage: FC<any> = ({ ...props }) => {
	const sportEvents = useSelector((state: AppState) => state.sportEvents)
	const theme = useTheme()
	const { t } = useTranslation()

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
					xl={3}
					lg={3}
					md={3}
				>
					{!sportEvents?.results ? (
						<Grid item container direction="column" justifyContent="center" alignContent="center">
							<Typography variant="headerSmall">{t('No events in the area')}</Typography>
						</Grid>
					) : (
						<Grid item container direction="column" sx={{ overflowY: 'scroll' }}>
							<Container>
								{sportEvents?.results?.map((event, idx) => (
									<Grid item key={idx} marginTop={2} marginBottom={2}>
										<EventCard event={event} />
									</Grid>
								))}
							</Container>
						</Grid>
					)}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default HomePage
