import { FC, useState } from 'react'
import { GoogleAutocomplete, Icon } from '@components'

import { setSelectedLocation } from '@state'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LandingPage: FC<any> = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const [selected, setSelected] = useState<google.maps.places.PlaceResult>({})

	const navigateToListing = async () => {
		if (!selected || !selected.geometry || !selected.geometry.location) {
			return
		}
		const lat = selected.geometry.location.lat()
		const lng = selected.geometry.location.lng()
		await dispatch(setSelectedLocation({ lat, lng }))
		await navigate('/listing')
	}

	// const goToListing = async () => {
	// 	if ((window.location.protocol === 'http:' || window.location.protocol === 'https:') && navigator.geolocation) {
	// 		await navigator.geolocation.getCurrentPosition(async ({ coords }) => {
	// 			await dispatch(setSelectedLocation({ lat: coords.latitude, lng: coords.longitude }))
	// 			await navigate('/listing')
	// 		})
	// 	}
	// }

	return (
		<section
			id="intro"
			className="section flex flex-col lg:relative lg:block bg-landing-texture dark:bg-charcoal-black/80 overflow-hidden"
		>
			<div className="bg-landing bg-no-repeat bg-contain w-1/2 h-[250px] md:h-[550px] lg:w-screen lg:h-[1100px] lg:absolute" />
			<div className="flex flex-col justify-center lg:inline-block lg:float-right lg:h-fit lg:py-20 lg:px-20">
				<div className="block text-center items-center lg:w-[600px] space-y-10">
					<p className="h3 lg:h1 text-charcoal-black font-medium tracking-tight leading-tight">
						{t('Book Your Next Match Now')}
					</p>
					<p className="text-lg lg:h5 font-thin text-cool-gray-4 tracking-tight">
						{t('Are you looking for your sport team? This place is for you just search your neighborhood.')}
					</p>
					<div className="relative w-[300px] lg:w-[400px] mx-auto">
						<div className="w-[350px] lg:w-[450px] absolute rounded-2xl bg-kale-200 h-[70px] -left-[20px] -top-[10px]" />
						<GoogleAutocomplete
							onPressEnterKey={navigateToListing}
							className="rounded-2xl"
							startContent={<Icon icon="search" />}
							placeholder={t('Search by location or postal code')}
							onPlaceSelected={(value) => setSelected(value)}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default LandingPage
