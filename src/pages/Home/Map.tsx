import { FC, useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { useTheme } from '@mui/material'
import { useMapStyles } from 'hooks'

interface CoordProps {
	lat: number
	lng: number
}

interface MapProps {
	coords?: CoordProps
}

const Map: FC<MapProps> = ({ coords }) => {
	const theme = useTheme()
	const { mapStyles } = useMapStyles()

	const options: google.maps.MapOptions = {
		styles: mapStyles,

		disableDefaultUI: true,
		zoomControl: true,
	}

	const mapContainerStyle = useMemo(
		() => ({
			height: `calc(100vh - 2 * ${theme.mixins.toolbar.minHeight}px)`,
		}),
		[theme],
	)

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
		libraries: ['places'],
	})

	if (loadError) return <p>Error</p>
	if (!isLoaded) return <p>Loading...</p>

	return (
		<GoogleMap
			key="AIzaSyCHYGRo5QpIyCQ8mZdd5-SoaSw8uvSubwM"
			zoom={8}
			mapContainerStyle={mapContainerStyle}
			center={coords}
			options={options}
		></GoogleMap>
	)
}

export default Map
