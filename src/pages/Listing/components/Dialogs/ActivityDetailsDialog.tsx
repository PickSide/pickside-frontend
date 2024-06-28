import { Avatar, Image } from '@components'

import { Activity } from '@state'
import { FC } from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const ActivityDetailsDialog: FC<{ activity: Activity }> = ({ activity }) => {
	const { t } = useTranslation()
	const date = new Date(activity.date)
	const startTime = moment(activity.startTime)
	const endTime = moment(activity.endTime)
	const organizer = activity.participants.find((p) => p.isOrganizer)
	return (
		<div className="block px-4">
			<div className="flex items-center justify-center mb-3 rounded-md overflow-hidden">
				{activity.images?.length ? <Image src={activity.images[0]} /> : <Image />}
			</div>
			<ul className="flex flex-col gap-y-4">
				<li className="row-span-1 max-w-prose truncate">
					<p className="font-medium opacity-50">{t('Address')}</p>
					{activity.gmapsUrl ? (
						<a className="link" href={activity.gmapsUrl} target="_blank" rel="noreferrer">
							{activity.address}
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
