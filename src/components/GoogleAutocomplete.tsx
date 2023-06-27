import { forwardRef, useRef } from 'react'
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { twMerge } from 'tailwind-merge'

interface GoogleAutocompleteProps {
	defaultPlace?: string
	onPlaceChanged?: () => void
}

const GoogleAutocomplete = ({ defaultPlace, onPlaceChanged, ...rest }: GoogleAutocompleteProps, ref) => {
	const autocompleteRef = useRef()

	const onLoad = () => {
		const autocomplete = autocompleteRef.current
	}

	return (
		<div className="flex flex-col gap-y-4">
			<Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
				<input
					value={defaultPlace}
					className="rounded-md h-full w-full px-4 py-2 border-solid border-2 focus-visible:outline-none focus:border-primary focus:outline-primary"
					type="text"
					placeholder="Search for location"
				/>
			</Autocomplete>
		</div>
	)
}

export default forwardRef(GoogleAutocomplete)
