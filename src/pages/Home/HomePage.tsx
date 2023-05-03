import { FC } from 'react'
import { Box } from '@mui/material'
import { Map } from 'components'
import { ActivitySelectedSidenav, EventList } from 'widgets'

const HomePage: FC<any> = ({ ...props }) => {
	return (
		<>
			<Box
				display="flex"
				flexWrap="nowrap"
				sx={{ maxHeight: (theme) => `calc(100vh - ${theme.mixins.toolbar.minHeight}px)` }}
			>
				<Map />
				<EventList />
			</Box>
			<ActivitySelectedSidenav />
		</>
	)
}

export default HomePage
