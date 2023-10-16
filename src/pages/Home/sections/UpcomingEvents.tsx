import { Carousel, CarouselItem, Spinner } from '@components'

import ActivityCard from '../components/ActivityCard'
import { AppState } from '@state'
import { NavLink } from 'react-router-dom'
import { useFetchActivities } from '@hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const About = () => {
	const { t } = useTranslation()
	const activities = useSelector((state: AppState) => state.activities)

	const { isLoading } = useFetchActivities()

	return (
		<section id="upcoming-evnts" className="w-[90%] px-20 py-10 mx-auto">
			<div className="block space-y-10">
				<div className="flex items-center gap-x-4">
					<h4>{t('Upcoming Events')}</h4>
					<NavLink to="listing" className="text-[20px] text-blue-800 hover:text-blue-500">
						({t('Explore more')})
					</NavLink>
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
							<CarouselItem key={idx}>
								<ActivityCard activity={event} />
							</CarouselItem>
						))}
					</Carousel>
				)}
			</div>
		</section>
	)
}

export default About
