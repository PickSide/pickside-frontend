import { FC, memo } from 'react'

import { AppState } from 'state'
import { EventCard } from 'widgets'
import { useDevice } from 'hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const EventList: FC<any> = () => {
	const { t } = useTranslation()
	const { isMobile } = useDevice()
	const activities = useSelector((state: AppState) => state.activities)

	const MobileEventList = () => (
		<div className="flex flex-col bg-[#fafafa] mx-auto p-2 w-full h-[calc(100vh-64px)] gap-y-3 overflow-y-auto">
			<div className="flex flex-col gap-y-5">
				{activities?.results?.map((activity, idx) => (
					<EventCard key={idx} activity={activity} />
				))}
			</div>
		</div>
	)

	return activities?.results ? (
		isMobile ? (
			<MobileEventList />
		) : (
			<div className="flex flex-col bg-[#fafafa] min-w-[500px] h-[calc(100vh-64px)] py-2 px-4 gap-y-3 overflow-y-auto">
				<div className="flex flex-col gap-y-5">
					{activities?.results?.map((activity, idx) => (
						<EventCard key={idx} activity={activity} />
					))}
				</div>
			</div>
		)
	) : (
		<div className="flex flex-col justify-center items-center h-full">
			<span className="text-[25px] lg:text-[35px] font-semibold">{t('No events in the area')}</span>
		</div>
	)
}

export default memo(EventList)
