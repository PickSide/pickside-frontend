import { FC, useState } from 'react'
import { GoogleAutocomplete, Icon, IconButton } from '@components'

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
			className="section h-[calc(100vh-64px)] lg:relative lg:block dark:bg-charcoal-black/80 overflow-hidden"
		>
			<div className="w-full h-3/4 flex items-center justify-center mx-auto bg-landing bg-no-repeat bg-contain bg-center">
				{/* <img src={Landing} alt='landing background' /> */}
			</div>
			<div className="flex items-center justify-center">
				<form>
					<GoogleAutocomplete
						label={
							<h4 className="flex items-center justify-center text-ocean">
								{t('Host or Join, Your Victory Starts Here.')}
							</h4>
						}
						onPressEnterKey={navigateToListing}
						className="border-ocean/30 h-[50px] rounded-[15px]"
						startContent={<Icon icon="search" />}
						endContent={
							<IconButton>
								<Icon icon="arrow_forward" />
							</IconButton>
						}
						placeholder={t('Search by location or postal code')}
						onPlaceSelected={(value) => setSelected(value)}
					/>
				</form>
			</div>
		</section>
	)
}

export default LandingPage
