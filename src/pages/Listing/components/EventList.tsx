import { FC, memo, useContext, useEffect, useRef } from 'react'

import { ActivityCard } from '@components'
import { AppState } from '@state'
import FocusEventContext from '../context/FocusEventContext'
import { useDevice } from '@hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const EventList: FC<any> = () => {
	const { onFocusInActivity, onFocusOutActivity } = useContext(FocusEventContext)
	const [device] = useDevice()
	const parentRef = useRef<any>(null)
	const ref = useRef<any>(null)
	const { t } = useTranslation()
	const stateActivities = useSelector((state: AppState) => state.activities)

	const handleScroll = (e) => {
		console.log(e.target)
	}

	useEffect(() => {
		console.log(Math.abs(ref.current?.getBoundingClientRect().top - ref.current?.offsetTop))
		window.addEventListener('mouseenter', handleScroll)
		return () => parentRef.current?.removeEventListener('scroll', handleScroll)
	}, [ref, parentRef, stateActivities])

	const MobileEventList = () => (
		<div className="flex bg-[#fafafa] h-full mx-auto p-2 w-full gap-y-3 overflow-x-auto">
			{stateActivities?.results?.map((activity, idx) => (
				<ActivityCard
					key={idx}
					activity={activity}
					onMouseEnter={onFocusInActivity}
					onMouseLeave={onFocusOutActivity}
				/>
			))}
		</div>
	)

	const DesktopEventList = () => (
		<div
			className="flex flex-col bg-[#fafafa] min-w-[500px] h-[calc(100vh-64px)] py-2 px-4 gap-y-3 overflow-y-auto overflow-x-hidden"
			ref={parentRef}
			onScroll={handleScroll}
		>
			<div className="flex flex-col gap-y-5" ref={ref}>
				{stateActivities?.results?.map((activity, idx) => (
					<ActivityCard
						key={idx}
						activity={activity}
						onMouseEnter={onFocusInActivity}
						onMouseLeave={onFocusOutActivity}
					/>
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
