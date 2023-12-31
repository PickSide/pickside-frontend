import { FC, useContext } from 'react'

import ActivityCard from './ActivityCard'
import { AppState } from '@state'
import FocusEventContext from '../context/FocusEventContext'
import SelectedActivity from './shared/SelectedActivity'
import { SidenavDispatchContext } from '@context/SidenavContext'
import { Spinner } from '@components'
import { cn } from '@utils'
import { useFetchActivities } from '@hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const EventList: FC<any> = () => {
	const sidenavDispatch = useContext(SidenavDispatchContext)
	const { focusedActivity, onFocusInActivity, onFocusOutActivity } = useContext(FocusEventContext)
	const { refetch, isLoading } = useFetchActivities()
	const { t } = useTranslation()
	const activities = useSelector((state: AppState) => state.activities)

	return activities?.results?.length ? (
		<div className="flex flex-col bg-[#fafafa] min-w-[500px] h-[calc(100vh-64px)] py-2 px-4 gap-y-3 overflow-y-scroll overflow-x-hidden">
			{activities?.results?.map((activity, idx) => (
				<ActivityCard
					className={cn(focusedActivity?.id === activity.id ? 'shadow-md' : 'hover:shadow-md')}
					key={idx}
					activity={activity}
					onClick={() =>
						sidenavDispatch({
							type: 'open',
							content: <SelectedActivity activity={activity} />,
							title: activity.title,
						})
					}
					onMouseEnter={() => onFocusInActivity(activity)}
					onMouseLeave={onFocusOutActivity}
				/>
			))}
		</div>
	) : isLoading ? (
		<div className="min-w-[500px] m-auto text-center">
			<Spinner text={t('Loading activites...')} />
		</div>
	) : (
		<div className="min-w-[500px] m-auto text-center">
			<h4 className="font-semibold">{t('No events in the area')}</h4>
			<span className="text-lg font-normal underline text-blue-700 cursor-pointer" onClick={() => refetch()}>
				{t('Refresh')}
			</span>
		</div>
	)
}

export default EventList
