import { Activity, AppState, setSelectedActivity } from '@state'
import { Select, Spinner } from '@components'
import { useContext, useMemo } from 'react'

import ActivityCard from './ActivityCard'
import FocusEventContext from '../context/FocusEventContext'
import { cn } from '@utils'
import { useFetchActivities } from '@hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

type Sort = {
	label: string
	value: string
	target: string
	compareFn: () => number
}

interface EventListProps {
	selectedActivity?: Activity
	setSelectedActivity: any
}

const EventList = ({}: EventListProps) => {
	const { focusedActivity, onFocusInActivity, onFocusOutActivity } = useContext(FocusEventContext)
	const { refetch, isLoading } = useFetchActivities()
	const { t } = useTranslation()
	const activities = useSelector((state: AppState) => state.activities)

	const filteredActivities = useMemo(() => activities?.result?.slice(), [activities])

	const handleSort = (option: Sort) => {
		filteredActivities?.sort(option.compareFn)
	}

	return filteredActivities?.length ? (
		<div className="flex flex-col bg-[#fafafa]  h-[calc(100vh-64px)] py-2 px-4 gap-y-3 overflow-y-scroll overflow-x-hidden">
			<div className="flex items-center gap-x-2">
				<Select
					size="sm"
					placeholder={t('Sort by')}
					options={[
						{ label: t('Price'), value: 'price', target: 'price', compareFn: (a, b) => a.price - b.price },
						{
							label: t('Date posted'),
							value: 'date',
							target: 'date',
							compareFn: (a: Activity, b: Activity) => a.date > b.date,
						},
						{
							label: t('Partcipants'),
							value: 'participants',
							target: 'participants',
							compareFn: (a, b) => a.participants - b.participants,
						},
						{
							label: t('Max players'),
							value: 'maxPlayers',
							target: 'maxPlayers',
							compareFn: (a, b) => a.maxPlayers - b.maxPlayers,
						},
					]}
					onChange={handleSort}
				/>
			</div>
			{filteredActivities?.map((activity, idx) => (
				<ActivityCard
					className={cn(focusedActivity?.id === activity.id ? 'shadow-md' : 'hover:shadow-md')}
					key={idx}
					activity={activity}
					onMouseEnter={() => onFocusInActivity(activity)}
					onMouseLeave={onFocusOutActivity}
				/>
			))}
		</div>
	) : (
		<div className="min-w-[500px] m-auto text-center">
			{isLoading ? (
				<Spinner text={t('Loading activites...')} />
			) : (
				<>
					<h4 className="font-semibold text-grey-600">{t('No events in the area')}</h4>
					<span className="text-lg font-normal underline text-blue-700 cursor-pointer" onClick={() => refetch()}>
						{t('Refresh')}
					</span>
				</>
			)}
		</div>
	)
}

export default EventList
