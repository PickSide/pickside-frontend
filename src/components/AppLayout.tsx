import React, { ReactPropTypes, FC, useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Box, Grid } from '@mui/material'
import { AppContext, FilterToolbar, Map } from 'components'

const AppLayout: FC<any> = ({ children, ...props }) => {
	const context = useContext(AppContext)

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
		<>
			<FilterToolbar />

			<Grid container zeroMinWidth>
				<Grid item xs={8}>
					{/* <Map
						setChildClicked={setChildClicked}
						setBounds={setBounds}
						setCoords={setCoords}
						coords={coords}
						places={filteredPlaces.length ? filteredPlaces : places}
						weatherData={weatherData}
					/> */}
				</Grid>
				<Grid
					container
					item
					xs={4}
					rowSpacing={1}
					direction="column"
					justifyContent="flex-start"
					alignItems="center"
					wrap="nowrap"
					p={2}
				>
					{/* {[0, 1, 2, 3, 4, 5, 6, 7].map((e, idx) => (
						<Grid item>
							<Card key={idx} />
						</Grid>
					))} */}
				</Grid>
			</Grid>
		</>
	)
}

export default AppLayout
