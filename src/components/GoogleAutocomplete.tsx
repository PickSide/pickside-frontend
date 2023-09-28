import { StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api'
import { forwardRef, useState } from 'react'

import { HiOutlineLocationMarker } from 'react-icons/hi'
import InputField from './shared/InputField'
import { useTranslation } from 'react-i18next'

const GoogleAutocomplete = ({ label, onSelectPlace, ...rest }, ref) => {
	const { t } = useTranslation()

	const [libraries] = useState<any>(['places'])

	const [searchBoxRef, setSearchBoxRef] = useState<any>(null)

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
		libraries,
	})

	const onLoad = (ref) => setSearchBoxRef(ref)

	const onPlacesChanged = () => onSelectPlace(searchBoxRef.getPlaces()[0])

	return isLoaded ? (
		<StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
			<InputField
				label={label}
				startContent={<HiOutlineLocationMarker size={20} />}
				placeholder={t('Enter your location')}
				{...rest}
			/>
		</StandaloneSearchBox>
	) : (
		<InputField
			disabled
			label={label}
			startContent={<HiOutlineLocationMarker size={20} />}
			placeholder={t('Google API did not load')}
		/>
	)
}

export default forwardRef(GoogleAutocomplete)
