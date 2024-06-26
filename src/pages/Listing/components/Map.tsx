import { Icon, Marker } from '@components'
import { memo, useCallback, useContext } from 'react'

import { Activity } from '@state/activity'
import { AppState } from '@state'
import FocusEventContext from '../context/FocusEventContext'
import GoogleMapReact from 'google-map-react'
import { cn } from '@utils'
import moment from 'moment'
import { useMapStyles } from '@hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

interface MapProps {
	selectedActivity?: Activity
	setSelectedActivity: any
}

const Map = ({ selectedActivity, setSelectedActivity }: MapProps) => {
	const { focusedActivity, onFocusInActivity, onFocusOutActivity } = useContext(FocusEventContext)
	const mapStyles = useMapStyles()
	const { t } = useTranslation()

	const activities = useSelector((state: AppState) => state.activities)
	const selectedLocation = useSelector((state: AppState) => state.selectedLocation)

	const getMarkerColor = useCallback((activity: Activity) => {
		const participants = activity.participants?.length
		const maxPlayers = activity.maxPlayers
		if (participants === maxPlayers) {
			return 'text-red-500'
		}

		if (participants / maxPlayers > 0.6) {
			return 'text-yellow-500'
		}
		return 'text-green-500'
	}, [])

	const options: GoogleMapReact.MapOptions = {
		styles: mapStyles,
		disableDefaultUI: true,
		zoomControl: false,
	}

	const center = !!selectedLocation ? selectedLocation : { lat: 45.5490424, lng: -73.6573323 }

	return (
		<div className="w-full h-full">
			<GoogleMapReact shouldUnregisterMapOnUnmount zoom={12} center={center} options={options}>
				{activities?.result?.map((activity, idx) => (
					<Marker
						key={idx}
						lat={activity.lat}
						lng={activity.lng}
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
						onMouseEnter={() => {
							onFocusInActivity(activity)
							setSelectedActivity(activity)
						}}
						onMouseLeave={() => {
							onFocusOutActivity()
							setSelectedActivity(null)
						}}
					>
						<div className="block">
							<div className="flex items-center p-4 bg-ocean-2 h-8 text-white align-middle">{activity.title}</div>
							<div className="flex flex-col p-3 text-base">
								<span className="">
									{t('Participants')}: {activity.participants?.length} / {activity.maxPlayers}
								</span>
								<span className="">
									{t('Date')}: {moment(activity.date).toDate().toDateString()}
								</span>
								<span className="">
									{t('Time')}: {moment(activity.startTime).format('hh:mm a')}
								</span>
								<div className="">
									<span>{t('Location')}</span>:{' '}
									<span className="text-blue-600 underline cursor-pointer">{activity.address}</span>
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
