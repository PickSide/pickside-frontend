import { forwardRef, useState } from 'react'

import { HiOutlineLocationMarker } from 'react-icons/hi'
import InputField from './shared/InputField'
import { usePlacesWidget } from 'react-google-autocomplete'
import { useTranslation } from 'react-i18next'

const GoogleAutocomplete = ({ label, onPlaceSelected, value, ...rest }, forwardedRef) => {
	const { t } = useTranslation()
	const [val] = useState(value || '')
	const { ref } = usePlacesWidget({
		libraries: ['places'],
		apiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
		onPlaceSelected,
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
			value={val.formatted_address}
			{...rest}
		/>
	)
}

export default forwardRef(GoogleAutocomplete)
