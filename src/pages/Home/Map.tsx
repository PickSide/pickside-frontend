import { FC, useCallback, useMemo, useState } from 'react'
import { GoogleMap, useLoadScript, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { Box, CircularProgress, Typography, useTheme } from '@mui/material'
import { useEnvVariables, useMapStyles } from 'hooks'

interface CoordProps {
	lat: number
	lng: number
}

interface MapProps {
	coords?: CoordProps
}

const Map: FC<MapProps> = ({ coords }) => {
	const theme = useTheme()
	const { googleAPIKey } = useEnvVariables()
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
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
		libraries: ['places'],
	})

	const ActivityMap = (): JSX.Element => {
		const onLoad = useCallback((mapInstance) => {
			console.log(mapInstance)
		}, [])

		return (
			<GoogleMap
				key={googleAPIKey}
				zoom={8}
				mapContainerStyle={mapContainerStyle}
				center={coords}
				onLoad={onLoad}
				options={options}
			></GoogleMap>
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