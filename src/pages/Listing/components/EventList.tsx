import { FC, memo, useEffect } from 'react'

import { ActivityCard } from '@components'
import { AppState } from '@state'
import { useDevice } from '@hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const EventList: FC<any> = () => {
	const { t } = useTranslation()
	const [device] = useDevice()
	const stateActivities = useSelector((state: AppState) => state.activities)

	useEffect(() => console.log(window.scrollY), [window])

	const MobileEventList = () => (
		<div className="flex bg-[#fafafa] h-full mx-auto p-2 w-full gap-y-3 overflow-x-auto">
			{stateActivities?.results?.map((activity, idx) => (
				<ActivityCard key={idx} activity={activity} />
			))}
		</div>
	)

	const DesktopEventList = () => (
		<div className="flex flex-col bg-[#fafafa] min-w-[500px] h-[calc(100vh-64px)] py-2 px-4 gap-y-3 overflow-y-auto overflow-x-hidden">
			<div className="flex flex-col gap-y-5">
				{stateActivities?.results?.map((activity, idx) => (
					<ActivityCard key={idx} activity={activity} />
				))}
			</div>
		</div>
	)

	return stateActivities?.results ? (
		device !== 'desktop' ? (
			<MobileEventList />
		) : (
			<DesktopEventList />
		)
	) : (
		<div className="min-w-[500px] m-auto text-center">
			<span className="text-[25px] lg:text-[35px] font-semibold">{t('No events in the area')}</span>
		</div>
	)
}

export default memo(EventList)
