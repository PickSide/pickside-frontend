import { FC, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { GoogleMap, InfoWindowF as InfoWindow, useJsApiLoader } from '@react-google-maps/api'
import { Box, CircularProgress, Typography, useTheme } from '@mui/material'

import { Marker } from 'components'
import { useEnvVariables, useMapStyles } from 'hooks'
import useMarkers from 'hooks/useMarkers'

const Map: FC<any> = ({ ...props }) => {
	const dispatch = useDispatch()
	const theme = useTheme()
	const { markerProps } = useMarkers()
	const { googleAPIKey } = useEnvVariables()
	const { mapStyles } = useMapStyles()

	const options: google.maps.MapOptions = {
		styles: mapStyles,
		disableDefaultUI: true,
		zoomControl: true,
	}

	const center = useMemo(() => ({ lat: 45.5490424, lng: -73.6573323 }), []) //useConnectedUserPosition()

	const mapContainerStyle = useMemo(
		() => ({
			height: `calc(100vh - 2 * ${theme.mixins.toolbar.minHeight}px)`,
		}),
		[theme],
	)

	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
	})

	const ActivityMap = (): JSX.Element => {
		return (
			<GoogleMap key={googleAPIKey} zoom={10} mapContainerStyle={mapContainerStyle} center={center} options={options}>
				{markerProps?.map((props, idx) => (
					<Marker key={idx} {...props} />
				))}
			</GoogleMap>
		)
	}

	if (loadError) {
		return (
			<Box>
				<Typography>There was an error loading the map</Typography>
			</Box>
		)
	}

	return isLoaded ? <ActivityMap /> : <CircularProgress />
}

export default Map
