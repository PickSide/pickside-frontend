import { FC, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { GoogleMap, useJsApiLoader, GoogleMapProps, MarkerClustererF } from '@react-google-maps/api'
import { Box, CircularProgress, Typography, useTheme } from '@mui/material'

import { Marker } from 'components'
import { useConnectedUserPosition, useEnvVariables, useMapStyles } from 'hooks'
import useMarkers from 'hooks/useMarkers'
import { setSelectedMarker } from 'state/marker'

interface CoordProps {
	lat: number
	lng: number
}

interface MapProps {
	coords?: CoordProps
}

const Map: FC<MapProps> = () => {
	const dispatch = useDispatch()
	const theme = useTheme()
	const { markers } = useMarkers()
	const { googleAPIKey } = useEnvVariables()
	const { mapStyles } = useMapStyles()
	const { lat, lng } = useConnectedUserPosition()

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

	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
	})

	const ActivityMap = (): JSX.Element => {
		/**
		 * TODO - Decide what to do with onLoad
		 */
		const onLoad = useCallback((mapInstance) => {}, [])
		/**
		 * TODO - Decide what to do with tileOnLoad (also runs every time you move the map)
		 */
		const onTilesLoaded = useCallback(() => {}, [])
		return (
			<GoogleMap
				key={googleAPIKey}
				zoom={10}
				mapContainerStyle={mapContainerStyle}
				center={{ lat, lng }}
				onLoad={onLoad}
				onTilesLoaded={onTilesLoaded}
				options={options}
			>
				{markers?.map((marker, idx) => (
					<Marker
						key={idx}
						{...marker}
						onClick={() => dispatch(setSelectedMarker(marker.activityId))}
						icon={{
							url: '/soccer_marker.png',
							scaledSize: new google.maps.Size(marker.scaleFactor, marker.scaleFactor),
						}}
					/>
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
