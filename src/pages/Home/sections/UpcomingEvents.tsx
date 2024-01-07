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
		<section id="upcoming" className="w-full px-10 py-10 dark:bg-charcoal-black/40">
			<div className="w-full block space-y-10">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-x-4">
						<p className="text-lg">{t('Upcoming Events')}</p>
						<NavLink to="/listing" className="text-sm md:text-md lg:text-lg text-blue-800 hover:text-blue-500">
							({t('Explore more')})
						</NavLink>
					</div>
					<div className="flex items-center gap-x-2">
						<IconButton variant="secondary" size="sm" className="rounded-l-[28px]" onClick={() => handleScroll('left')}>
							<Icon icon="keyboard_arrow_left" />
						</IconButton>
						<IconButton
							variant="secondary"
							size="sm"
							className="rounded-r-[28px]"
							onClick={() => handleScroll('right')}
						>
							<Icon icon="keyboard_arrow_right" />
						</IconButton>
					</div>
				</div>
				{isLoading && (
					<div className=" flex space-x-2 p-5 justify-center items-center border">
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
						className="relative flex max-w-[50%] lg:max-w-[70%] mx-auto overflow-scroll snap-x snap-mandatory no-scrollbar"
					>
						{activities?.results?.map((activity, idx) => (
							<li key={idx} className="snap-start">
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
