import { FC, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Container, Grid, Typography, useTheme } from '@mui/material'
import { EventCard } from 'components'
import { AppState } from 'state'

interface EventListProps {
	horizontal?: boolean
}

const EventList: FC<EventListProps> = ({ horizontal = false }) => {
	const { t } = useTranslation()
	const events = useSelector((state: AppState) => state.sportEvents)
	const theme = useTheme()

	return events?.results ? (
		<Container>
			<Grid
				container
				direction={horizontal ? 'row' : 'column'}
				wrap="nowrap"
				maxHeight={`calc(100vh - 2 * ${theme.mixins.toolbar.minHeight}px)`}
				sx={{ overflowY: 'scroll' }}
			>
				{events?.results?.map((event, idx) => (
					<Grid item key={idx} marginTop={2} marginBottom={2}>
						<EventCard event={event} />
					</Grid>
				))}
			</Grid>
		</Container>
	) : (
		<Container>
			<Typography variant="headerSmall">{t('No events in the area')}</Typography>
		</Container>
	)
}

export default memo(EventList)
