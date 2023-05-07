import { FC, memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import { EventCard } from 'widgets'
import { AppState } from 'state'
import { useApi } from 'hooks'

interface EventListProps {
	horizontal?: boolean
}

const EventList: FC<EventListProps> = ({ horizontal = false }) => {
	const { getActivities, getPlayables } = useApi()
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const activities = useSelector((state: AppState) => state.activities)
	const playables = useSelector((state: AppState) => state.playables)

	useEffect(() => {
		if (!activities) {
			dispatch<any>(getActivities())
		}
		if (!playables) {
			dispatch<any>(getPlayables())
		}
	}, [activities, playables, dispatch, getActivities, getPlayables])

	return activities?.results ? (
		<div className="flex flex-col overflow-y-scroll min-w-[500px] h-[calc(100vh-64px)]">
			{activities?.results?.map((activity, idx) => (
				<div className="p-2" key={idx}>
					<EventCard
						id={activity.id}
						levelRequired={activity.levelRequired}
						location={playables?.results?.find((p) => p.id === activity.location)?.fieldName || ''}
						title={activity.title}
						participants={activity.participants}
						maxPlayersCapacity={activity.maxPlayersCapacity}
						numberOfRegisteredPlayers={activity.numberOfRegisteredPlayers}
					/>
				</div>
			))}
		</div>
	) : (
		<Box justifyContent="center" alignContent="center">
			<Typography variant="headerSmall">{t('No events in the area')}</Typography>
		</Box>
	)
}

export default memo(EventList)
