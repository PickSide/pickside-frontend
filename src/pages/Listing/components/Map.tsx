import { Icon, Marker } from '@components'
import { memo, useCallback, useContext } from 'react'

import { Activity } from '@state/activity'
import { AppState } from '@state'
import FocusEventContext from '../context/FocusEventContext'
import GoogleMapReact from 'google-map-react'
import { cn } from '@utils'
import dayjs from 'dayjs'
import moment from 'moment'
import { useMapStyles } from '@hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const Map = () => {
	const { focusedActivity, onFocusInActivity, onFocusOutActivity } = useContext(FocusEventContext)
	const mapStyles = useMapStyles()
	const { t } = useTranslation()

	const activities = useSelector((state: AppState) => state.activities)
	const selectedActivity = useSelector((state: AppState) => state.selectedActivity)
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

	return (
		<div className={cn('w-full h-full overflow-hidden')}>
			<GoogleMapReact zoom={12} mapContainerStyle={mapContainerStyle} center={center} options={options}>
				{activities?.results
					?.filter(({ address }) => address.geometry)
					.map((activity, idx) => (
						<Marker
							key={idx}
							lat={activity.address.geometry?.location?.lat}
							lng={activity.address.geometry?.location?.lng}
							text={activity.title}
							icon={
								<Icon
									icon="location_on"
									size="lg"
									className={cn(
										'transition-all',
										getMarkerColor(activity),
										focusedActivity?.id === activity.id ? 'scale-125' : 'hover:scale-125',
									)}
								/>
							}
							openInfoWindow={activity.id === selectedActivity?.id}
							onMouseEnter={() => onFocusInActivity(activity)}
							onMouseLeave={onFocusOutActivity}
						>
							<div className="block">
								<div className="flex items-center px-2 bg-green-500 h-8 text-white align-middle">{activity.title}</div>
								<div className="flex flex-col p-3 text-base">
									<span className="">
										{t('Participants')}: {activity.participants.length} / {activity.maxPlayers}
									</span>
									<span className="">
										{t('Date')}: {dayjs(activity.date).toDate().toDateString()}
									</span>
									<span className="">
										{t('Time')}: {moment(activity.time).format('LT')}
									</span>
									<div className="">
										<span>{t('Location')}</span>:{' '}
										<span className="text-blue-600 underline cursor-pointer">{activity.address.formatted_address}</span>
									</div>
								</div>
							</div>
						</Marker>
					))}
			</GoogleMapReact>
		</div>
	)
}

export default memo(Map)
