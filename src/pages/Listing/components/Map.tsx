import { Icon, Marker } from '@components'

import { AppState } from '@state'
import { FC } from 'react'
import GoogleMapReact from 'google-map-react'
import { cn } from '@utils'
import { useMapStyles } from '@hooks'
import { useSelector } from 'react-redux'

const Map: FC<any> = ({ ...props }) => {
	const { mapStyles } = useMapStyles()

	const activities = useSelector((state: AppState) => state.activities)
	//const selectedActivity = useSelector((state: AppState) => state.selectedActivity)
	const selectedLocation = useSelector((state: AppState) => state.selectedLocation)

	//const infoWindow = new google.maps.InfoWindow()

	const options: google.maps.MapOptions = {
		styles: mapStyles,
		disableDefaultUI: true,
		zoomControl: false,
	}

	const mapContainerStyle = {
		width: '100%',
		height: '100%',
	}

	const center = !!selectedLocation ? selectedLocation : { lat: 45.5490424, lng: -73.6573323 }

	const handleApiLoaded = (map, maps) => {
		console.log('map', map)
		console.log('mapss', maps)
	}

	// const InfoWindow = ({ content, title }) => (
	// 	<div className="flex flex-col">
	// 		<span>{title}</span>
	// 		<span>{content}</span>
	// 	</div>
	// )

	const ActivityMap = (): JSX.Element => {
		return (
			<div className={cn('w-full h-full overflow-hidden')}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY }}
					zoom={12}
					mapContainerStyle={mapContainerStyle}
					center={center}
					options={options}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
				>
					{activities?.results
						?.filter(({ address }) => address.geometry)
						.map(({ id, address, title }, idx) => (
							<Marker
								key={idx}
								lat={address.geometry?.location?.lat}
								lng={address.geometry?.location?.lng}
								text={title}
								icon={<Icon icon="location_on" size="lg" className="text-red-700" />}
							/>
						))}
				</GoogleMapReact>
			</div>
		)
	}

	if (!activities) {
		return (
			<div>
				<span>There was an error loading the map</span>
			</div>
		)
	}

	return <ActivityMap />
}

export default Map
