import { FC } from 'react'
import { Grid } from '@mui/material'
import { Map } from 'components'
import { EventList } from 'widgets'

const HomePage: FC<any> = ({ ...props }) => {
	return (
		<Grid
			container
			direction="column"
			wrap="nowrap"
			sx={{ maxHeight: (theme) => `calc(100vh - ${theme.mixins.toolbar.minHeight}px)` }}
		>
			<Grid container wrap="nowrap">
				<Grid item xs={8}>
					<Map coords={{ lat: 45.508888, lng: -73.561668 }} />
				</Grid>
				<Grid item xs={4}>
					<EventList />
				</Grid>
			</Grid>
		</Grid>
	)
}

export default HomePage
