import { Icon, IconButton, Spinner } from '@components'
import { useCallback, useRef } from 'react'

import ActivityCard from '../components/ActivityCard'
import { AppState } from '@state'
import { NavLink } from 'react-router-dom'
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
		<section id="upcoming" className="relative w-full px-10 py-10 bg-[#F4F4F4] dark:bg-charcoal-black/40">
			<div className="w-full space-y-10">
				<div className="flex items-center justify-between">
					<h1 className="text-ocean-4">{t('Upcoming Events')}</h1>
					<NavLink to="/listing" className="text-sm md:text-md lg:text-lg text-blue-800 hover:text-blue-500">
						({t('See more')})
					</NavLink>
				</div>
			</div>
			<IconButton
				variant="secondary"
				size='lg'
				className="absolute w-[60px] h-[60px] rounded-full left-0 top-1/2 -translate-y-1/2 z-10 bg-cloud text-ocean-4"
				onClick={() => handleScroll('left')}
			>
				<Icon icon="keyboard_arrow_left" />
			</IconButton>
			<IconButton
				variant="secondary"
				size='lg'
				className="absolute w-[60px] h-[60px] rounded-full right-0 top-1/2 -translate-y-1/2 z-10 bg-cloud text-ocean-4"
				onClick={() => handleScroll('right')}
			>
				<Icon icon="keyboard_arrow_right" />
			</IconButton>
			{isLoading && (
				<div className="flex space-x-2 p-5 justify-center items-center border">
					<Spinner text={t('Loading events...')} />
				</div>
			)}

			{!activities?.results?.length && !isLoading && (
				<div className="flex h-16 w-full border items-center justify-center">
					<p className="text-gray-500">{t('No upcoming events')}</p>
				</div>
			)}

			{!!activities?.results && !isLoading && (
				<ul
					ref={ref}
					className="relative flex max-w-full overflow-scroll snap-x snap-mandatory no-scrollbar"
				>
					{activities?.results?.map((activity, idx) => (
						<li key={idx} className="snap-start">
							<ActivityCard activity={activity} />
						</li>
					))}
				</ul>
			)}
		</section>
	)
}

export default UpcomingEvents
