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
		const lat = selected[0].geometry.location.lat()
		const lng = selected[0].geometry.location.lng()
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
		<section
			id="home"
			className="section inset text-black bg-white flex flex-col lg:flex-row items-center justify-center gap-y-5 gap-x-4"
		>
			<div className="flex flex-col gap-y-6 w-[80%] lg:w-[50%] text-center">
				<div className="flex flex-col gap-y-2 items-center my-3">
					<span className="text-[30px] lg:text-[45px] font-semibold">{t('The best sporting app')}</span>
					<span className="text-[15px] lg:text-[22px] text-gray-500 font-normal">
						{t('Connect across your area and find the nearest sport events of your choice')}
					</span>
				</div>
				<div className="flex mx-auto justify-center items-center gap-x-6">
					<p className="text-gray-500 font-normal">{t('Check events in my region')}</p>
					<IconButton onClick={goToListing} icon={<FaLocationArrow size={25} />} />
				</div>
				<div className="flex mx-auto justify-center items-center gap-x-6">
					<p className="text-gray-500 font-normal">{t('Or you can search a custom location')}</p>
				</div>
				<div className="flex mx-auto justify-center gap-x-6">
					<GoogleAutocomplete onSelectPlace={(value) => setSelected(value)} />
					<Button disabled={!selected} onClick={handleClick} text={t('Go')} />
				</div>
			</div>
			<div className="bg-landing bg-no-repeat bg-cover w-[200px] h-[200px] mb-16"></div>
		</section>
	)
}

export default LandingPage
