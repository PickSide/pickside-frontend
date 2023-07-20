import { Button, IconButton } from 'components'
import { FC, useState } from 'react'

import { FaLocationArrow } from 'react-icons/fa'
import { GoogleAutocomplete } from 'widgets'
import { setSelectedLocation } from 'state'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LandingPage: FC<any> = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const [selected, setSelected] = useState<any>(null)

	const handleClick = async () => {
		const lat = selected.geometry.location.lat()
		const lng = selected.geometry.location.lng()
		await dispatch(setSelectedLocation({ lat, lng }))
		await navigate('/listing')
	}

	const goToListing = async () => {
		if ((window.location.protocol === 'http:' || window.location.protocol === 'https:') && navigator.geolocation) {
			await navigator.geolocation.getCurrentPosition(async ({ coords }) => {
				console.log(coords)
				await dispatch(setSelectedLocation({ lat: coords.latitude, lng: coords.longitude }))
				await navigate('/listing')
			})
		}
	}

	return (
		<section id="home" className="section text-black bg-landing-texture lg:block overflow-hidden">
			<div className="relative flex justify-center">
				<div className="absolute bg-landing bg-no-repeat bg-contain w-[1100px] h-[1100px]"></div>
				<div className="absolute translate-x-[100%] gap-y-6 w-[80%] lg:w-[400px] z-[80]">
					<div className="flex flex-col gap-y-2 items-center my-3">
						<span className="text-[30px] lg:text-[45px] font-semibold">{t('Book Your Next Match Now')}</span>
						<span className="text-[15px] lg:text-[22px] text-gray-500 font-normal">
							{t('Are you looking for your sport team? this place is for you just search your neighborhood.')}
						</span>
					</div>
					<div className="flex flex-col mx-auto justify-center items-center gap-y-6">
						<Button className="w-full h-12" onClick={handleClick} text={t('Join Your Team Now')} />
						<div className="inline-flex w-full items-center justify-between gap-x-6">
							<GoogleAutocomplete onSelectPlace={(value) => setSelected(value)} />
							<Button disabled={!selected} onClick={handleClick} text={t('Search')} />
							<IconButton
								onClick={goToListing}
								icon={<FaLocationArrow size={25} />}
								tooltipText={t('Show activities in my area')}
							/>
						</div>
					</div>
				</div>
				{/* <div className="absolute -bottom-40 -left-60 w-[1000px] h-[1000px] z-[40] rounded-full bg-blue-500"></div> */}
			</div>
		</section>
	)
}

export default LandingPage
