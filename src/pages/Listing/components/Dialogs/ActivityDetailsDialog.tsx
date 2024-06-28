import { Avatar, Icon, Image, Marker } from '@components'
import { FC, useCallback } from 'react'

import { Activity } from '@state'
import GoogleMapReact from 'google-map-react'
import { cn } from '@utils'
import moment from 'moment'
import { useMapStyles } from '@hooks'
import { useTranslation } from 'react-i18next'

const ActivityDetailsDialog: FC<{ activity: Activity }> = ({ activity }) => {
	const { t } = useTranslation()
	const mapStyles = useMapStyles()
	const date = new Date(activity.date)
	const startTime = moment(activity.startTime)
	const endTime = moment(activity.endTime)
	const organizer = activity.participants.find((p) => p.isOrganizer)

	const options: GoogleMapReact.MapOptions = {
		styles: mapStyles,
		disableDefaultUI: true,
		zoomControl: false,
	}

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

	const center = { lat: activity.lat, lng: activity.lng }

	return (
		<div className="block overflow-y-auto">
			<div className="block md:hidden w-full h-[200px] rounded-md overflow-hidden mb-4">
				<GoogleMapReact shouldUnregisterMapOnUnmount zoom={12} center={center} options={options}>
					<Marker
						lat={activity.lat}
						lng={activity.lng}
						text={activity.title}
						icon={<Icon icon="location_on" size="lg" className={cn('transition-all', getMarkerColor(activity))} />}
					></Marker>
				</GoogleMapReact>
			</div>
			<div className="hidden lg:flex items-center justify-center mb-3 rounded-md overflow-hidden">
				{activity.images?.length ? <Image src={activity.images[0]} /> : <Image />}
			</div>
			<ul className="flex flex-col gap-y-4">
				<li className="row-span-1 max-w-prose truncate">
					<p className="font-medium opacity-50">{t('Address')}</p>
					{activity.gmapsUrl ? (
						<a className="link flex items-center gap-x-2" href={activity.gmapsUrl} target="_blank" rel="noreferrer">
							{t('Get directions')}
							<Icon icon="directions" variant="filled" />
						</a>
					) : (
						activity.address
					)}
				</li>

				<li className="row-span-1">
					<p className="font-medium opacity-50">{t('Price')}</p>
					<span>{!activity.price || activity.price <= 0 ? t('Free') : `$${activity.price} ${t('entry fee')}`}</span>
				</li>
				<li className="row-span-1">
					<p className="font-medium opacity-50">{t('Date')}</p>
					<p>{date.toDateString()}</p>
				</li>
				<li className="row-span-1">
					<p className="font-medium opacity-50">{t('Time')}</p>
					{t('From')}&nbsp;<span className="uppercase">{startTime.format('h:mm a')}</span>
					&nbsp;{t('to')}&nbsp;<span className="uppercase">{endTime.format('h:mm a')}</span>
				</li>
				<li className="row-span-1">
					<p className="font-medium opacity-50">{t('Organizer')}</p>
					<div className="flex items-center gap-x-2">
						<Avatar src={organizer?.avatar} />
						<p>{organizer?.fullName}</p>
					</div>
				</li>
				<li className="flex flex-col mb-3">
					<p className="font-medium opacity-50">{t('Paticipants')}</p>
					<div className="grid grid-flow-row grid-cols-2 gap-y-2">
						{!!activity.participants?.length
							? activity.participants?.map((p, idx) => (
									<div key={idx} className="inline-flex items-center gap-x-2 max-w-prose truncate">
										<Avatar src={p.avatar} />
										<p>{p.fullName}</p>
									</div>
								))
							: 'No participants'}
					</div>
				</li>
				<li className="col-span-2 row-span-2">
					<p className="font-medium opacity-50">{t('Rules')}</p>
					<span>{activity.rules || t('No rules')}</span>
				</li>
			</ul>
		</div>
	)
}

export default ActivityDetailsDialog
