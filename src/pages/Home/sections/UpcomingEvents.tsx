import ActivityCard from '../components/ActivityCard'
import { AppState } from '@state'
import Carousel from '../components/Carousel'
import CarouselHandlers from '../components/CarouselHandlers'
import { CarouselProvider } from '../context/CarouselContext'
import { NavLink } from 'react-router-dom'
import { Spinner } from '@components'
import { useFetchActivities } from '@hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const UpcomingEvents = () => {
	const { t } = useTranslation()
	const activities = useSelector((state: AppState) => state.activities)

	const { isLoading } = useFetchActivities()

	return (
		<section id="upcoming-evnts" className="w-full px-10 py-10 mx-auto dark:bg-charcoal-black/40">
			<CarouselProvider items={activities?.results}>
				<div className="block space-y-10">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-x-4">
							<p className="text-lg">{t('Upcoming Events')}</p>
							<NavLink to="/listing" className="text-sm md:text-md lg:text-lg text-blue-800 hover:text-blue-500">
								({t('Explore more')})
							</NavLink>
						</div>
						<CarouselHandlers />
					</div>
					{isLoading && (
						<div className=" flex space-x-2 p-5 justify-center items-center border">
							<Spinner text={t('Loading events...')} />
						</div>
					)}

					{!activities?.results && !isLoading && (
						<div className="flex h-16 w-full border items-center justify-center">
							<p className="text-gray-500">{t('No upcoming events')}</p>
						</div>
					)}

					{!!activities?.results && !isLoading && (
						<Carousel>
							{activities?.results?.map((event, idx) => (
								<ActivityCard key={idx} activity={event} />
							))}
						</Carousel>
					)}
				</div>
			</CarouselProvider>
		</section>
	)
}

export default UpcomingEvents
