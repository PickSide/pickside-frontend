import { FC, useCallback, useMemo, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { twMerge } from 'tailwind-merge'

interface MapProps {
	width?: string
	height?: string
}

const Map: FC<MapProps> = ({ width = '100%', height = '100%', ...props }) => {
	const [selected, setSelected] = useState<any>()

	const mapContainerStyle = {
		width: '100%',
		height: `100%`,
	}

	const center = { lat: 45.5490424, lng: -73.6573323 }

	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyC1kE8lsID_3YOeFEFfI5cI8PJVJIZPkyk', //process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
	})

	return isLoaded ? (
		<div className="w-72 h-44">
			<GoogleMap zoom={12} mapContainerStyle={mapContainerStyle} center={center}></GoogleMap>
		</div>
	) : (
		<></>
	)
}

export default Map
