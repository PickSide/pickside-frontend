import React, { FC, useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import { Box, Container, Grid, Stack, useTheme, Paper } from '@mui/material'

import { ActivityToolbar, Card, FilterToolbar, Map } from 'components'

const HomePage: FC<any> = ({ ...props }) => {
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
				<Grid item xl={8} lg={8} md={8} sm={12}>
					<Map coords={{ lat: 45.508888, lng: -73.561668 }} />
				</Grid>
				<Grid
					container
					direction="column"
					wrap="nowrap"
					sx={{ overflowY: 'scroll' }}
					maxHeight={`calc(100vh - 2 * ${theme.mixins.toolbar.minHeight}px)`}
					xl={4}
					lg={4}
					md={4}
				>
					{[0, 1, 2, 3].map((x) => (
						<Grid item>
							<Card />
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default HomePage
