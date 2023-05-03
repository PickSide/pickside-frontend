import { FC, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { Box, CircularProgress, Typography } from '@mui/material'
import { faPersonRunning, faSoccerBall } from '@fortawesome/free-solid-svg-icons'

import { MapMarker } from 'components'
import { useEnvVariables, useMapStyles } from 'hooks'
import { AppState } from 'state'
import { setSelectedActivity } from 'state/selectedActivity'

const Map: FC<any> = ({ ...props }) => {
	const { googleAPIKey } = useEnvVariables()
	const { mapStyles } = useMapStyles()
	const dispatch = useDispatch()

	const activities = useSelector((state: AppState) => state.activities)
	const playables = useSelector((state: AppState) => state.playables)
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

	const InfoWindow = ({ content, title }) => (
		<Box display="flex" flexDirection="column">
			<Typography>{title}</Typography>
			<Typography>{content}</Typography>
		</Box>
	)

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
					{activities?.results?.map(({ id, location, title }, idx) => (
						<MapMarker
							id={id}
							key={idx}
							coords={location}
							onToggleOpen={() => dispatch<any>(setSelectedActivity(id))}
							onWindowClose={() => dispatch<any>(setSelectedActivity(null))}
							icon={{
								path: faSoccerBall.icon[4] as string,
								fillColor: '#71fb00',
								fillOpacity: 1,
								strokeWeight: 0.5,
								strokeColor: '#20e600',
								scale: 0.05,
							}}
						>
							<InfoWindow content="Current ongoing game" title={title} />
						</MapMarker>
					))}
					{playables?.results?.map(({ id, coords, fieldName, type }, idx) => (
						<MapMarker
							id={id}
							key={idx}
							coords={coords}
							onToggleOpen={() => dispatch<any>(setSelectedActivity(id))}
							onWindowClose={() => dispatch<any>(setSelectedActivity(null))}
							icon={{
								path: faPersonRunning.icon[4] as string,
								fillColor: '#0071fb',
								fillOpacity: 1,
								strokeWeight: 0.5,
								strokeColor: '#0093ff',
								scale: 0.05,
							}}
						>
							<InfoWindow content="No games" title={fieldName} />
						</MapMarker>
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
