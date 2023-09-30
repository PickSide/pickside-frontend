import { Icon, Marker } from '@components'
import { memo, useCallback } from 'react'

import { Activity } from '@state/activity'
import { AppState } from '@state'
import GoogleMapReact from 'google-map-react'
import { cn } from '@utils'
import { useMapStyles } from '@hooks'
import { useSelector } from 'react-redux'

const Map = ({ ...props }) => {
	const { mapStyles } = useMapStyles()

	const activities = useSelector((state: AppState) => state.activities)
	const selectedLocation = useSelector((state: AppState) => state.selectedLocation)

	const getMarkerColor = useCallback((activity: Activity) => {
		const participants = activity.participants.length
		const maxPlayers = activity.maxPlayers
		if (participants === maxPlayers) {
			return 'text-red-500'
		}

		if (participants / maxPlayers > 0.6) {
			return 'text-yellow-500'
		}
		return 'text-green-500'
	}, [])

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
		// console.log('map', map)
		// console.log('mapss', maps)
	}

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
					.map((activity, idx) => (
						<Marker
							key={idx}
							lat={activity.address.geometry?.location?.lat}
							lng={activity.address.geometry?.location?.lng}
							text={activity.title}
							icon={<Icon icon="location_on" size="lg" className={getMarkerColor(activity)} />}
						>
							<span>{activity.title}</span>
						</Marker>
					))}
			</GoogleMapReact>
		</div>
	)
}

export default memo(Map)
