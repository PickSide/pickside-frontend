import { Activity, AppState } from 'state'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { EventCard } from 'widgets'
import { NavLink } from 'react-router-dom'
import { Spinner } from 'components'
import friendship from '../../../assets/friendship.png'
import onTime from '../../../assets/on-time.png'
import { times } from 'lodash'
import touchscreen from '../../../assets/touchscreen.png'
import { useApi } from 'hooks'
import { useAsync } from 'react-use'
import { useTranslation } from 'react-i18next'

const MAX_CAROUSEL_LENGTH = 3

const About = () => {
	const { getActivities } = useApi()
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const activities = useSelector((state: AppState) => state.activities)

	const { loading } = useAsync(async () => {
		dispatch<any>(getActivities)
	}, [])

	const [slidingWindow, setSlidingWindow] = useState<number[]>(times(MAX_CAROUSEL_LENGTH, Number))
	const [upcomingEvents, setUpcomingEvents] = useState<Activity[]>([])

	useEffect(() => {
		if (slidingWindow && !!activities && !!activities.results) {
			setUpcomingEvents(Array.from(slidingWindow, (value) => activities.results![value]))
		}
	}, [activities, slidingWindow])

	const goLeft = () => {
		if (slidingWindow && !!activities && !!activities.results) {
			const eventsLength = activities.results.length
			const newSlidingWindow: number[] = []

			slidingWindow.forEach((value) => {
				if (value === 0) {
					newSlidingWindow.push(eventsLength - 1)
				} else {
					newSlidingWindow.push(value - 1)
				}
			})

			setSlidingWindow([...newSlidingWindow])
		}
	}
	const goRight = () => {
		if (slidingWindow && !!activities && !!activities.results) {
			const eventsLength = activities.results.length
			const newSlidingWindow: number[] = []

			slidingWindow.forEach((value) => {
				if (value === eventsLength - 1) {
					newSlidingWindow.push(0)
				} else {
					newSlidingWindow.push(value + 1)
				}
			})

			setSlidingWindow([...newSlidingWindow])
		}
	}

	const Carousel = () => (
		<div className="h-[500px] flex z-10">
			<div className="relative w-full h-full overflow">
				{/* CONTENT */}
				<div className={`absolute w-full h-full flex`}>
					{upcomingEvents?.map((event, idx) => (
						<EventCard key={idx} activity={event} />
					))}
				</div>
				{/* LEFT BUTTON */}
				<div className="absolute -left-16 top-1/2 -translate-y-1/4 z-50">
					<div
						className="flex justify-center items-center w-8 h-8 rounded-full drop-shadow-md text-primary text-[20px] bg-white cursor-pointer hover:drop-shadow-lg hover:bg-gray-50"
						onClick={goLeft}
					>
						<MdOutlineKeyboardArrowLeft size={25} />
					</div>
				</div>
				{/* RIGHT BUTTON */}
				<div className="absolute -right-16 top-1/2 -translate-y-1/4 z-50">
					<div
						className="flex justify-center items-center w-8 h-8 rounded-full drop-shadow-md text-primary text-[20px] bg-white cursor-pointer hover:drop-shadow-lg hover:bg-gray-50"
						onClick={goRight}
					>
						<MdOutlineKeyboardArrowRight size={25} />
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<section id="about" className="w-[90%] px-20 py-10 mx-auto">
			<div className="flex flex-col space-y-10">
				<div className="flex justify-between">
					<p className="text-[30px]">{t('Upcoming Events')}</p>
					<NavLink to="listing" className="text-[20px] text-blue-800 hover:text-blue-500">
						{t('Explore more Events')}
					</NavLink>
				</div>

				{!activities?.results && !loading && (
					<div className="flex h-16 w-full border items-center justify-center">
						<p className="text-gray-500">{t('No upcoming events')}</p>
					</div>
				)}

				{loading && (
					<div className="w-full h-full flex space-x-2 p-5 justify-center items-center border">
						<Spinner />
						<p className="text-gray-400">{t('Loading events')}</p>
					</div>
				)}

				{!!activities?.results && !loading && <Carousel />}

				<div className="flex border rounded-sm border-gray-200 shadow-md p-20 space-y-10">
					<div className="flex flex-col w-1/2 space-y-6">
						<p className="text-[25px] font-semibold">{t('How the app works?')}</p>
						<p className="text-[20px] font-normal ">
							{t(
								`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec et odio pellentesque diam volutpat commodo sed egestas. dipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec et odio pellentesque diam volutpat commodo sed egestas. dipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.`,
							)}
						</p>
					</div>
					<div className="flex flex-col group space-y-5 mx-auto">
						<div className="text-[20px] flex items-center space-x-10">
							<img alt="on-time" src={onTime} className="w-[90px] h-[90px]" />
							{t('Respect your time')}
						</div>
						<div className="text-[20px] flex items-center space-x-10">
							<img alt="touchscreen" src={touchscreen} className="w-[90px] h-[90px]" />
							{t('One click away')}
						</div>
						<div className="text-[20px] flex items-center space-x-10">
							<img alt="friendship" src={friendship} className="w-[90px] h-[90px]" />
							{t('Make friends')}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
