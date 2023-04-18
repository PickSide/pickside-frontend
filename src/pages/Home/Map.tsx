import { FC, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import GoogleMapReact from 'google-map-react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { Box, CircularProgress, Typography } from '@mui/material'

import { MapMarker } from 'components'
import { useEnvVariables, useMapStyles } from 'hooks'
import useMarkers from 'hooks/useMarkers'
import { AppState } from 'state'

const Map: FC<any> = ({ ...props }) => {
	//const { markerProps } = useMarkers()
	const { googleAPIKey } = useEnvVariables()
	const { mapStyles } = useMapStyles()

	const activities = useSelector((state: AppState) => state.activities)
	const selectedLocation = useSelector((state: AppState) => state.selectedLocation)

	const options: google.maps.MapOptions = {
		styles: mapStyles,
		disableDefaultUI: true,
		zoomControl: true,
	}

	const mapContainerStyle = {
		width: '100%',
		height: `100%`,
	}

	const center = useMemo(
		() => (!!selectedLocation ? selectedLocation : { lat: 45.5490424, lng: -73.6573323 }),
		[selectedLocation],
	)

	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: '', //process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
	})

	// const onClickMarker = useCallback((props, marker, e) => {
	// 	console.log(props, marker, e)
	// }, [])

	const ActivityMap = (): JSX.Element => {
		return (
			<Box
				sx={{
					height: (theme) => `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
					width: '100%',
					overflow: 'hidden',
				}}
			>
				<GoogleMap key={googleAPIKey} zoom={12} mapContainerStyle={mapContainerStyle} center={center} options={options}>
					{activities?.results?.map(({ id, location }, idx) => (
						<MapMarker key={id} coords={location} {...props} />
					))}
				</GoogleMap>
			</Box>
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
