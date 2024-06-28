import { Icon, IconButton, Spinner } from '@components'
import { useCallback, useRef } from 'react'

import ActivityCard from '../components/ActivityCard'
import { AppState } from '@state'
import { NavLink } from 'react-router-dom'
import { cn } from '@utils'
import { useFetchActivities } from '@hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const UpcomingEvents = () => {
	const { t } = useTranslation()
	const ref = useRef<HTMLUListElement>(null)
	const activities = useSelector((state: AppState) => state.activities)

	const { isLoading } = useFetchActivities()

	const handleScroll = useCallback((direction: 'left' | 'right') => {
		if (ref.current) {
			const { scrollLeft, clientWidth } = ref.current
			const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth

			ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
		}
	}, [])

	return (
		<section id="upcoming" className="bg-[#F4F4F4] dark:bg-charcoal-black/40">
			<div className="relative max-w-screen-xl mx-auto py-20 lg:px-20">
				<div className="flex items-center justify-between mb-10">
					<h1 className="hidden lg:block text-ocean-4">{t('Upcoming Events')}</h1>
					<h3 className="lg:hidden text-ocean-4">{t('Upcoming Events')}</h3>
					<NavLink to="/listing" className="text-sm md:text-md lg:text-lg text-blue-800 hover:text-blue-500">
						({t('See more')})
					</NavLink>
				</div>

				<IconButton
					variant="secondary"
					size="lg"
					className="hidden lg:absolute w-[60px] h-[60px] rounded-full left-0 top-1/2 -translate-y-1/2 z-10 bg-cloud text-ocean-4"
					onClick={() => handleScroll('left')}
				>
					<Icon icon="keyboard_arrow_left" />
				</IconButton>
				<IconButton
					variant="secondary"
					size="lg"
					className="hidden lg:absolute w-[60px] h-[60px] rounded-full right-0 top-1/2 -translate-y-1/2 z-10 bg-cloud text-ocean-4"
					onClick={() => handleScroll('right')}
				>
					<Icon icon="keyboard_arrow_right" />
				</IconButton>
				{isLoading && (
					<div className="flex space-x-2 p-5 justify-center items-center border">
						<Spinner text={t('Loading events...')} />
					</div>
				)}

				{!activities?.result?.length && !isLoading && (
					<div className="flex h-16 w-full border items-center justify-center">
						<p className="text-gray-500">{t('No upcoming events')}</p>
					</div>
				)}

				{!!activities?.result && !isLoading && (
					<ul ref={ref} className="relative flex overflow-scroll snap-x snap-mandatory no-scrollbar lg:px-8">
						{activities?.result?.map((activity, idx) => (
							<li key={idx} className={cn('snap-start', idx + 1 !== activities.result?.length && 'mr-5')}>
								<ActivityCard activity={activity} />
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	)
}

export default UpcomingEvents
