import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { EventCard } from 'widgets'
import { AppState } from 'state'

const EventList: FC<any> = () => {
	const { t } = useTranslation()
	const activities = useSelector((state: AppState) => state.activities)

	return activities?.results ? (
		<div className="flex flex-col bg-[#fafafa] min-w-[500px] h-[calc(100vh-64px)] py-2 px-4 gap-y-3 overflow-y-auto">
			<div className="flex flex-col gap-y-5">
				{activities?.results?.map((activity, idx) => (
					<EventCard key={idx} activity={activity} />
				))}
			</div>
		</div>
	) : (
		<div className="flex justify-center items-center">
			<span className="text-[35px] font-semibold">{t('No events in the area')}</span>
		</div>
	)
}

export default memo(EventList)
