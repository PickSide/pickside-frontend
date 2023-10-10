import { FC, useState } from 'react'
import InputField, { InputFieldProps } from './shared/InputField'

import { HiOutlineLocationMarker } from 'react-icons/hi'
import { usePlacesWidget } from 'react-google-autocomplete'
import { useTranslation } from 'react-i18next'

interface GoogleAutocompleteProps extends InputFieldProps {
	label?: string
	onPlaceSelected?: (place: google.maps.places.PlaceResult) => void
	value?: any
}

const GoogleAutocomplete: FC<GoogleAutocompleteProps> = ({ label, onPlaceSelected, value, ...rest }) => {
	const { ref } = usePlacesWidget<HTMLInputElement>({
		libraries: ['places'],
		apiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
		onPlaceSelected,
		options: {
			types: ['(regions)'],
			componentRestrictions: { country: 'ca' },
		},
	})
	const { t } = useTranslation()

	const [val] = useState(value || '')

	return (
		<InputField
			label={label}
			ref={ref}
			startContent={<HiOutlineLocationMarker size={20} />}
			placeholder={t('Enter location')}
			fullWidth
			value={val.formatted_address}
			{...rest}
		/>
	)
}

export default GoogleAutocomplete
