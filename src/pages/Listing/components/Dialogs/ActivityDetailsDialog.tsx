import { Avatar, Image } from '@components'

import { Activity } from '@state'
import { FC } from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const ActivityDetailsDialog: FC<{ activity: Activity }> = ({ activity }) => {
	const { t } = useTranslation()
	const date = new Date(activity.date)
	const time = new Date(activity.time)
	return (
		<div className="block">
			<div className="flex items-center justify-center mb-3">
				<Image src={activity.images ? activity.images[0] : ''} />
			</div>
			<ul className="flex flex-col gap-y-4">
				<li className="row-span-1">
					<p className="font-semibold">{t('Address')}</p>
					<span>{activity.address}</span>
				</li>

				<li className="row-span-1">
					<p className="font-semibold">{t('Price')}</p>
					<span>{activity.price <= 0 ? t('Free') : `$${activity.price} ${t('entry fee')}`}</span>
				</li>
				<li className="row-span-1">
					<p className="font-semibold">{t('Date')}</p>
					<p>{date.toDateString()}</p>
					<p>{moment(time).format('LT')}</p>
				</li>
				<li className="flex flex-col mb-3">
					<p className="font-semibold">{t('Paticipants')}</p>
					<div className="grid grid-flow-row grid-cols-2 gap-y-2">
						{!!activity.participants?.length
							? activity.participants?.map((p, idx) => (
									<div key={idx} className="inline-flex items-center gap-x-2">
										<Avatar src={p.avatar} />
										<p>{p.fullName}</p>
									</div>
								))
							: 'No participants'}
					</div>
				</li>
				<li className="col-span-2 row-span-2">
					<p className="font-semibold">{t('Rules')}</p>
					<span>{activity.rules || t('No rules')}</span>
				</li>
			</ul>
		</div>
	)
}

export default ActivityDetailsDialog
