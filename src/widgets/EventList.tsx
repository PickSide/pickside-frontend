import { FC, memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Box, Container, Grid, Typography, useTheme } from '@mui/material'
import { EventCard } from 'widgets'
import { AppState } from 'state'
import { useApi } from 'hooks'

interface EventListProps {
	horizontal?: boolean
}

const EventList: FC<EventListProps> = ({ horizontal = false }) => {
	const { getActivities } = useApi()
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const activities = useSelector((state: AppState) => state.activities)

	useEffect(() => {
		if (!activities) {
			dispatch<any>(getActivities())
		}
	}, [activities, dispatch, getActivities])

	return activities?.results ? (
		<Box display="flex" flexDirection="column" sx={{ overflow: 'hiddenn', overflowY: 'scroll' }}>
			{activities?.results?.map((event, idx) => (
				<Box key={idx} p={2}>
					<EventCard event={event} />
				</Box>
			))}
		</Box>
	) : (
		<Box justifyContent="center" alignContent="center">
			<Typography variant="headerSmall">{t('No events in the area')}</Typography>
		</Box>
	)
}

export default memo(EventList)
