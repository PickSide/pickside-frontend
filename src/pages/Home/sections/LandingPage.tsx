import { Button, GoogleAutocomplete, Icon, IconButton } from '@components'
import { FC, useState } from 'react'

import Landing from '@assets/landing.png'
import LocationAutocomplete from '@components/LocationAutocomplete'
import { isEmpty } from 'lodash'
import { setSelectedLocation } from '@state'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LandingPage: FC<any> = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const [selected, setSelected] = useState<google.maps.places.PlaceResult>({})

	const navigateToListingWithAddress = async () => {
		if (!selected || !selected.geometry || !selected.geometry.location) {
			return
		}
		const lat = selected.geometry.location.lat()
		const lng = selected.geometry.location.lng()
		dispatch(setSelectedLocation({ lat, lng }))
		navigate('/listing')
	}

	const navigateToListing = async () => navigate('/listing')

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
			className="section h-[calc(100vh-64px)] lg:relative lg:block dark:bg-charcoal-black/80 overflow-hidden"
		>
			<div className="flex flex-col items-center justify-around max-w-screen-lg h-full mx-auto text-center">
				<img src={Landing} alt="landing background" />
				<div className="max-w-3xl">
					<GoogleAutocomplete
						label={
							<h4 className="text-base md:h4 flex items-center justify-center text-ocean">
								{t('Host or Join, Your Victory Starts Here.')}
							</h4>
						}
						onPressEnterKey={navigateToListingWithAddress}
						className="border-ocean/30 h-[50px] rounded-[15px]"
						startContent={<Icon icon="search" />}
						endContent={
							<IconButton onClick={navigateToListingWithAddress} disabled={isEmpty(selected)}>
								<Icon icon="arrow_forward" />
							</IconButton>
						}
						placeholder={t('Search by location or postal code')}
						onPlaceSelected={(value) => setSelected(value)}
					/>
					<LocationAutocomplete />
				</div>
				<div>
					<Button variant="secondary" size="lg" onClick={navigateToListing}>
						{t('See all events')}
					</Button>
				</div>
			</div>
		</section>
	)
}

export default LandingPage
