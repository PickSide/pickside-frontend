import { StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api'
import { forwardRef, useRef, useState } from 'react'

import { TextField } from 'components'
import { useTranslation } from 'react-i18next'

const GoogleAutocomplete = ({ onSelectPlace }, ref) => {
	const { t } = useTranslation()

	const [searchBoxRef, setSearchBoxRef] = useState<any>(null)

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyA3AlB-88t03MwvxPMuvJKT34EMm9Pp9BM',
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
