import { StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api'
import { forwardRef, useRef, useState } from 'react'

import { TextField } from 'components'
import { useTranslation } from 'react-i18next'

const GoogleAutocomplete = ({ onSelectPlace }, ref) => {
	const { t } = useTranslation()

	const [searchBoxRef, setSearchBoxRef] = useState<any>(null)

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: 'AIzaSyC1kE8lsID_3YOeFEFfI5cI8PJVJIZPkyk',
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
