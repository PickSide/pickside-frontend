import { FC, cloneElement, useCallback, useMemo } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { Box, CircularProgress, Typography, useTheme } from '@mui/material'
import { useConnectedUserPosition, useEnvVariables, useMapStyles } from 'hooks'
import useMarkers from 'hooks/useMarkers'

interface CoordProps {
	lat: number
	lng: number
}

interface MapProps {
	coords?: CoordProps
}

const Map: FC<MapProps> = () => {
	const { markers } = useMarkers()
	const theme = useTheme()
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
		libraries: ['places'],
	})

	const ActivityMap = (): JSX.Element => {
		const onLoad = useCallback((mapInstance) => {
			// const { geocode } = new google.maps.Geocoder()
			// uniqWith(activities, isEqual)
			// 	?.map((a) => a.location)
			// 	.forEach((location) => {
			// 		geocode({
			// 			address: `${location?.propertyNumber || ''} ${location?.streetName || ''} ${location?.zipCode || ''}`,
			// 		}).then(({ results }) => {
			// 			console.log(map(results, 'geometry.location'))
			// 			dispatch(setMapMarkers(map(results, 'geometry.location')))
			// 		})
			// 	})
		}, [])

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
				{markers?.map((marker) => {
					console.log(marker)
					return cloneElement(marker)
				})}
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
