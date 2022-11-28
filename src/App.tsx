import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { setMapMarkers, MarkerActivity } from 'state/marker'
import { DefaultNavbar, NavbarContent } from 'components'
import { useMode, ColorModeContext } from 'hooks/useMode'
import HomePage from './pages/Home/HomePage'
import { AppState } from 'state'

const App = () => {
	const activities = useSelector((state: AppState) => state.activities)

	const dispatch = useDispatch()
	const [theme, colorMode] = useMode()

	useEffect(() => {
		const markers: MarkerActivity[] | any = activities?.map((activity) => ({
			activityId: activity.id,
			...activity.address?.geometry.location,
		}))

		dispatch(setMapMarkers(markers))
	}, [])

	return (
		<>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<BrowserRouter>
						<DefaultNavbar>
							<NavbarContent />
						</DefaultNavbar>
						<Routes>
							<Route path="/" element={<HomePage />} />
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</>
	)
}

export default App
