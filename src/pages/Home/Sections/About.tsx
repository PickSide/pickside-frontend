import { Carousel, CarouselItem, Spinner } from 'components'
import { useApi, useDevice } from 'hooks'
import { useDispatch, useSelector } from 'react-redux'

import { ActivityCard } from 'widgets'
import { AppState } from 'state'
import { NavLink } from 'react-router-dom'
import friendship from '../../../assets/friendship.png'
import onTime from '../../../assets/on-time.png'
import touchscreen from '../../../assets/touchscreen.png'
import { useAsync } from 'react-use'
import { useTranslation } from 'react-i18next'

const About = () => {
	const { getActivities } = useApi()
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [device] = useDevice()
	const activities = useSelector((state: AppState) => state.activities)

	const { loading } = useAsync(async () => {
		dispatch<any>(getActivities)
	}, [])

	const MobileAboutUs = () => (
		<section id="about" className="w-full px-8 py-10 mx-auto overflow-x-hidden">
			<div className="flex flex-col space-y-10">
				<div className="flex justify-between">
					<p className="text-[30px]">{t('Upcoming Events')}</p>
				</div>
				{/* NO EVENTS DIV  */}
				{!activities?.results && !loading && (
					<div className="flex h-16 w-full border items-center justify-center">
						<p className="text-gray-500">{t('No upcoming events')}</p>
					</div>
				)}
				{/* LOADING DIV */}
				{loading && (
					<div className="w-full h-full flex space-x-2 p-5 justify-center items-center border">
						<Spinner />
						<p className="text-gray-400">{t('Loading events')}</p>
					</div>
				)}
				{/* CAROUSEL DIV */}
				{!!activities?.results && !loading && (
					<Carousel>
						{activities?.results?.map((event, idx) => (
							<CarouselItem>
								<ActivityCard key={idx} activity={event} />
							</CarouselItem>
						))}
					</Carousel>
				)}

				{/* EXPLORE MORE DIV */}
				<div className="flex justify-end">
					<NavLink to="listing" className="text-[15spx] text-blue-800 hover:text-blue-500">
						{t('Explore more Events')}
					</NavLink>
				</div>

				<div className="flex flex-col border rounded-sm border-gray-200 shadow-md p-6 space-y-10 items-center">
					<p className="text-[20px] font-semibold">{t('How the app works?')}</p>
					<p className="text-[15px] font-normal text-center">
						{t(
							`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec et odio pellentesque diam volutpat commodo sed egestas. dipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec et odio pellentesque diam volutpat commodo sed egestas. dipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.`,
						)}
					</p>
					<div className="flex flex-col group space-y-5 mx-auto w-full">
						<div className="text-[18px] flex gap-x-6 items-center">
							<img alt="on-time" src={onTime} className="w-[70px] h-[70px]" />
							{t('Respect your time')}
						</div>
						<div className="text-[18px] flex gap-x-6 items-center">
							<img alt="touchscreen" src={touchscreen} className="w-[70px] h-[70px]" />
							{t('One click away')}
						</div>
						<div className="text-[18px] flex gap-x-6 items-center">
							<img alt="friendship" src={friendship} className="w-[70px] h-[70px]" />
							{t('Make friends')}
						</div>
					</div>
				</div>
			</div>
		</section>
	)

	return device === 'mobile' ? (
		<MobileAboutUs />
	) : (
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

				{!!activities?.results && !loading && (
					<Carousel>
						{activities?.results?.map((event, idx) => (
							<CarouselItem>
								<ActivityCard key={idx} activity={event} />
							</CarouselItem>
						))}
					</Carousel>
				)}

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
							<img alt="on-time" src={onTime} className="w-[70px] h-[70px]" />
							{t('Respect your time')}
						</div>
						<div className="text-[20px] flex items-center space-x-10">
							<img alt="touchscreen" src={touchscreen} className="w-[70px] h-[70px]" />
							{t('One click away')}
						</div>
						<div className="text-[20px] flex items-center space-x-10">
							<img alt="friendship" src={friendship} className="w-[70px] h-[70px]" />
							{t('Make friends')}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
