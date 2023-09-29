import { HiOutlineLocationMarker } from 'react-icons/hi'
import InputField from './shared/InputField'
import { forwardRef } from 'react'
import { usePlacesWidget } from 'react-google-autocomplete'
import { useTranslation } from 'react-i18next'

const GoogleAutocomplete = ({ label, onSelectPlace, value, ...rest }, forwardRef) => {
	const { t } = useTranslation()
	const { ref } = usePlacesWidget({
		apiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
		onPlaceSelected: (place) => {
			onSelectPlace && onSelectPlace(place)
		},
		options: {
			types: ['(regions)'],
			componentRestrictions: { country: 'ca' },
		},
	})

	return (
		<InputField
			label={label}
			ref={ref}
			startContent={<HiOutlineLocationMarker size={20} />}
			placeholder={t('Enter location')}
			fullWidth
			value={value?.formatted_address}
			{...rest}
		/>
	)
}

export default forwardRef(GoogleAutocomplete)
