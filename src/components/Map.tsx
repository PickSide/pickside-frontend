import { FC } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import mapStyles from './MapStyles'

interface MapProps {
	coords?: any
	places: any
	setCoords: any
	setBounds: any
	setChildClicked: any
	weatherData: any
}

const Map: FC<MapProps> = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
	const options = {
		styles: mapStyles,
		disableDefaultUI: true,
		zoomControl: true,
	}
	const mapContainerStyle = {
		height: 'calc(100vh - 68.5px)',
		width: '100vw',
	}
	const center = {
		lat: 45.508888,
		lng: -73.561668,
	}

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
		libraries: ['places'],
	})

	if (loadError) return <p>Error</p>
	if (!isLoaded) return <p>Loading...</p>

	return (
		<div
			style={{
				position: 'absolute',
				zIndex: 0,
			}}
		>
			<GoogleMap
				key="AIzaSyCHYGRo5QpIyCQ8mZdd5-SoaSw8uvSubwM"
				zoom={8}
				mapContainerStyle={mapContainerStyle}
				center={center}
				options={options}
			></GoogleMap>
		</div>
	)
}

export default Map
