import React, { FC, useState, useEffect } from 'react'
import { Box, Container } from '@mui/material'
import Map from '../components/Map'
import ActivityToolbar from '../components/ActivityToolbar/ActivityToolbar'

interface AppContainerProps {}

const AppContainer: FC<AppContainerProps> = () => {
	const [type, setType] = useState('restaurants')
	const [rating, setRating] = useState('')

	const [coords, setCoords] = useState({})
	const [bounds, setBounds] = useState(null)

	const [weatherData, setWeatherData] = useState([])
	const [filteredPlaces, setFilteredPlaces] = useState([])
	const [places, setPlaces] = useState([])

	const [autocomplete, setAutocomplete] = useState(null)
	const [childClicked, setChildClicked] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
			setCoords({ lat: latitude, lng: longitude })
		})
	}, [])

	useEffect(() => {
		if (bounds) {
			setIsLoading(true)
		}
	}, [bounds, type])

	return (
		<Box>
			<Map
				setChildClicked={setChildClicked}
				setBounds={setBounds}
				setCoords={setCoords}
				coords={coords}
				places={filteredPlaces.length ? filteredPlaces : places}
				weatherData={weatherData}
			/>
			<ActivityToolbar />
		</Box>
	)
}

export default AppContainer
