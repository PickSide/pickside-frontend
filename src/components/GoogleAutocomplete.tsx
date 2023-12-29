import { FC, useRef, useState } from 'react'
import InputField, { InputFieldProps } from './shared/InputField'

import Icon from './shared/Icon'
import MenuItem from './shared/MenuItem'
import Spinner from './Spinner'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { useTranslation } from 'react-i18next'

interface GoogleAutocompleteProps extends Omit<InputFieldProps, 'value'> {
	label?: string
	onPlaceSelected?: (place: google.maps.places.PlaceResult) => void
	value?: google.maps.places.PlaceResult | string
}

const GoogleAutocomplete: FC<GoogleAutocompleteProps> = ({ label, onChange, onPlaceSelected, value, name, ...rest }, ref) => {
	const { placePredictions, getPlacePredictions, isPlacePredictionsLoading, placesService } = usePlacesService({
		apiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
		language: 'en',
	})

	const inputRef = useRef<HTMLInputElement>(null)
	const { t } = useTranslation()

	const [openPrediction, setOpenPrediction] = useState<boolean>(false)
	const [val, setVal] = useState<google.maps.places.PlaceResult | string>(value || '')
	const [cursor, setCursor] = useState<number>(0)

	return (
		<div className="relative w-full">
			<InputField
				ref={inputRef}
				name={name}
				label={label}
				startContent={<Icon icon="location_on" />}
				placeholder={t('Enter location')}
				fullWidth
				onPressArrowUp={() =>
					setCursor((prev) => {
						if (prev - 1 === 0) {
							return placePredictions.length
						}
						return prev - 1
					})
				}
				onPressArrowDown={() =>
					setCursor((prev) => {
						if (prev === placePredictions.length) {
							return 1
						}
						return prev + 1
					})
				}
				onChange={(evt: any) => {
					setOpenPrediction(true)
					setVal(evt.target.value)
					getPlacePredictions({ input: evt.target.value })
					onChange && onChange(evt)
				}}
				value={(val as google.maps.places.PlaceResult).formatted_address}
				{...rest}
			/>
			{openPrediction && (
				<>
					<div className="fixed opacity-25 h-screen w-screen" onClick={() => setOpenPrediction(false)} />
					<div id="prediction-box" className='absolute bg-white border-2 shadow-sm w-full'>
						{isPlacePredictionsLoading ? (
							<div className='flex items-center justify-center py-2 w-full'>
								<Spinner />
							</div>
						) : (
							placePredictions.map((place, idx) => (
								<MenuItem
									ref={inputRef}
									active={cursor === idx + 1}
									key={idx}
									onClick={() => {
										placesService?.getDetails({ placeId: place?.place_id }, (placeDetails) => {
											if (placeDetails) {
												onPlaceSelected && onPlaceSelected(placeDetails)
												setVal(placeDetails)
												ref.current?.focus()
											}
										})
										setOpenPrediction(false)
										setCursor(0)
									}}
								>
									{place.description}
								</MenuItem>
							))
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default GoogleAutocomplete
