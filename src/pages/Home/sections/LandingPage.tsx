import { FC, useState } from 'react'
import { GoogleAutocomplete, Icon } from '@components'

import Landing from '../../../assets/landing.png'
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
			<div className='w-full h-[80vh] flex items-center justify-center mx-auto'>
				<img src={Landing} alt='landing background' />
			</div>
			<div className='flex items-center justify-center'>
				<GoogleAutocomplete
					label={<span className='flex items-center justify-center text-primary'>{t('Host or Join, Your Victory Starts Here.')}</span>}
					onPressEnterKey={navigateToListing}
					className="border-primary/30 w-[300px] h-12 rounded-[15px]"
					endContent={<Icon icon="search" />}
					placeholder={t('Search location...')}
					onPlaceSelected={(value) => setSelected(value)}
				/>
			</div>
		</section>
	)
}

export default LandingPage
