import { AppState, setSelectedActivity } from '@state'
import { FC, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ActivityCard } from '@components'
import FocusEventContext from '../context/FocusEventContext'
import { cn } from '@utils'
import { useTranslation } from 'react-i18next'

const EventList: FC<any> = () => {
	const { focusedActivity, onFocusInActivity, onFocusOutActivity } = useContext(FocusEventContext)
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const stateActivities = useSelector((state: AppState) => state.activities)

	return stateActivities?.results ? (
		<div className="flex flex-col bg-[#fafafa] min-w-[500px] h-[calc(100vh-64px)] py-2 px-4 gap-y-3 overflow-y-scroll overflow-x-hidden">
			{stateActivities?.results?.map((activity, idx) => (
				<ActivityCard
					className={cn(focusedActivity?.id === activity.id ? 'shadow-md' : 'hover:shadow-md')}
					key={idx}
					activity={activity}
					onClick={() => dispatch(setSelectedActivity(activity))}
					onMouseEnter={() => onFocusInActivity(activity)}
					onMouseLeave={onFocusOutActivity}
				/>
			))}
		</div>
	) : (
		<div className="min-w-[500px] m-auto text-center">
			<span className="text-[25px] lg:text-[35px] font-semibold">{t('No events in the area')}</span>
		</div>
	)
}

export default EventList
