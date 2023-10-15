import { Button, GoogleAutocomplete, Icon } from '@components'
import { FC, useState } from 'react'

import { setSelectedLocation } from '@state'
import { useDevice } from '@hooks'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LandingPage: FC<any> = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const [device] = useDevice()
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

	const goToListing = async () => {
		if ((window.location.protocol === 'http:' || window.location.protocol === 'https:') && navigator.geolocation) {
			await navigator.geolocation.getCurrentPosition(async ({ coords }) => {
				await dispatch(setSelectedLocation({ lat: coords.latitude, lng: coords.longitude }))
				await navigate('/listing')
			})
		}
	}

	const MobileLandingPage = () => (
		<section id="home" className="section text-black bg-landing-texture lg:block overflow-hidden">
			<div className="relative flex flex-col justify-center items-center">
				<div className="bg-landing bg-no-repeat bg-contain bg-center w-[80%] h-[300px]"></div>
				<div className="gap-y-6 w-[80%] z-20">
					<div className="flex flex-col gap-y-2 items-center my-3">
						<h1 className="">{t('Book Your Next Match Now')}</h1>
						<span className="">
							{t('Are you looking for your sport team?\nThis place is for you just search your neighborhood.')}
						</span>
					</div>
					<div className="flex flex-col mx-auto justify-center items-center gap-y-6">
						<Button type="button" className="w-full h-12" onClick={navigateToListing}>
							{t('Join Your Team Now')}
						</Button>
						<div className="inline-flex gap-x-4">
							<GoogleAutocomplete onPlaceSelected={(value) => setSelected(value)} />
							<Button type="button" disabled={!selected} onClick={navigateToListing}>
								{t('Search')}
							</Button>
						</div>
						<div className="inline-flex w-full justify-center items-center gap-x-6">
							<span className="text-blue-400 font-semibold cursor-pointer hover:text-blue-800" onClick={goToListing}>
								{t('Or use your current location')}
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)

	return device !== 'desktop' ? (
		<MobileLandingPage />
	) : (
		<section id="home" className="section relative bg-landing-texture overflow-hidden">
			<div className="absolute bg-landing bg-no-repeat bg-contain w-screen h-[1100px] z-0" />
			<div className="float-right z-30 h-full py-20 px-20">
				<div className="text-center items-center w-[600px] space-y-10">
					<h1 className="text-charcoal-black font-medium tracking-tight leading-tight">
						{t('Book Your Next Match Now')}
					</h1>
					<h5 className="font-thin text-cool-gray-4 tracking-tight">
						{t('Are you looking for your sport team? This place is for you just search your neighborhood.')}
					</h5>
					<div className="relative w-[400px] h-[50px] mx-auto">
						<div className="w-[450px] h-[calc(100%+20px)] absolute rounded-2xl bg-kale-200 -left-[20px] -top-[10px]" />
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
