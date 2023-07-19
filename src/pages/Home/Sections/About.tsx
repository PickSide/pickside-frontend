import { AppState } from 'state'
import { EventCard } from 'widgets'
import { NavLink } from 'react-router-dom'
import friendship from '../../../assets/friendship.png'
import onTime from '../../../assets/on-time.png'
import touchscreen from '../../../assets/touchscreen.png'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const About = () => {
	const { t } = useTranslation()
	const activities = useSelector((state: AppState) => state.activities)

	return (
		<section id="about" className="w-[90%] px-20 py-10 mx-auto">
			<div className="flex flex-col space-y-10">
				<div className="flex justify-between">
					<p className="text-[30px]">{t('Upcoming Events')}</p>
					<NavLink to="listing" className="text-[20px] text-blue-800 hover:text-blue-500">
						{t('Explore more Events')}
					</NavLink>
				</div>
				<div className="flex space-x-7">
					{activities?.results?.map((activity, idx) => (
						<EventCard key={idx} activity={activity} />
					))}
				</div>
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
