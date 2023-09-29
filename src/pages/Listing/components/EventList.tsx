import { ActivityCard, Spinner } from '@components'
import { FC, memo } from 'react'
import { useDevice, useFetchActivities } from '@hooks'

import { useTranslation } from 'react-i18next'

const EventList: FC<any> = () => {
	const { t } = useTranslation()
	const [device] = useDevice()
	const { activities, isLoading } = useFetchActivities()

	const MobileEventList = () => (
		<div className="flex bg-[#fafafa] h-full mx-auto p-2 w-full gap-y-3 overflow-x-auto">
			{activities?.data?.results?.map((activity, idx) => (
				<ActivityCard key={idx} activity={activity} />
			))}
		</div>
	)

	const DesktopEventList = () => (
		<div className="flex flex-col bg-[#fafafa] min-w-[500px] h-[calc(100vh-64px)] py-2 px-4 gap-y-3 overflow-y-auto">
			<div className="flex flex-col gap-y-5">
				{activities?.data?.results?.map((activity, idx) => (
					<ActivityCard key={idx} activity={activity} />
				))}
			</div>
		</div>
	)

	return activities?.data?.results ? (
		device !== 'desktop' ? (
			<MobileEventList />
		) : (
			<DesktopEventList />
		)
	) : isLoading ? (
		<div className="min-w-[500px] m-auto">
			<Spinner />
		</div>
	) : (
		<div className="min-w-[500px] m-auto text-center">
			<span className="text-[25px] lg:text-[35px] font-semibold">{t('No events in the area')}</span>
		</div>
	)
}

export default memo(EventList)
