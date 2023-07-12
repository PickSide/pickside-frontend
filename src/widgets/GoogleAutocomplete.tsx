import { StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api'
import { forwardRef, useRef, useState } from 'react'

import { TextField } from 'components'
import { useTranslation } from 'react-i18next'

const GoogleAutocomplete = ({ onSelectPlace }, ref) => {
	const { t } = useTranslation()

	const [searchBoxRef, setSearchBoxRef] = useState<any>(null)

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: 'AIzaSyArwZs7J2C8Pj03okuJe-6bvEFm9QLCLCI',
		libraries: ['places'],
	})

	const onLoad = (ref) => setSearchBoxRef(ref)
	const onPlacesChanged = () => onSelectPlace(searchBoxRef.getPlaces())

	return isLoaded ? (
		<StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
			<TextField placeholder={t('Enter your location')} />
		</StandaloneSearchBox>
	) : (
		<></>
	)
}

export default forwardRef(GoogleAutocomplete)
