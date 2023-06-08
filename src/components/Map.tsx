import { FC, useRef, useState } from 'react'
import { Autocomplete, GoogleMap, useJsApiLoader } from '@react-google-maps/api'

interface MapProps {
	width?: string
	height?: string
}

const Map: FC<MapProps> = ({ width = '100%', height = '100%', ...props }) => {
	//	const [selected, setSelected] = useState<any>()

	const [searchResult, setSearchResult] = useState('')
	const autocompleteRef = useRef()

	const mapContainerStyle = {
		width: '600px',
		height: '300px',
	}

	const center = { lat: 45.5490424, lng: -73.6573323 }

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: '', //process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '', //AIzaSyC1kE8lsID_3YOeFEFfI5cI8PJVJIZPkyk
		libraries: ['places'],
	})

	const onLoad = () => {
		const autocomplete = autocompleteRef.current
	}

	const onPlaceChanged = () => {
		//setSearchResult(place)
		console.log(searchResult)
	}

	return isLoaded ? (
		<div className="flex flex-col gap-y-4">
			<Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
				<input
					className="rounded-md h-full w-full px-4 py-2 border-solid border-2 focus:border-primary focus:outline-primary"
					type="text"
					placeholder="Search for location"
				/>
			</Autocomplete>
			<GoogleMap zoom={12} mapContainerStyle={mapContainerStyle} center={center}></GoogleMap>
		</div>
	) : (
		<></>
	)
}

export default Map
