import InputField, { InputFieldProps } from './shared/InputField'
import { forwardRef, useRef, useState } from 'react'

import { HiOutlineLocationMarker } from 'react-icons/hi'
import MenuItem from './shared/MenuItem'
import Spinner from './Spinner'
import { cn } from '@utils'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { useTranslation } from 'react-i18next'

interface GoogleAutocompleteProps extends InputFieldProps {
	label?: string
	onPlaceSelected?: (place: google.maps.places.PlaceResult) => void
}

const GoogleAutocomplete = forwardRef<InputFieldProps, GoogleAutocompleteProps>(
	({ label, onChange, onPlaceSelected, value, name, ...rest }, forwardRef) => {
		const ref = useRef<HTMLInputElement>(null)
		const { placePredictions, getPlacePredictions, isPlacePredictionsLoading, placesService } = usePlacesService({
			apiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
			language: 'fr',
		})

		const { t } = useTranslation()

		const [openPrediction, setOpenPrediction] = useState<boolean>(false)
		const [val, setVal] = useState<google.maps.places.PlaceResult>(value || '')
		const [cursor, setCursor] = useState<number>(0)

		return (
			<>
				{openPrediction && (
					<div className="opacity-25 h-screen w-sreen fixed inset-0" onClick={() => setOpenPrediction(false)} />
				)}
				<div className="relative">
					<InputField
						ref={ref}
						name={name}
						label={label}
						startContent={<HiOutlineLocationMarker size={20} />}
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
						value={val.formatted_address}
						{...rest}
					/>
					{openPrediction && (
						<div
							className={cn(
								'min-h-[100px] m-auto bg-white border shadow-sm flex flex-col justify-center items-center',
								ref.current?.clientWidth ? `max-w-[${ref.current?.clientWidth}px]` : 'max-w-[250px]',
							)}
						>
							{isPlacePredictionsLoading ? (
								<Spinner />
							) : (
								placePredictions.map((place, idx) => (
									<MenuItem
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
					)}
				</div>
			</>
		)
	},
)

export default GoogleAutocomplete
