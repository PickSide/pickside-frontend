import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { faSoccerBall } from '@fortawesome/free-solid-svg-icons'

import { MapMarker, Spinner } from 'components'
import { useEnvVariables, useMapStyles } from 'hooks'
import { AppState, setSelectedActivity } from 'state'

const Map: FC<any> = ({ ...props }) => {
	const { googleAPIKey } = useEnvVariables()
	const { mapStyles } = useMapStyles()
	const dispatch = useDispatch()

	const playables = useSelector((state: AppState) => state.playables)
	const selectedActivity = useSelector((state: AppState) => state.selectedActivity)
	const selectedLocation = useSelector((state: AppState) => state.selectedLocation)

	const options: google.maps.MapOptions = {
		styles: mapStyles,
		disableDefaultUI: true,
		zoomControl: false,
	}

	const mapContainerStyle = {
		width: '100%',
		height: `100%`,
	}

	const center = !!selectedLocation ? selectedLocation : { lat: 45.5490424, lng: -73.6573323 }

	const { isLoaded, loadError } = useJsApiLoader({
		//id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyC1kE8lsID_3YOeFEFfI5cI8PJVJIZPkyk', //process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '', //AIzaSyC1kE8lsID_3YOeFEFfI5cI8PJVJIZPkyks
		libraries: ['places'],
	})

	const InfoWindow = ({ content, title }) => (
		<div className="flex flex-col">
			<span>{title}</span>
			<span>{content}</span>
		</div>
	)

	const ActivityMap = (): JSX.Element => {
		return (
			<div className="h-[calc(100vh - 64px)] w-full overflow-hidden">
				<GoogleMap zoom={12} mapContainerStyle={mapContainerStyle} center={center} options={options}>
					{playables?.results?.map(({ id, coords, fieldName }, idx) => (
						<MapMarker
							id={id}
							key={idx}
							coords={coords}
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
							{!!selectedActivity && <InfoWindow content="Current ongoing game" title={fieldName} />}
						</MapMarker>
					))}
				</GoogleMap>
			</div>
		)
	}

	if (loadError) {
		return (
			<div>
				<span>There was an error loading the map</span>
			</div>
		)
	}

	return isLoaded ? <ActivityMap /> : <Spinner />
}

export default Map